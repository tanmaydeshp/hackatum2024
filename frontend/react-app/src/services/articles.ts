import { api } from "./api";
import type { Article } from "../types/article";

export const getArticles = () => api.get<Article[]>("/articles");
