export type CategoryId =
  | "ai"
  | "git"
  | "devops"
  | "detection"
  | "hunting"
  | "architecture"
  | "delivery";

export type TopicDifficulty = "foundation" | "intermediate" | "advanced";
export type TopicVisualType =
  | "architecture"
  | "sequence"
  | "decision-tree"
  | "comparison"
  | "state-machine"
  | "lab";

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
  /** The concrete thing a reader should understand after completing the topic. */
  outcome: string;
  tags: string[];
  concepts: string[];
  prerequisites: string[];
  related: string[];
  date: string;
  verifiedAt: string;
  difficulty: TopicDifficulty;
  readingMinutes: number;
  visualType: TopicVisualType;
  featured?: boolean;
  /** Optional multi-part series grouping. Topics with the same seriesId
   *  are chapters, ordered by `part`, and get prev/next navigation. */
  seriesId?: string;
  seriesTitle?: string;
  part?: number;
  /** Optional companion example repo/folder path (relative to repo root). */
  examples?: string;
}

export const CATEGORIES: Category[] = [
  { id: "ai", name: "AI & agentic systems", blurb: "Models, agents, orchestration, RAG, and applied AI architecture" },
  { id: "git", name: "Git & collaboration", blurb: "Version control, branching, worktrees, team workflows" },
  { id: "devops", name: "DevOps & automation", blurb: "CI/CD, detection-as-code, IaC, pipelines" },
  { id: "detection", name: "Detection engineering", blurb: "Analytic rules, use cases, tuning, MITRE mapping" },
  { id: "hunting", name: "Threat hunting & KQL", blurb: "Hunt notes, KQL patterns, table deep-dives" },
  { id: "architecture", name: "Security architecture", blurb: "Solution design, governance, cloud posture" },
  { id: "delivery", name: "Consulting & delivery", blurb: "HLDs, LLDs, project plans, client practice" },
];

export const TOPICS: Topic[] = [
  {
    title: "From Machine Learning to Agentic AI",
    slug: "from-ml-to-agentic-ai",
    category: "ai",
    description:
      "One continuous signal path from rule-based AI and machine learning to LLMs, autonomous agents, multi-agent orchestration, and enterprise RAG with Cosmos DB.",
    outcome:
      "Explain what turns an LLM into an agent, how specialist agents coordinate, and where retrieval and Cosmos DB sit in the end-to-end RAG flow.",
    tags: ["AI", "machine learning", "LLM", "agents", "RAG", "Cosmos DB"],
    concepts: ["transformers", "reasoning loop", "tool use", "multi-agent orchestration", "vector retrieval"],
    prerequisites: ["none"],
    related: [],
    date: "2026-07-25",
    verifiedAt: "2026-07-25",
    difficulty: "foundation",
    readingMinutes: 11,
    visualType: "state-machine",
    featured: true,
  },
  {
    title: "Git collaboration: branches, forks & conflicts",
    slug: "git-collaboration",
    category: "git",
    description:
      "How multiple people work on one repo without colliding — the contribution flow, shared-repo vs fork model, why one branch per task, and exactly what happens when two people push to the same branch.",
    outcome:
      "Trace a contribution from local branch to merge and predict exactly when Git rejects, merges, or raises a conflict.",
    tags: ["Git", "GitHub", "pull requests", "merge conflicts", "collaboration"],
    concepts: ["branch isolation", "fork model", "non-fast-forward", "merge conflict"],
    prerequisites: ["basic terminal use"],
    related: ["git-worktrees"],
    date: "2026-07-24",
    verifiedAt: "2026-07-24",
    difficulty: "foundation",
    readingMinutes: 9,
    visualType: "sequence",
    featured: true,
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
    outcome:
      "Choose when a worktree is safer than switching or stashing, then create and remove one without duplicating repository history.",
    tags: ["Git", "worktree", "branching", "workflow"],
    concepts: ["working tree", "shared object store", "parallel branches", "branch isolation"],
    prerequisites: ["branches", "commits"],
    related: ["git-collaboration"],
    date: "2026-07-24",
    verifiedAt: "2026-07-24",
    difficulty: "foundation",
    readingMinutes: 8,
    visualType: "architecture",
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
    outcome:
      "Design a governed path that promotes an analytic rule from authoring through review, validation, development, and production.",
    tags: ["Sentinel", "GitHub Actions", "Azure DevOps", "Terraform", "ARM"],
    concepts: ["promotion pipeline", "policy gate", "infrastructure as code", "deployment boundary"],
    prerequisites: ["analytic rules", "pull requests"],
    related: ["validating-sentinel-detections", "git-collaboration"],
    date: "2026-07-22",
    verifiedAt: "2026-07-23",
    difficulty: "intermediate",
    readingMinutes: 14,
    visualType: "architecture",
    featured: true,
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
    outcome:
      "Place each validation tier at the right pipeline gate and explain what failure it can and cannot catch.",
    tags: ["Sentinel", "KQL", "CI/CD", "SAST", "testing"],
    concepts: ["static validation", "schema validation", "functional test", "shift left"],
    prerequisites: ["KQL basics", "CI/CD stages"],
    related: ["detection-as-code-cicd"],
    date: "2026-07-23",
    verifiedAt: "2026-07-23",
    difficulty: "intermediate",
    readingMinutes: 12,
    visualType: "decision-tree",
    featured: true,
    seriesId: "detection-as-code",
    seriesTitle: "Detection-as-Code for Sentinel",
    part: 2,
    examples: "examples/detection-as-code-cicd",
  },
];

export function topicsByCategory(id: CategoryId): Topic[] {
  return TOPICS.filter((t) => t.category === id);
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
