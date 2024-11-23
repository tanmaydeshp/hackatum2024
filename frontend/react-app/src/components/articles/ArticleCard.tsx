// src/components/articles/ArticleCard.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Article } from "../../types/article";

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  return (
    <Link to={`/article/${article.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white/5 rounded-lg overflow-hidden"
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
              {article.category}
            </span>
            <span className="text-gray-400 text-xs">
              {new Date(article.timestamp).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{article.title}</h3>
          <p className="text-gray-300 text-sm line-clamp-2">
            {article.aiSummary}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};
