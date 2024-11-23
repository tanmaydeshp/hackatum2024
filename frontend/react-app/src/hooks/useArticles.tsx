// src/features/articles/hooks.ts
import { useState, useEffect } from "react";
import type { Article } from "../types/article";

const mockArticles: Article[] = [
  {
    id: "1",
    title: "The Future of Electric Vehicles",
    content:
      "In-depth analysis of the electric vehicle market trends and future predictions...",
    aiSummary:
      "A comprehensive look at EV market trends and predictions for the next decade.",
    category: "Electric Vehicles",
    relevanceScore: 0.95,
    timestamp: "2024-03-16T10:00:00Z",
  },
  {
    id: "2",
    title: "Breakthroughs in AI for Autonomous Driving",
    content:
      "Recent developments in AI technology for self-driving vehicles...",
    aiSummary:
      "Latest advancements in autonomous vehicle AI systems and their impact.",
    category: "AI & ML",
    relevanceScore: 0.88,
    timestamp: "2024-03-16T09:30:00Z",
  },
  {
    id: "3",
    title: "Green Energy Integration in Transportation",
    content:
      "How renewable energy is being integrated into modern transportation...",
    aiSummary:
      "Analysis of sustainable energy solutions in the transportation sector.",
    category: "Technology",
    relevanceScore: 0.82,
    timestamp: "2024-03-16T09:00:00Z",
  },
  {
    id: "4",
    title: "Smart City Mobility Solutions",
    content: "Innovative approaches to urban transportation and mobility...",
    aiSummary:
      "Overview of smart city transportation initiatives and their implementation.",
    category: "Technology",
    relevanceScore: 0.75,
    timestamp: "2024-03-16T08:30:00Z",
  },
];

export default function useArticles(): {
  articles: Article[];
  loading: boolean;
} {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { articles, loading };
}
