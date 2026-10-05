import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEARNING_ARTICLES, getLearningArticle } from "@/lib/learning-articles";
import { LearningArticlePage } from "@/components/content/learning-article-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEARNING_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getLearningArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: { canonical: `/topics/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description, url: `/topics/${article.slug}`, images: [`/og/${article.slug}`] },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [`/og/${article.slug}`] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getLearningArticle(slug);
  if (!article) notFound();
  return <LearningArticlePage article={article} />;
}
