import type { OperatorWorkflowState } from "../types";

export type OperatorStepId =
  | "account-profile"
  | "competitor-research"
  | "topic-planning"
  | "note-brief"
  | "draft-generation"
  | "human-review"
  | "publishing-plan";

export interface OperatorWorkflowStep {
  id: OperatorStepId;
  name: string;
  description: string;
  agent: string;
  requiresHumanReview?: boolean;
  outputKey: keyof OperatorWorkflowState;
}

export const xiaohongshuContentWorkflow: OperatorWorkflowStep[] = [
  {
    id: "account-profile",
    name: "Account Profile",
    description: "Capture creator positioning, target audience, tone, content pillars, and constraints.",
    agent: "account-profiler",
    outputKey: "accountProfile",
  },
  {
    id: "competitor-research",
    name: "Competitor Research",
    description: "Extract reusable topic, title, hook, and cover-text patterns from similar accounts.",
    agent: "competitor-researcher",
    outputKey: "competitorPatterns",
  },
  {
    id: "topic-planning",
    name: "Topic Planning",
    description: "Generate and prioritize a topic backlog based on account profile and competitor patterns.",
    agent: "topic-planner",
    outputKey: "topicIdeas",
  },
  {
    id: "note-brief",
    name: "Note Brief",
    description: "Turn a selected topic into a production-ready note brief.",
    agent: "note-brief-writer",
    outputKey: "noteBrief",
  },
  {
    id: "draft-generation",
    name: "Draft Generation",
    description: "Generate Xiaohongshu-style titles, body draft, hashtags, and cover copy.",
    agent: "draft-writer",
    outputKey: "noteDraft",
  },
  {
    id: "human-review",
    name: "Human Review",
    description: "Review the draft against account positioning, hook strength, usefulness, and AI-tone risk.",
    agent: "review-agent",
    requiresHumanReview: true,
    outputKey: "reviewResult",
  },
  {
    id: "publishing-plan",
    name: "Publishing Plan",
    description: "Place approved notes into a weekly publishing plan with experiment hypotheses.",
    agent: "publishing-planner",
    outputKey: "publishingPlan",
  },
];

export function createInitialOperatorWorkflowState(): OperatorWorkflowState {
  return {
    competitorPatterns: [],
    topicIdeas: [],
    publishingPlan: [],
  };
}
