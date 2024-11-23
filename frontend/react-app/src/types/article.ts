// src/types/article.ts
export interface Article {
  id: string;
  title: string;
  content: string;
  aiSummary: string;
  category: string;
  relevanceScore: number;
  timestamp: string;
}
