// src/pages/Home.tsx
import { ArticleGrid } from "../components/articles/ArticleGrid";
import useArticles from "../hooks/useArticles";
import ArticleSummary from "../components/articles/ArticleSummary";

export default function Home(): JSX.Element {
  const { articles, loading } = useArticles();

  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-6">
          Latest AI Insights
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.slice(0, 2).map((article) => (
            <ArticleSummary key={article.id} article={article} featured />
          ))}
        </div>
      </section>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : null}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">More Stories</h2>
        <ArticleGrid articles={articles.slice(2)} columns={3} withAnimation />
      </section>
    </div>
  );
}
