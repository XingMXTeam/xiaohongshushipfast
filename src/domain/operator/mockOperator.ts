import type {
  AccountProfile,
  NoteBrief,
  NoteDraft,
  PublishingPlanItem,
  ReviewResult,
  TopicIdea,
} from "./types";

export const demoAccountProfile: AccountProfile = {
  id: "account-demo-ai-coach",
  name: "AI效率教练",
  niche: "AI 工具与个人效率",
  audience: ["自由职业者", "小团队老板", "想用 AI 提效的职场人"],
  offer: "AI 工作流咨询与训练营",
  tone: ["真实", "克制", "有方法论", "不卖焦虑"],
  contentPillars: ["AI 工具实操", "工作流拆解", "案例复盘", "避坑指南"],
  constraints: ["避免夸张承诺", "避免空泛鸡血", "每篇都要给可执行步骤"],
};

export const demoTopicIdeas: TopicIdea[] = [
  {
    id: "topic-001",
    title: "普通人用 AI 做小红书，真正难的不是写文案",
    angle: "反常识：问题不是不会写，而是没有稳定选题系统。",
    audienceIntent: "想开始做小红书，但不知道每天发什么。",
    pillar: "工作流拆解",
    priority: 92,
    source: "ai",
  },
  {
    id: "topic-002",
    title: "别再让 AI 直接写爆款标题，先让它做竞品拆解",
    angle: "把 AI 从写手变成运营助理。",
    audienceIntent: "想提升内容质量，但不知道怎么分析同行。",
    pillar: "AI 工具实操",
    priority: 88,
    source: "ai",
  },
  {
    id: "topic-003",
    title: "一个人做内容，最应该先搭建哪 3 个 AI 工作流",
    angle: "从日常可坚持的流程入手，而不是追求全自动。",
    audienceIntent: "想用 AI 降低内容生产负担。",
    pillar: "避坑指南",
    priority: 84,
    source: "ai",
  },
];

export const demoNoteBrief: NoteBrief = {
  id: "brief-001",
  topicId: "topic-001",
  hook: "很多人以为做小红书难在写文案，其实真正卡住你的，是每天不知道该写什么。",
  outline: [
    "先指出常见误区：直接让 AI 写一篇笔记",
    "解释真正的问题：缺账号画像、缺选题池、缺复盘",
    "给出一个简单工作流：账号画像 -> 竞品拆解 -> 选题池 -> brief -> 草稿",
    "强调 AI 数字运营人的价值：不是代替你，而是帮你持续推进",
  ],
  keyPoints: [
    "AI 写作不是起点，账号定位才是起点",
    "选题池比单篇爆文更重要",
    "每篇内容都应该有 brief，而不是直接生成正文",
    "人审节点必须保留，否则内容会越来越像 AI",
  ],
  coverText: "做小红书，别先让 AI 写文案",
  visualDirection: "干净白底 + 大标题 + 流程箭头：账号画像 → 选题池 → Brief → 草稿",
  cta: "想看我怎么搭这个 AI 内容工作流，可以收藏这篇。",
};

export const demoNoteDraft: NoteDraft = {
  id: "draft-001",
  briefId: "brief-001",
  titles: [
    "做小红书，别一上来就让 AI 写文案",
    "普通人用 AI 做内容，真正难的不是写",
    "每天不知道发什么？你缺的不是文案，是系统",
  ],
  body: `很多人刚开始用 AI 做小红书，第一反应就是：\n\n“帮我写一篇爆款笔记。”\n\n但这个方向其实很容易跑偏。因为你真正缺的，往往不是一篇文案，而是一套能持续运转的内容系统。\n\n我会先做 4 件事：\n\n1. 账号画像：你是谁，给谁看，解决什么问题。\n2. 竞品拆解：同行为什么有人收藏、评论、关注。\n3. 选题池：不要每天临时想，而是提前积累 30 个方向。\n4. Note Brief：先写清楚标题方向、开头、结构、封面文案，再让 AI 起草。\n\nAI 更适合当“数字运营人”，而不是一次性写手。\n\n它应该帮你拆选题、看同行、生成 brief、起草初稿、做发布计划。最后那一步，人还是要审。\n\n因为真正有辨识度的内容，不是全自动生成出来的，而是人和 AI 一起磨出来的。`,
  hashtags: ["小红书运营", "AI工具", "内容创作", "个人IP", "AI工作流"],
  coverText: "别先让 AI 写文案",
  status: "reviewed",
};

export const demoReviewResult: ReviewResult = {
  id: "review-001",
  draftId: "draft-001",
  score: 86,
  issues: [
    "开头有共鸣，但还可以更具体地描述创作者的日常痛点。",
    "CTA 偏弱，可以增加一个更明确的收藏理由。",
  ],
  suggestions: [
    "加入一句：真正痛苦的是打开小红书后台，脑子一片空白。",
    "把结尾改成：收藏这套流程，下次不知道发什么就按这个走。",
  ],
  approved: true,
};

export const demoPublishingPlan: PublishingPlanItem[] = [
  {
    id: "plan-001",
    date: "Monday",
    topicId: "topic-001",
    draftId: "draft-001",
    visualDirection: "流程图封面",
    experimentHypothesis: "反常识标题能提升点击率。",
    expectedFeedbackMetric: "收藏率",
  },
  {
    id: "plan-002",
    date: "Wednesday",
    topicId: "topic-002",
    visualDirection: "竞品拆解截图式封面",
    experimentHypothesis: "具体方法论能提升评论区提问。",
    expectedFeedbackMetric: "评论数",
  },
  {
    id: "plan-003",
    date: "Friday",
    topicId: "topic-003",
    visualDirection: "3 个工作流清单封面",
    experimentHypothesis: "清单型内容更容易被收藏。",
    expectedFeedbackMetric: "收藏率",
  },
];
