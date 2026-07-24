export type CategoryId =
  | "git"
  | "devops"
  | "detection"
  | "hunting"
  | "architecture"
  | "delivery";

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
  /** Optional multi-part series grouping. Topics with the same seriesId
   *  are chapters, ordered by `part`, and get prev/next navigation. */
  seriesId?: string;
  seriesTitle?: string;
  part?: number;
  /** Optional companion example repo/folder path (relative to repo root). */
  examples?: string;
}

export const CATEGORIES: Category[] = [
  { id: "git", name: "Git & collaboration", blurb: "Version control, branching, worktrees, team workflows" },
  { id: "devops", name: "DevOps & automation", blurb: "CI/CD, detection-as-code, IaC, pipelines" },
  { id: "detection", name: "Detection engineering", blurb: "Analytic rules, use cases, tuning, MITRE mapping" },
  { id: "hunting", name: "Threat hunting & KQL", blurb: "Hunt notes, KQL patterns, table deep-dives" },
  { id: "architecture", name: "Security architecture", blurb: "Solution design, governance, cloud posture" },
  { id: "delivery", name: "Consulting & delivery", blurb: "HLDs, LLDs, project plans, client practice" },
];

export const TOPICS: Topic[] = [
  {
    title: "Git collaboration: branches, forks & conflicts",
    slug: "git-collaboration",
    category: "git",
    description:
      "How multiple people work on one repo without colliding — the contribution flow, shared-repo vs fork model, why one branch per task, and exactly what happens when two people push to the same branch.",
    tags: ["Git", "GitHub", "pull requests", "merge conflicts", "collaboration"],
    date: "2026-07-24",
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
