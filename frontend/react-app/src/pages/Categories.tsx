// src/pages/Categories.tsx
import { useParams } from "react-router-dom";
import useArticles from "../hooks/useArticles";
import { ArticleGrid } from "../components/articles/ArticleGrid";

export const Categories = () => {
  const { category } = useParams();
  const { articles, loading } = useArticles();

  if (loading) return <div>Loading...</div>;

  const filteredArticles = category
    ? articles.filter(
        (article) => article.category.toLowerCase() === category.toLowerCase()
      )
    : articles;

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">
        {category ? `${category} Articles` : "All Categories"}
      </h1>
      <ArticleGrid articles={filteredArticles} columns={3} withAnimation />
    </div>
  );
};
