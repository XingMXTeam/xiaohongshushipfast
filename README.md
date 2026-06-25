# Xiaohongshu AI Operator

> An AI content operation system for Xiaohongshu creators, personal brands, local businesses, and small teams.

This project is an early-stage product experiment. The goal is not to build another generic AI writing tool, but to build a repeatable content operating system for creators who need to publish consistently.

## Why this exists

Many creators and small teams do not fail because they cannot write one post. They fail because they cannot maintain a repeatable content loop:

- They do not know what to post every day.
- They cannot consistently turn ideas into publishable notes.
- They cannot keep analyzing competitors manually.
- They do not want to hire a full-time content operator.
- Traditional agency service is expensive and hard to scale.
- They want to use AI, but do not know how to make it work in a real operating process.

This project explores a more practical model:

> Give every creator an AI digital editor that can assist with topic discovery, competitive research, drafting, publishing plans, and review loops.

## Product direction

The system is designed around a content operation workflow:

```text
Account Profile
  -> Competitor Research
  -> Topic Pool
  -> Note Brief
  -> Draft Generation
  -> Human Review
  -> Publishing Plan
  -> Data Feedback
  -> Next Content Iteration
```

## Core modules

| Module | Purpose |
| --- | --- |
| Account Profile | Understand the creator, niche, audience, tone, offer, and constraints. |
| Competitor Research | Track similar accounts, collect useful patterns, and extract reusable ideas. |
| Topic Pool | Maintain a backlog of content ideas with angle, audience, and priority. |
| Draft Generator | Generate Xiaohongshu-style note drafts, titles, outlines, and hooks. |
| Cover Suggestion | Suggest cover text, visual direction, and emotional trigger. |
| Publishing Calendar | Turn ideas into a weekly publishing plan. |
| Review Loop | Compare output with account positioning and improve future drafts. |

## Current status

This repository is in MVP exploration.

Current priorities:

- Replace starter template residue with a focused product structure.
- Define the first usable workflow: account profile -> topic -> draft -> review.
- Build a minimal dashboard for managing topic pools and drafts.
- Add prompt templates and evaluation criteria for Xiaohongshu notes.
- Connect the project with real creator-operation use cases.

## Tech stack

The current implementation is based on:

- Astro
- Supabase
- Netlify-oriented deployment flow

The stack may change as the product direction becomes clearer. The important part is not the framework itself, but whether the system can support a repeatable creator operation workflow.

## Roadmap

### Phase 1: MVP workflow

- [ ] Account profile form
- [ ] Topic pool management
- [ ] Xiaohongshu note brief generator
- [ ] Draft generation and manual editing
- [ ] Simple weekly publishing calendar

### Phase 2: Research and iteration

- [ ] Competitor account tracking
- [ ] Note pattern extraction
- [ ] Title and hook scoring
- [ ] Draft quality checklist
- [ ] Feedback loop from published content

### Phase 3: Service/product packaging

- [ ] Demo landing page
- [ ] Example creator workflows
- [ ] Case study documentation
- [ ] SEO/GEO pages for long-tail discovery

## Positioning

This project sits at the intersection of:

- AI content operations
- Xiaohongshu creator tooling
- Agentic workflow design
- SEO/GEO growth experiments
- Small-team automation

## Related

- Personal site: [maoxunxing.com](https://maoxunxing.com)
- GitHub profile: [XingMXTeam](https://github.com/XingMXTeam)
