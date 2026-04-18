#!/usr/bin/env node
/**
 * r2-upload-bol.js — Upload a Building Out Loud video to Cloudflare R2.
 *
 * Auto-transcodes HEVC/H.265 sources to H.264 before upload. iPhone records
 * HEVC by default, and TikTok's SEND_TO_USER_INBOX flow fails to render
 * HEVC drafts on the mobile app even though the API upload succeeds
 * (confirmed 2026-04-18 with Ep 5 Wispr Flow). H.264 is also universally
 * compatible across LinkedIn, YouTube, and TikTok, so we standardize.
 *
 * Zero npm dependencies — uses Node built-ins + curl + ffmpeg/ffprobe.
 * Reads R2 creds from /Users/andrewsrobotmachine/SecondBrain/.env.local.
 *
 * Usage:
 *   node scripts/r2-upload-bol.js <local-file-path> <object-key>
 *   node scripts/r2-upload-bol.js "/Users/andrewsrobotmachine/Desktop/BOL drop/04-14.mp4" bol/2026-04-14-ep5.mp4
 *
 * Prints the public URL on success.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

const ENV_PATH = "/Users/andrewsrobotmachine/SecondBrain/.env.local";

function loadEnv(envPath) {
  const raw = fs.readFileSync(envPath, "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
  return env;
}

function sha256hex(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function hmac(key, data) {
  return crypto.createHmac("sha256", key).update(data).digest();
}

function getSigningKey(secretKey, dateStamp, region, service) {
  const kDate = hmac(Buffer.from("AWS4" + secretKey), dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, "aws4_request");
}

function detectContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
    ".webm": "video/webm",
  }[ext] || "application/octet-stream";
}

function uploadToR2({ filePath, objectKey, env }) {
  const fileBuffer = fs.readFileSync(filePath);
  const contentHash = sha256hex(fileBuffer);
  const contentType = detectContentType(filePath);

  const now = new Date();
  const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const dateStamp = amzDate.slice(0, 8);
  const region = "auto";
  const service = "s3";
  const host = `${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;

  const canonicalUri = `/${env.R2_BUCKET_NAME}/${objectKey}`;
  const canonicalHeaders =
    `content-type:${contentType}\n` +
    `host:${host}\n` +
    `x-amz-content-sha256:${contentHash}\n` +
    `x-amz-date:${amzDate}\n`;
  const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";

  const canonicalRequest = [
    "PUT",
    canonicalUri,
    "",
    canonicalHeaders,
    signedHeaders,
    contentHash,
  ].join("\n");

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256hex(Buffer.from(canonicalRequest)),
  ].join("\n");

  const signingKey = getSigningKey(env.R2_SECRET_ACCESS_KEY, dateStamp, region, service);
  const signature = crypto.createHmac("sha256", signingKey).update(stringToSign).digest("hex");
  const authorization = `AWS4-HMAC-SHA256 Credential=${env.R2_ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const endpoint = `https://${host}${canonicalUri}`;
  const publicUrl = env.R2_PUBLIC_URL.replace(/\/+$/, "") + "/" + objectKey;

  const curlCmd = [
    "curl", "-sS", "-o", "/dev/null", "-w", "%{http_code}",
    "-X", "PUT", endpoint,
    "-H", `Authorization: ${authorization}`,
    "-H", `x-amz-date: ${amzDate}`,
    "-H", `x-amz-content-sha256: ${contentHash}`,
    "-H", `Host: ${host}`,
    "-H", `Content-Type: ${contentType}`,
    "--data-binary", `@${filePath}`,
  ];

  const statusCode = execSync(
    curlCmd.map(a => `'${a.replace(/'/g, "'\\''")}'`).join(" "),
    { encoding: "utf8", timeout: 300000, maxBuffer: 10 * 1024 * 1024 }
  ).trim();

  if (statusCode === "200" || statusCode === "201") {
    return { success: true, url: publicUrl, key: objectKey, statusCode, sizeBytes: fileBuffer.length };
  }
  return { success: false, error: `HTTP ${statusCode}`, statusCode };
}

// ─── codec detection + HEVC transcode ────────────────

function getVideoCodec(filePath) {
  const out = execSync(
    `ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=nw=1:nk=1 '${filePath.replace(/'/g, "'\\''")}'`,
    { encoding: "utf8" }
  ).trim();
  return out;
}

function transcodeToH264(srcPath) {
  const base = path.basename(srcPath, path.extname(srcPath));
  const outPath = path.join(os.tmpdir(), `bol-h264-${base}-${Date.now()}.mp4`);
  execSync(
    `ffmpeg -y -i '${srcPath.replace(/'/g, "'\\''")}' ` +
      `-c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p ` +
      `-c:a aac -b:a 192k ` +
      `-movflags +faststart ` +
      `'${outPath}' 2>/dev/null`,
    { encoding: "utf8", timeout: 600000 }
  );
  return outPath;
}

// ─── main ───────────────────────────────────────────
const [, , filePathArg, objectKey] = process.argv;
if (!filePathArg || !objectKey) {
  console.error("Usage: node r2-upload-bol.js <local-path> <object-key>");
  process.exit(1);
}
const env = loadEnv(ENV_PATH);

// Auto-transcode HEVC → H.264 (see file header for why)
let uploadPath = filePathArg;
let transcoded = false;
const codec = getVideoCodec(filePathArg);
if (codec === "hevc" || codec === "h265") {
  console.error(`[transcode] ${codec} detected — re-encoding to H.264…`);
  uploadPath = transcodeToH264(filePathArg);
  transcoded = true;
}

const result = uploadToR2({ filePath: uploadPath, objectKey, env });
result.sourceCodec = codec;
result.transcoded = transcoded;

if (transcoded) {
  try { fs.unlinkSync(uploadPath); } catch {}
}

console.log(JSON.stringify(result, null, 2));
process.exit(result.success ? 0 : 1);
