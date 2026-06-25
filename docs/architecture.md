# Xiaohongshu AI Operator Architecture

> Architecture spec for building an AI digital content operator for Xiaohongshu creators, personal brands, local businesses, and small teams.

## Positioning

Xiaohongshu AI Operator is not a generic AI writing tool.

It is a repeatable creator-operation system:

```text
Account Profile
  -> Competitor Research
  -> Topic Pool
  -> Note Brief
  -> Draft Generation
  -> Human Review
  -> Publishing Plan
  -> Data Feedback
  -> Next Iteration
```

The product should feel like an AI digital editor / AI content operator that helps a creator keep publishing consistently.

## Architecture decision

Do not copy a general collaboration-platform architecture in the first version.

The first version should borrow the workflow ideas from `agent-workstation`, but implement them inside this product as a focused vertical workflow.

### What to borrow from agent-workstation

- agent roles
- explicit workflow steps
- structured outputs
- artifacts / trace logs
- retryable steps
- human review checkpoints

### What not to borrow yet

- generic multi-tenant collaboration workspace
- complex permission model
- full plugin marketplace
- universal workflow builder
- heavy agent orchestration UI

The MVP should be opinionated and vertical.

## MVP workflow

```text
1. Creator Account Profile
2. Content Goal
3. Topic Ideas
4. Note Brief
5. Note Draft
6. Review Checklist
7. Publishing Plan
```

## Core agents

### 1. Account Profiler

Purpose:

Understand the creator's positioning.

Inputs:

- niche
- audience
- offer / product / service
- tone
- content constraints
- examples of past content

Outputs:

- account positioning
- audience segments
- content pillars
- tone guide
- forbidden angles

### 2. Competitor Researcher

Purpose:

Analyze similar Xiaohongshu accounts and extract reusable content patterns.

Inputs:

- competitor accounts
- collected posts
- niche keywords

Outputs:

- recurring topics
- title patterns
- hook patterns
- cover-text patterns
- emotional triggers
- content gaps

### 3. Topic Planner

Purpose:

Create a topic backlog.

Inputs:

- account profile
- competitor patterns
- business goal

Outputs:

- topic ideas
- target audience
- content angle
- expected user intent
- priority score

### 4. Note Brief Writer

Purpose:

Turn one topic idea into a production-ready note brief.

Outputs:

- title direction
- opening hook
- outline
- key talking points
- cover text
- image / visual direction
- CTA

### 5. Draft Writer

Purpose:

Generate a Xiaohongshu-style draft based on the brief.

Outputs:

- title options
- body draft
- hashtags
- cover copy
- alternative hook

### 6. Review Agent

Purpose:

Score and improve a draft before publishing.

Checks:

- account-position fit
- hook strength
- user value
- Xiaohongshu readability
- title clarity
- commercial intent risk
- repetition / generic AI tone

### 7. Publishing Planner

Purpose:

Turn approved notes into a weekly publishing plan.

Outputs:

- date
- topic
- draft status
- visual direction
- experiment hypothesis
- expected feedback metric

## Data model

### AccountProfile

```ts
interface AccountProfile {
  id: string;
  name: string;
  niche: string;
  audience: string[];
  offer?: string;
  tone: string[];
  contentPillars: string[];
  constraints: string[];
}
```

### TopicIdea

```ts
interface TopicIdea {
  id: string;
  title: string;
  angle: string;
  audienceIntent: string;
  pillar: string;
  priority: number;
  source: "manual" | "competitor" | "ai" | "feedback";
}
```

### NoteBrief

```ts
interface NoteBrief {
  id: string;
  topicId: string;
  hook: string;
  outline: string[];
  keyPoints: string[];
  coverText: string;
  visualDirection: string;
  cta?: string;
}
```

### NoteDraft

```ts
interface NoteDraft {
  id: string;
  briefId: string;
  titles: string[];
  body: string;
  hashtags: string[];
  coverText: string;
  status: "draft" | "reviewed" | "approved" | "published";
}
```

### ReviewResult

```ts
interface ReviewResult {
  id: string;
  draftId: string;
  score: number;
  issues: string[];
  suggestions: string[];
  approved: boolean;
}
```

## Suggested folder structure

```text
src/
  domain/
    operator/
      types.ts
      agents/
        accountProfiler.ts
        competitorResearcher.ts
        topicPlanner.ts
        noteBriefWriter.ts
        draftWriter.ts
        reviewAgent.ts
        publishingPlanner.ts
      workflows/
        xiaohongshuContentWorkflow.ts
      prompts/
        account-profiler.md
        topic-planner.md
        note-brief-writer.md
        draft-writer.md
        review-agent.md
  pages/
    index.astro
    dashboard.astro
    api/
      operator/
        generate-topic.ts
        generate-brief.ts
        generate-draft.ts
        review-draft.ts
```

## MVP screens

### Landing page

Purpose:

Explain the product and collect interest.

Sections:

- problem
- AI digital content operator concept
- workflow
- target users
- sample output
- email / contact CTA

### Operator dashboard

Purpose:

Let the user run the first workflow.

Core panels:

- account profile
- topic pool
- selected topic
- generated brief
- generated draft
- review checklist

### Review page

Purpose:

Make human-in-the-loop review explicit.

The product should not auto-publish in MVP. The value is in making content production repeatable while keeping the creator in control.

## MVP boundary

Build first:

- account profile form
- topic idea generator
- note brief generator
- draft generator
- review checklist
- manual save / copy output

Do not build yet:

- automatic Xiaohongshu publishing
- browser automation login
- complex team permissions
- billing
- marketplace
- generic workflow builder

## Principle

The first product should be a vertical AI operator, not a platform.

Platform comes later if the workflow proves useful.
