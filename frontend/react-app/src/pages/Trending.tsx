// src/pages/Trending.tsx
import useArticles from "../hooks/useArticles";
import { ArticleGrid } from "../components/articles/ArticleGrid";

export const Trending = () => {
  const { articles, loading } = useArticles();

  if (loading) return <div>Loading...</div>;

  const trendingArticles = [...articles].sort(
    (a, b) => b.relevanceScore - a.relevanceScore
  );

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Trending Articles</h1>
      <ArticleGrid articles={trendingArticles} columns={3} withAnimation />
    </div>
  );
};
