// src/context/ArticlesContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Article, ArticlesContextType } from "../types/article";

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined
);

export function ArticlesProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/articles");
      if (!response.ok) throw new Error("Failed to fetch articles");
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const sortByRating = () => {
    setArticles([...articles].sort((a, b) => b.rating - a.rating));
  };

  const filterByCategory = (categoryId: string) => {
    return articles.filter((article) =>
      article.categories.some(
        (cat) => cat.toLowerCase() === categoryId.toLowerCase()
      )
    );
  };

  const filterByTrend = (trend: string) => {
    return articles.filter((article) =>
      article.trends.some((t) => t.toLowerCase() === trend.toLowerCase())
    );
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        loading,
        error,
        fetchArticles,
        sortByRating,
        filterByCategory,
        filterByTrend,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
};
