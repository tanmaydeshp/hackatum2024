import { ArticleCard } from "./ArticleCard";
import { useArticles } from "../../hooks/useArticles";

export const HexagonGrid = () => {
  const { articles, loading, error } = useArticles();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
