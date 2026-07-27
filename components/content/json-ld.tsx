import type { Topic } from "@/lib/topics";
import { SITE_URL, SITE_NAME, SITE_AUTHOR } from "@/lib/site";

/** TechArticle structured data for a topic page — the JSON-LD layer that
 *  search engines and LLM crawlers extract entities and authorship from. */
export function TopicJsonLd({ topic }: { topic: Topic }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: topic.title,
    description: topic.description,
    url: `${SITE_URL}/topics/${topic.slug}`,
    datePublished: topic.date,
    keywords: topic.tags.join(", "),
    author: { "@type": "Person", name: SITE_AUTHOR },
    publisher: { "@type": "Person", name: SITE_AUTHOR },
    isPartOf: topic.seriesTitle
      ? { "@type": "Series", name: topic.seriesTitle, position: topic.part }
      : undefined,
    mainEntityOfPage: `${SITE_URL}/topics/${topic.slug}`,
    inLanguage: "en",
    about: topic.tags.map((t) => ({ "@type": "Thing", name: t })),
    provider: { "@type": "Organization", name: SITE_NAME },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
