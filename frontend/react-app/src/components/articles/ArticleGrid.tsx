// src/components/articles/ArticleGrid.tsx
import { motion } from "framer-motion";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "../../types/article";

interface Props {
  articles: Article[];
  columns?: number;
  withAnimation?: boolean;
}

export const ArticleGrid = ({
  articles,
  columns = 3,
  withAnimation = false,
}: Props) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={withAnimation ? { opacity: 0, y: 20 } : false}
          animate={withAnimation ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ArticleCard article={article} />
        </motion.div>
      ))}
    </div>
  );
};
