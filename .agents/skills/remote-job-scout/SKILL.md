---
name: remote-job-scout
description: >-
  Scouts authentic, verified, 100% remote worldwide Frontend Engineer jobs matching Noor Ullah's profile (4+ YOE, React, Next.js, TypeScript, Tailwind, Pakistan location) from LinkedIn, Ashby, Greenhouse, Lever, YC, and Wellfound published within the latest 2 to 3 days. Use whenever the user asks to find, fetch, or scout jobs.
---

# Remote Job Scout for Noor Ullah

This skill automates the search, vetting, and presentation of remote frontend engineering jobs for **Noor Ullah**.

## Candidate Profile
* **Name:** Noor Ullah
* **Experience:** 4+ years of professional Frontend / Full-Stack Engineering.
* **Core Stack:** React.js, Next.js, TypeScript, Tailwind CSS, TanStack Query, Zustand, modern CSS, component design systems.
* **Key Achievements:** Built and scaled TechBazaar.pk from 0 to 300K+ active users; 90+ Lighthouse performance scores; consumer checkout & complex client state.
* **Location:** Pakistan (UTC+5).

---

## Mandatory Criteria & Filters

Every job presented MUST satisfy all of the following criteria:

1. **Role Title:**
   * Frontend Engineer, Senior Frontend Engineer, React Developer, UI Engineer, Product Engineer (Frontend-leaning).
   * Level: Mid to Senior (aligned with 4+ years of experience).

2. **Platforms Supported:**
   * **LinkedIn Jobs** (Direct employer postings only).
   * Direct ATS boards: **Ashby** (`jobs.ashbyhq.com`), **Greenhouse** (`boards.greenhouse.io`), **Lever** (`jobs.lever.co`), **Y Combinator** (`workatastartup.com`), and **Wellfound** (`wellfound.com`).

3. **Location Restriction Check (Strict):**
   * Must be **100% Remote**.
   * Must be **Worldwide / Anywhere / Everywhere / Global** OR explicitly open to Pakistan / APAC / EMEA without regional lock.
   * **REJECT IMMEDIATELY** if the JD specifies US-only, Canada-only, EU-only, UK-only, or requires specific national work authorizations/citizenship.

4. **Strict Recency Check (Latest 2 to 3 Days Only):**
   * Maximum age of posting must be within the **latest 2 to 3 days (48 to 72 hours)** relative to the current search date.
   * Always verify exact backend `publishedAt` / `created_at` timestamps to avoid evergreen or lingering older postings.
   * Reject postings older than 3 days.

5. **Authenticity & Anti-Spam (Strict):**
   * Must be genuine tech companies or venture-backed startups with verified application paths.
   * On LinkedIn, avoid third-party agency reposts, spam staffing firms, and ghost jobs (e.g., Crossover, BairesDev, Turing, DevsData). Ensure it is posted by the actual hiring company.

6. **Batch Size:**
   * Return exactly **4 to 5 curated jobs** per request so each one can be thoroughly reviewed.

---

## Output Format

For each job, provide:
1. **[Company Name](URL)** – **Job Title**
2. **Platform & Direct Link:** Direct ATS or LinkedIn job posting link.
3. **Exact Publication Date & Age:** (e.g., "Published yesterday (Oct 14, 2026)")
4. **Location / Remote Status:** Verified Worldwide / Open to Pakistan status.
5. **Compensation:** Salary/rate if disclosed in the JD.
6. **Tech Stack:** Specific technologies mentioned.
7. **Why it fits Noor:** Specific points connecting Noor's React/Next.js/TechBazaar experience to the company's needs.
8. **Attention-to-detail / Special Questions:** Flag any specific prompts (e.g. keywords, cover letters, questions) in the JD.
