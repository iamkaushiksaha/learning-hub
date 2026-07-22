export type CategoryId =
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
  accent?: "accent" | "teal" | "coral";
}

export const CATEGORIES: Category[] = [
  { id: "devops", name: "DevOps & automation", blurb: "CI/CD, detection-as-code, IaC, pipelines" },
  { id: "detection", name: "Detection engineering", blurb: "Analytic rules, use cases, tuning, MITRE mapping" },
  { id: "hunting", name: "Threat hunting & KQL", blurb: "Hunt notes, KQL patterns, table deep-dives" },
  { id: "architecture", name: "Security architecture", blurb: "Solution design, governance, cloud posture" },
  { id: "delivery", name: "Consulting & delivery", blurb: "HLDs, LLDs, project plans, client practice" },
];

export const TOPICS: Topic[] = [
  {
    title: "Detection-as-Code: CI/CD for Microsoft Sentinel",
    slug: "detection-as-code-cicd",
    category: "devops",
    description:
      "The full pipeline from authoring a rule in the dev UI to automated prod deployment — repo strategy, CI vs CD, ARM vs Terraform, and the governance case.",
    tags: ["Sentinel", "GitHub Actions", "Azure DevOps", "Terraform", "ARM"],
    date: "2026-07-22",
    accent: "accent",
  },
];

export function topicsByCategory(id: CategoryId): Topic[] {
  return TOPICS.filter((t) => t.category === id);
}

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}
