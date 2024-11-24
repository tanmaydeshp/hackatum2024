// src/types/article.ts
export interface Article {
  id: string;
  title: string;
  content: string;
  rating: number;
  categories: string[];
  trends: string[];
}

export interface ArticlesContextType {
  articles: Article[];
  loading: boolean;
  error: string | null;
  fetchArticles: () => Promise<void>;
  sortByRating: () => void;
  filterByCategory: (category: string) => Article[];
  filterByTrend: (trend: string) => Article[];
}
