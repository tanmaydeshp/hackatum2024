// src/pages/About.tsx
import { motion } from "framer-motion";

export const About = () => {
  const features = [
    {
      title: "AI-Powered",
      desc: "Advanced algorithms curate and analyze automotive news",
    },
    {
      title: "Real-time Updates",
      desc: "Latest industry insights as they happen",
    },
    {
      title: "Smart Categories",
      desc: "Intelligent classification of articles",
    },
    {
      title: "Trend Analysis",
      desc: "Identify emerging patterns in automotive tech",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-white">About AI News</h1>
        <p className="text-gray-300 text-lg">
          Next-generation automotive news platform powered by artificial
          intelligence
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center p-8 rounded-lg bg-blue-500/10 border border-blue-500/20"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-gray-300">
          To revolutionize how automotive professionals and enthusiasts stay
          informed about industry developments through AI-driven content
          curation and analysis.
        </p>
      </motion.div>
    </div>
  );
};
