import { Article } from "../types/article";

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "The Future of Electric Vehicles",
    content: "Lorem ipsum dolor sit amet...",
    aiSummary:
      "A comprehensive look at EV market trends and future predictions.",
    relevanceScore: 0.9,
    timestamp: "2024-03-16T10:00:00Z",
  },
  {
    id: "2",
    title: "Autonomous Driving Technology",
    content: "Lorem ipsum dolor sit amet...",
    aiSummary: "Latest developments in self-driving car technology.",
    relevanceScore: 0.7,
    timestamp: "2024-03-16T09:00:00Z",
  },
  {
    id: "3",
    title: "Sustainable Transportation",
    content: "Lorem ipsum dolor sit amet...",
    aiSummary: "How green technologies are reshaping mobility.",
    relevanceScore: 0.5,
    timestamp: "2024-03-16T08:00:00Z",
  },
];
