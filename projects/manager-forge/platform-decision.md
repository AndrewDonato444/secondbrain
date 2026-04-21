# Manager Forge — Platform Decision
*Decided: 2026-04-21*

---

## Recommendation

Use **Skool + Stripe + Zoom**. It costs ~$99/mo plus Stripe processing fees, keeps 100% of revenue after those fees, and handles every functional requirement the program has: community, content delivery, enrollment page, live session hosting. Skool's UX is familiar to the cohort audience without feeling like a consumer product, and the combination of community + resources + classroom in one tab is genuinely better for participant experience than stitching together separate tools. At 10 seats and $2,500, you're keeping roughly $2,400 more per cohort versus Maven, which compounds significantly into Cohort 2 and 3. Maven is the only credible alternative, and it earns its place only if setup time becomes a real constraint — which, given the June 15 deadline and a 7-8 week runway, it shouldn't be.

---

## Platform Comparison

### Option A: Skool + Stripe + Zoom
- **Cost:** $99/mo Skool + 2.9% + $0.30/transaction Stripe + Zoom free tier. On a 10-seat cohort at $2,500: $99 + ~$730 in Stripe fees = ~$829 total platform cost for the cohort. Monthly run cost: ~$100-130.
- **Fit:** Built for exactly this: community + content + classroom in one product. Members see one URL, one login, one place for everything. The "Classroom" tab hosts the Foundations Library async content. The "Community" tab handles discussion between sessions. Enrollment page is native. Stripe handles payment without any platform taking a cut of revenue.
- **Risks:** Skool's enrollment/checkout flow is usable but not as polished as a dedicated landing page. You'll likely want a simple external landing page (a Notion site or a one-pager) pointing to Skool for enrollment rather than sending cold traffic directly to a Skool community page. Also: Skool's calendar/event feature is basic — you'll schedule Zoom links manually in the community each week, which is fine but slightly more manual than Maven's native session scheduling.
- **Verdict: Recommended. Best cost structure, solid participant experience, matches the program's functional needs.**

---

### Option B: Maven
- **Cost:** No monthly fee. 10% revenue share. On 10 seats at $2,500: $2,500 in platform fees per cohort. On 12 seats: $3,000.
- **Fit:** Genuinely purpose-built for cohort-based courses. Enrollment, payment, live sessions (Zoom-integrated), community, office hours, recordings — all native. The brand association with serious educators is real; Maven carries credibility on its own. Setup time is legitimately faster than building out a Skool community from scratch.
- **Risks:** The fee structure is the problem. $2,500–$3,000 per cohort is a meaningful cut of a program this size, and it only gets worse as the program scales. Maven makes sense for operators who need speed-to-launch above all else or who are running high-volume cohorts where the operational simplicity earns its keep. At one cohort per quarter with 10-15 seats, you're paying a tax on every seat forever. Maven also limits your ability to build a persistent community — cohort communities are often time-boxed and don't compound the way an owned Skool community does.
- **Verdict: Runner-up. Wins on setup speed and polish. Loses on cost structure and long-term community ownership.**

---

### Option C: Circle + Stripe + Zoom
- **Cost:** $89–$199/mo depending on tier. Circle's base tier is functional; the higher tier adds better event features and custom domain. At Basic tier, you're looking at ~$90-100/mo + Stripe fees, similar to Skool.
- **Fit:** Circle's community UX is arguably more polished than Skool's — spaces feel cleaner, thread discussions are better organized, the member experience is closer to a "private network" than a course platform. It also has a native payments/subscriptions layer.
- **Risks:** Circle is better for communities that are the product. Manager Forge's community is important but secondary to the curriculum and live sessions. You'd be paying for UX polish that most participants won't deeply appreciate, and Circle's content/course hosting is weaker than Skool's classroom tab. It also requires more configuration to feel right out of the box. Not a bad choice, just not the optimal one for this specific program structure.
- **Verdict: Viable but not the right fit. Better suited to a community-first product than a cohort-first program.**

---

### Option D: Kajabi
- **Cost:** $149–$399/mo. No revenue share.
- **Fit:** Kajabi is a full creator business platform — courses, email marketing, landing pages, memberships, community, podcasts, payment processing. It's comprehensive.
- **Risks:** It's built for async course businesses, not live cohorts. The community feature (Kajabi Communities) is newer and less developed than Skool or Circle. You'd be paying $150-400/mo for a significant amount of functionality you don't need — email marketing (you have your own stack), podcast hosting, website builder — while getting a weaker live-cohort experience than the alternatives. The setup complexity is also real; Kajabi has a learning curve that will burn time you don't have before June 15.
- **Verdict: Wrong tool for this program. Disqualified.**

---

### Option E: Notion + Stripe + Zoom
- **Cost:** $0–$16/mo + Stripe fees.
- **Fit:** Maximum flexibility, minimum friction to launch. A Notion workspace can be a clean content hub.
- **Risks:** Does not hold up at $2,500. A Slack community, a Notion doc, and a Zoom link is what $300 products look like. Participants who write a check for $2,500 expect a purpose-built environment. The lack of integrated community — a real async home between sessions — is the core gap. Slack threads degrade fast in group settings; free Circle has limitations. This option signals "side project," not "serious program."
- **Verdict: Disqualified. Price credibility mismatch is fatal.**

---

## Recommended Stack: Skool + Stripe + Zoom

### What It Covers
- **Community** — discussion, async questions, peer interaction between sessions; the persistent community accumulates value across cohorts as the alumni base grows
- **Content delivery** — Foundations Library lives in the Classroom tab; drip it by week or open all modules on day one
- **Enrollment** — Skool generates an enrollment/checkout page; connect Stripe for direct payment
- **Live sessions** — Zoom link posted in the community each week; Zoom free tier handles <100 participants with no issues at this scale
- **Recordings** — post Zoom recordings directly to the relevant week's Classroom module after each session
- **Credibility** — Skool communities used by operators selling $2,000–$10,000 programs; the UX signals "this is a real program"

### What It Doesn't Cover
- **Native event scheduling** — you post Zoom links manually each week; not a meaningful burden for 6 sessions
- **Polished external landing page** — Skool's enrollment page is functional but not a marketing landing page. Plan to build a simple external page (Notion public, Carrd, or similar) for presell traffic before enrollment opens; that page points to Skool to complete enrollment
- **Email marketing** — you'll handle enrollment follow-up and cohort communications outside Skool (use whatever you're currently using; simple is fine)
- **Payment plans** — Stripe handles it but you configure this outside Skool; for $2,500 you may want to offer a 2-payment option ($1,350 × 2) — set this up as a separate Stripe payment link

### Participant Experience
On enrollment day, the participant:
1. Lands on the external presell page, decides to enroll, clicks through to the Skool enrollment page
2. Pays via Stripe (saved card, Apple Pay supported)
3. Gets access to the Manager Forge Skool community immediately
4. Sees: a pinned Welcome post with orientation details, the Classroom tab with Week 1 content (or a "starts July 13" placeholder), and a Community tab for introductions
5. Each Monday before the weekly session: Andrew posts the Zoom link and a brief "what we're covering tonight" framing in the community
6. Session happens on Zoom; recording is uploaded to the Classroom module by Tuesday
7. Between sessions: discussion happens in the community; Andrew can drop in with async commentary, additional resources, or answers
8. At program end: alumni keep community access (if you want — Skool lets you set this); the cohort compounds into a persistent alumni base for future cohort enrollment

### Setup Timeline (target: live by June 15)

**Week 1 (by April 28)**
- Create Skool account; set up Manager Forge community
- Configure branding (logo, cover image, color — use whatever's coming out of the brand system work)
- Create community structure: intro pinned post, Community tab categories (Week-by-Week, General Discussion, Hot Takes/Tools, Q&A)
- Set up Classroom tab with Week 1–6 structure as placeholders (content fills in during Phase 3)

**Week 2 (by May 5)**
- Connect Stripe to Skool enrollment
- Set Skool enrollment page pricing ($2,500); create secondary Stripe payment link for 2-pay option if offering it
- Write enrollment page copy (headline, what you get, who it's for, Andrew's credibility angle)
- Test full enrollment flow end-to-end with a test purchase

**Phase 3 (May 19 – June 15)**
- Load Foundations Library content into Classroom as curriculum is built
- Create the external presell landing page (a single clean page; Notion public or Carrd is fine)
- Set up a simple email capture on the presell page for "notify me when enrollment opens" ahead of June 15

**June 15 — Pre-sell opens**
- Flip enrollment from waitlist to live
- Post enrollment link to LinkedIn, email list, BOL episode mention
- Community is live, Zoom links for Cohort 1 sessions are scheduled and drafted

### Monthly Cost at Cohort 1 Scale
- Skool: $99/mo
- Stripe fees on 10 seats × $2,500: ~$730 total (one-time at enrollment)
- Zoom: $0 (free tier, <40 min limit on free tier with >2 people — **you need a Zoom paid account if sessions run >40 min, which they will**)
- **Zoom Pro: $15.99/mo**
- **Adjusted total: ~$115/mo + Stripe transaction fees**
- Per-cohort platform cost (Skool + Zoom for 2 months + Stripe): ~$460 on a 10-seat, $25,000 cohort. That's a 1.8% effective platform cost versus Maven's 10%.

**Note on Zoom:** The free Zoom tier cuts meetings at 40 minutes when there are more than 2 participants. A paid Zoom Pro account ($15.99/mo) is required for 90-minute sessions. This might already exist in your stack — if not, add it.

---

## Runner-Up: Maven

**Choose Maven instead of Skool if:**
- The June 15 deadline becomes a real threat — Maven's all-in-one setup can get you live in a few days versus 2 weeks for Skool
- You decide Cohort 1 is a true pilot (small, maybe 6-8 people at a reduced price) and you'd rather minimize setup work in exchange for the rev share
- You want a platform that handles live session scheduling natively, including calendar invites and reminders, without any manual posting

**The math that keeps Maven as runner-up:** On 10 seats at $2,500, Maven takes $2,500. Over 4 cohorts (a realistic first year), that's $10,000 in platform fees. Skool + Zoom for a year is ~$1,400. The breakeven where Maven's operational simplicity is worth the cost doesn't exist at this scale.

---

## Setup Checklist

**Skool community setup**
- [ ] Create Skool account at skool.com
- [ ] Name community "Manager Forge" (or "Manager Forge Cohort" if keeping the top-level community open to alumni from future cohorts)
- [ ] Upload logo, cover image, brand colors
- [ ] Create community categories: Introductions, Week-by-Week Discussions, Tools & Resources, General
- [ ] Create Classroom: 6 week modules + 1 Foundations Library section
- [ ] Pin welcome post with orientation instructions
- [ ] Set community to "private" (invite-only until enrollment opens)

**Payment setup**
- [ ] Connect Stripe to Skool (Skool has native Stripe integration)
- [ ] Set enrollment price: $2,500 (full pay)
- [ ] Create Stripe payment link for 2-pay option ($1,350 × 2) — host this link separately from Skool enrollment
- [ ] Test full enrollment flow: purchase → community access → welcome email

**Zoom**
- [ ] Confirm you have Zoom Pro (or upgrade; $15.99/mo)
- [ ] Create recurring meeting for 6 Tuesdays (or whatever session day is set) starting July 13
- [ ] Add Zoom links to a draft pinned post in each week's community thread — don't post until the week is live

**Presell landing page**
- [ ] Build a single external page (Notion public or Carrd) with: headline, what you get, 6-week overview, who it's for, pricing, Andrew's credibility callout, enrollment CTA or waitlist capture
- [ ] Add "Notify me when enrollment opens" email capture pointed at your email tool of choice
- [ ] Have page ready to go live June 15

**Pre-launch (June 1–14)**
- [ ] Load any completed Foundations Library content into Classroom
- [ ] Create a "Cohort 1 is coming" community post for the first members who enroll early
- [ ] Confirm Zoom links are in place for all 6 sessions
- [ ] Run a full participant experience walkthrough: enroll as a test user, see what they see, fix anything that feels rough
