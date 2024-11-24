// src/pages/Trending.tsx
import { useEffect } from "react";
import { useArticles } from "../context/ArticlesContext";
import { ArticleGrid } from "../components/articles/ArticleGrid";

export const Trending = () => {
  const { articles, loading, error, sortByRating } = useArticles();

  useEffect(() => {
    sortByRating();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Trending Articles</h1>
      <ArticleGrid articles={articles} columns={3} withAnimation />
    </div>
  );
};
