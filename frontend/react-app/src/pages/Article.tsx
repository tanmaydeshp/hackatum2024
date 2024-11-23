// src/pages/Article.tsx
import { useParams } from "react-router-dom";
import useArticles from "../hooks/useArticles";
import { motion } from "framer-motion";

export const Article = () => {
  const { id } = useParams();
  const { articles, loading } = useArticles();

  if (loading) return <div>Loading...</div>;

  const article = articles.find((a) => a.id === id);
  if (!article) return <div>Article not found</div>;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-6">
        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
          {article.category}
        </span>
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>
      <div className="text-gray-400 mb-8">
        <time>{new Date(article.timestamp).toLocaleDateString()}</time>
      </div>
      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
        {article.content}
      </p>
      <div className="mt-8 p-4 bg-white/5 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-2">AI Summary</h2>
        <p className="text-gray-300">{article.aiSummary}</p>
      </div>
    </motion.article>
  );
};
