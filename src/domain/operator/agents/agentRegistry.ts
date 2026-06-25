export interface OperatorAgentDefinition {
  id: string;
  name: string;
  role: string;
  goal: string;
  output: string;
}

export const operatorAgents: OperatorAgentDefinition[] = [
  {
    id: "account-profiler",
    name: "Account Profiler",
    role: "Understand the creator's positioning, target audience, tone, offer, and constraints.",
    goal: "Create a reusable account profile that guides all future content decisions.",
    output: "AccountProfile",
  },
  {
    id: "competitor-researcher",
    name: "Competitor Researcher",
    role: "Analyze similar accounts and extract reusable content patterns.",
    goal: "Find topic, title, hook, and cover-text patterns that can inspire the creator's content system.",
    output: "CompetitorPattern[]",
  },
  {
    id: "topic-planner",
    name: "Topic Planner",
    role: "Generate and prioritize content ideas.",
    goal: "Maintain a practical topic backlog that fits the account profile and business goal.",
    output: "TopicIdea[]",
  },
  {
    id: "note-brief-writer",
    name: "Note Brief Writer",
    role: "Turn one topic idea into a production-ready Xiaohongshu note brief.",
    goal: "Produce a brief with hook, outline, key points, cover text, visual direction, and CTA.",
    output: "NoteBrief",
  },
  {
    id: "draft-writer",
    name: "Draft Writer",
    role: "Write Xiaohongshu-style note drafts based on a brief.",
    goal: "Generate titles, body draft, hashtags, cover copy, and alternative hooks.",
    output: "NoteDraft",
  },
  {
    id: "review-agent",
    name: "Review Agent",
    role: "Review the draft before publishing.",
    goal: "Score the draft against account fit, hook strength, usefulness, readability, and AI-tone risk.",
    output: "ReviewResult",
  },
  {
    id: "publishing-planner",
    name: "Publishing Planner",
    role: "Turn approved notes into a weekly publishing plan.",
    goal: "Create a practical publishing schedule with experiment hypotheses and expected feedback metrics.",
    output: "PublishingPlanItem[]",
  },
];
