export type TopicSource = "manual" | "competitor" | "ai" | "feedback";

export type DraftStatus = "draft" | "reviewed" | "approved" | "published";

export interface AccountProfile {
  id: string;
  name: string;
  niche: string;
  audience: string[];
  offer?: string;
  tone: string[];
  contentPillars: string[];
  constraints: string[];
}

export interface CompetitorPattern {
  id: string;
  sourceAccount: string;
  topicPattern: string;
  titlePattern: string;
  hookPattern: string;
  coverTextPattern?: string;
  emotionalTrigger?: string;
  notes?: string;
}

export interface TopicIdea {
  id: string;
  title: string;
  angle: string;
  audienceIntent: string;
  pillar: string;
  priority: number;
  source: TopicSource;
}

export interface NoteBrief {
  id: string;
  topicId: string;
  hook: string;
  outline: string[];
  keyPoints: string[];
  coverText: string;
  visualDirection: string;
  cta?: string;
}

export interface NoteDraft {
  id: string;
  briefId: string;
  titles: string[];
  body: string;
  hashtags: string[];
  coverText: string;
  status: DraftStatus;
}

export interface ReviewResult {
  id: string;
  draftId: string;
  score: number;
  issues: string[];
  suggestions: string[];
  approved: boolean;
}

export interface PublishingPlanItem {
  id: string;
  date: string;
  topicId: string;
  draftId?: string;
  visualDirection?: string;
  experimentHypothesis?: string;
  expectedFeedbackMetric?: string;
}

export interface OperatorWorkflowState {
  accountProfile?: AccountProfile;
  competitorPatterns: CompetitorPattern[];
  topicIdeas: TopicIdea[];
  selectedTopicId?: string;
  noteBrief?: NoteBrief;
  noteDraft?: NoteDraft;
  reviewResult?: ReviewResult;
  publishingPlan: PublishingPlanItem[];
}
