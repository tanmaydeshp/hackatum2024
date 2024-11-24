// src/pages/Categories.tsx
import { useParams } from "react-router-dom";
import useArticles from "../hooks/useArticles";
import { ArticleGrid } from "../components/articles/ArticleGrid";

export const Categories = () => {
  const { category } = useParams();
  const { articles, loading } = useArticles();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        {category ? `${category} Articles` : "All Categories"}
      </h1>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <ArticleGrid
          articles={articles.filter(
            (article) =>
              article.category.toLowerCase() === category?.toLowerCase()
          )}
          columns={3}
          withAnimation
        />
      )}
    </div>
  );
};
