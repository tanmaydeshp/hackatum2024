// src/components/articles/ArticleSummary.tsx
import { motion } from "framer-motion";
import { CategoryBadge } from "../ui/CategoryBadge";
import { RelevanceIndicator } from "../ui/RelevanceIndicator";
import type { Article } from "../../types/article.ts";

interface Props {
  article: Article;
  featured?: boolean;
}

export default function ArticleSummary({
  article,
  featured,
}: Props): React.ReactElement {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className={`
        relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm
        ${featured ? "p-8" : "p-4"}
      `}
    >
      <CategoryBadge category={article.category} />
      <h3
        className={`
        font-bold text-white mb-2
        ${featured ? "text-2xl" : "text-lg"}
      `}
      >
        {article.title}
      </h3>
      <p className="text-gray-300 line-clamp-2 mb-4">{article.aiSummary}</p>
      <div className="flex items-center justify-between">
        <RelevanceIndicator score={article.relevanceScore} />
        <time className="text-sm text-gray-400">
          {new Date(article.timestamp).toLocaleDateString()}
        </time>
      </div>
    </motion.article>
  );
}
