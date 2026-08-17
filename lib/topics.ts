export type CategoryId =
  | "git"
  | "devops"
  | "detection"
  | "hunting"
  | "architecture"
  | "delivery";

export type LearningPathId =
  | "agentic-security"
  | "detection-engineering"
  | "engineering-foundations";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
}

export interface Topic {
  title: string;
  slug: string;
  category: CategoryId;
  description: string;
  tags: string[];
  date: string;
  pathId: LearningPathId;
  stage: "Foundation" | "Build" | "Secure" | "Operate";
  level: "Start here" | "Intermediate" | "Applied";
  format: "Interactive series" | "Deep dive" | "Hands-on guide";
  /** Optional multi-part series grouping. Topics with the same seriesId
   *  are chapters, ordered by `part`, and get prev/next navigation. */
  seriesId?: string;
  seriesTitle?: string;
  part?: number;
  /** Optional companion example repo/folder path (relative to repo root). */
  examples?: string;
}

export interface LearningPath {
  id: LearningPathId;
  index: string;
  name: string;
  promise: string;
  outcome: string;
  topicSlugs: string[];
}

export const CATEGORIES: Category[] = [
  { id: "git", name: "Git & collaboration", blurb: "Version control, branching, worktrees, team workflows" },
  { id: "devops", name: "DevOps & automation", blurb: "CI/CD, detection-as-code, IaC, pipelines" },
  { id: "detection", name: "Detection engineering", blurb: "Analytic rules, use cases, tuning, MITRE mapping" },
  { id: "hunting", name: "Threat hunting & KQL", blurb: "Hunt notes, KQL patterns, table deep-dives" },
  { id: "architecture", name: "Security architecture", blurb: "Solution design, governance, cloud posture" },
  { id: "delivery", name: "Consulting & delivery", blurb: "HLDs, LLDs, project plans, client practice" },
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "agentic-security",
    index: "01",
    name: "Agentic AI & security",
    promise: "Understand the capability, secure the loop, and operate it with evidence.",
    outcome: "Move from informed AI use to governed cybersecurity agents without losing human accountability.",
    topicSlugs: [
      "governed-agentic-ai-cybersecurity",
      "langfuse-for-cybersecurity",
    ],
  },
  {
    id: "detection-engineering",
    index: "02",
    name: "Detection engineering",
    promise: "Turn detection logic into a testable, governed delivery pipeline.",
    outcome: "Ship Sentinel analytics with traceable changes, automated quality gates, and deployment discipline.",
    topicSlugs: [
      "detection-as-code-cicd",
      "validating-sentinel-detections",
    ],
  },
  {
    id: "engineering-foundations",
    index: "03",
    name: "Engineering foundations",
    promise: "Build the collaboration habits that make automation safe to change.",
    outcome: "Use branches, pull requests, conflict handling, and worktrees confidently across parallel work.",
    topicSlugs: ["git-collaboration", "git-worktrees"],
  },
];

export const TOPICS: Topic[] = [
  {
    title: "Governed Agentic AI for Cybersecurity",
    slug: "governed-agentic-ai-cybersecurity",
    category: "architecture",
    description:
      "A four-session visual learning path from LLMs and reusable skills to agentic security risks, governed orchestration, and a hands-on cybersecurity agent workshop.",
    tags: ["Agentic AI", "LLMs", "AI security", "cybersecurity", "skills"],
    date: "2026-08-17",
    pathId: "agentic-security",
    stage: "Foundation",
    level: "Start here",
    format: "Interactive series",
  },
  {
    title: "Langfuse for cybersecurity: an SOC lens",
    slug: "langfuse-for-cybersecurity",
    category: "architecture",
    description:
      "How Langfuse traces, sessions, users, scores, evaluations and prompt versions help secure agentic systems—and why a SOC still needs a SIEM for correlation, incidents and response.",
    tags: ["Langfuse", "LLM observability", "SOC", "SIEM", "evaluation"],
    date: "2026-08-18",
    pathId: "agentic-security",
    stage: "Operate",
    level: "Applied",
    format: "Deep dive",
  },
  {
    title: "Git collaboration: branches, forks & conflicts",
    slug: "git-collaboration",
    category: "git",
    description:
      "How multiple people work on one repo without colliding — the contribution flow, shared-repo vs fork model, why one branch per task, and exactly what happens when two people push to the same branch.",
    tags: ["Git", "GitHub", "pull requests", "merge conflicts", "collaboration"],
    date: "2026-07-24",
    pathId: "engineering-foundations",
    stage: "Foundation",
    level: "Start here",
    format: "Hands-on guide",
    seriesId: "working-with-git",
    seriesTitle: "Working with Git",
    part: 1,
    examples: "examples/git-collaboration",
  },
  {
    title: "Git worktrees: many branches at once",
    slug: "git-worktrees",
    category: "git",
    description:
      "The working tree explained, then git worktree — one repository with several branches checked out in parallel folders. When you need it (hotfix mid-feature, PR review, parallel builds) and how it works.",
    tags: ["Git", "worktree", "branching", "workflow"],
    date: "2026-07-24",
    pathId: "engineering-foundations",
    stage: "Build",
    level: "Intermediate",
    format: "Hands-on guide",
    seriesId: "working-with-git",
    seriesTitle: "Working with Git",
    part: 2,
    examples: "examples/git-collaboration",
  },
  {
    title: "Detection-as-Code: the pipeline & governance",
    slug: "detection-as-code-cicd",
    category: "devops",
    description:
      "How analytic rules move from an engineer's idea to a production Sentinel workspace — repo strategy, deploy engines (ARM vs Terraform), CI vs CD, IaC vs API, and the governance case.",
    tags: ["Sentinel", "GitHub Actions", "Azure DevOps", "Terraform", "ARM"],
    date: "2026-07-22",
    pathId: "detection-engineering",
    stage: "Build",
    level: "Intermediate",
    format: "Deep dive",
    seriesId: "detection-as-code",
    seriesTitle: "Detection-as-Code for Sentinel",
    part: 1,
    examples: "examples/detection-as-code-cicd",
  },
  {
    title: "Validating Sentinel detections in CI/CD",
    slug: "validating-sentinel-detections",
    category: "devops",
    description:
      "The three tiers of KQL validation — static lint, syntax/schema check, and functional 'does it fire' testing — mapped to SAST, compile, and DAST, and placed in the pipeline as a shift-left gate.",
    tags: ["Sentinel", "KQL", "CI/CD", "SAST", "testing"],
    date: "2026-07-23",
    pathId: "detection-engineering",
    stage: "Secure",
    level: "Applied",
    format: "Hands-on guide",
    seriesId: "detection-as-code",
    seriesTitle: "Detection-as-Code for Sentinel",
    part: 2,
    examples: "examples/detection-as-code-cicd",
  },
];

export function topicsByCategory(id: CategoryId): Topic[] {
  return TOPICS.filter((t) => t.category === id);
}

export function topicsByPath(id: LearningPathId): Topic[] {
  const path = LEARNING_PATHS.find((item) => item.id === id);
  if (!path) return [];
  return path.topicSlugs
    .map((slug) => getTopic(slug))
    .filter((topic): topic is Topic => Boolean(topic));
}

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

/** Ordered chapters of a series. */
export function seriesTopics(seriesId: string): Topic[] {
  return TOPICS.filter((t) => t.seriesId === seriesId).sort(
    (a, b) => (a.part ?? 0) - (b.part ?? 0),
  );
}

export function seriesNeighbors(topic: Topic): { prev?: Topic; next?: Topic } {
  if (!topic.seriesId) return {};
  const chapters = seriesTopics(topic.seriesId);
  const i = chapters.findIndex((t) => t.slug === topic.slug);
  return { prev: chapters[i - 1], next: chapters[i + 1] };
}
