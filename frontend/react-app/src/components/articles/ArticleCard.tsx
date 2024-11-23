import { motion } from "framer-motion";
import Card from "../ui/card";
import type { Article } from "../../types/article";

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  const intensity = article.relevanceScore * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative aspect-square"
      style={{
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
    >
      <Card className="w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
          style={{ opacity: intensity / 100 }}
        />
        <div className="p-4 relative z-10">
          <h3 className="text-lg font-bold">{article.title}</h3>
          <p className="text-sm text-gray-200">{article.aiSummary}</p>
        </div>
      </Card>
    </motion.div>
  );
};
