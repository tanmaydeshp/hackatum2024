// src/pages/Discover.tsx
import { motion } from "framer-motion";
import { useArticles } from "../context/ArticlesContext";
import { ArticleCard } from "../components/articles/ArticleCard";

export const Discover = () => {
  const { articles, loading } = useArticles();

  const sections = [
    {
      title: "Editor's Picks",
      articles: articles.filter((a) => a.rating > 0.8).slice(0, 3),
    },
    {
      title: "Innovation Spotlight",
      articles: articles
        .filter((a) => a.categories.includes("tech"))
        .slice(0, 3),
    },
    {
      title: "Sustainability Focus",
      articles: articles
        .filter((a) => a.categories.includes("sustainability"))
        .slice(0, 3),
    },
  ];

  if (loading)
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );

  return (
    <div className="space-y-16">
      {sections.map((section, sectionIndex) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">{section.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {section.articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + sectionIndex * 0.2 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
};
