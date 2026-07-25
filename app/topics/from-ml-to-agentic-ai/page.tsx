import type { Metadata } from "next";
import { getTopic } from "@/lib/topics";
import { AgenticAiFieldMap } from "@/components/ai/agentic-ai-field-map";

const topic = getTopic("from-ml-to-agentic-ai")!;

export const metadata: Metadata = {
  title: topic.title,
  description: topic.description,
};

export default function Page() {
  return <AgenticAiFieldMap topic={topic} />;
}
