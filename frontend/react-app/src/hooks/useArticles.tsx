import { useState, useEffect } from "react";
import { Article } from "../types/article";
import { mockArticles } from "../data/mockArticles";

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { articles, loading };
};
