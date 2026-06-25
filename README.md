# Xiaohongshu AI Operator

> An AI content operation system for Xiaohongshu creators, personal brands, local businesses, and small teams.

This project is an early-stage product experiment. The goal is not to build another generic AI writing tool, but to build a repeatable content operating system for creators who need to publish consistently.

## Current runnable version

The repository now contains a runnable MVP prototype:

- `/` — product landing page
- `/dashboard` — mock AI operator dashboard
- `src/domain/operator/types.ts` — creator-operation domain model
- `src/domain/operator/workflows/xiaohongshuContentWorkflow.ts` — workflow skeleton
- `src/domain/operator/agents/agentRegistry.ts` — agent role registry
- `src/domain/operator/mockOperator.ts` — mock output used by the dashboard
- `docs/architecture.md` — product and architecture spec

The current version does not require Supabase or an LLM API key. It uses mock data to demonstrate the first complete workflow.

## Run locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:4321/
http://localhost:4321/dashboard
```

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
| Note Brief | Turn one topic into a production-ready Xiaohongshu note brief. |
| Draft Generator | Generate Xiaohongshu-style note drafts, titles, hashtags, and cover copy. |
| Review Agent | Score the draft against positioning, hook strength, usefulness, readability, and AI-tone risk. |
| Publishing Calendar | Turn approved ideas into a weekly publishing plan. |

## Architecture direction

The architecture borrows workflow ideas from `agent-workstation`, but keeps the product vertical and opinionated.

Borrow:

- agent roles
- explicit workflow steps
- structured outputs
- artifacts / trace logs
- human review checkpoints

Do not build yet:

- universal workflow builder
- generic collaboration workspace
- complex permissions
- plugin marketplace
- automatic publishing

## Tech stack

Current implementation:

- Astro
- TypeScript
- Tailwind-style utility classes
- Mock workflow data

Supabase may still be used later for persistence, but it is no longer required for the current demo.

## Roadmap

### Phase 1: Runnable MVP prototype

- [x] Replace starter homepage with product landing page.
- [x] Add operator dashboard prototype.
- [x] Define domain model.
- [x] Define workflow skeleton.
- [x] Add mock output for topic, brief, draft, review, and publishing plan.
- [ ] Add editable account profile form.
- [ ] Add manual topic creation.
- [ ] Add local save / copy actions.

### Phase 2: Real AI workflow

- [ ] Add prompt templates for each agent.
- [ ] Add structured LLM output generation.
- [ ] Add review scoring and rewrite suggestions.
- [ ] Add run history and trace logs.

### Phase 3: Creator-operation product

- [ ] Competitor account tracking.
- [ ] Note pattern extraction.
- [ ] Publishing calendar persistence.
- [ ] Feedback loop from published content.
- [ ] SEO/GEO landing pages.

## Positioning

This project sits at the intersection of:

- AI content operations
- Xiaohongshu creator tooling
- Agentic workflow design
- SEO/GEO growth experiments
- Small-team automation

## Related

- Architecture: [`docs/architecture.md`](docs/architecture.md)
- Personal site: [maoxunxing.com](https://maoxunxing.com)
- GitHub profile: [XingMXTeam](https://github.com/XingMXTeam)
