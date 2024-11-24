// src/components/layout/Sidebar.tsx
// import { Link } from "react-router-dom";
import { useArticles } from "../../context/ArticlesContext";

interface Category {
  id: string;
  name: string;
  gradient: string;
  border: string;
  hover: string;
  shadow: string;
}

interface TrendingTopic {
  tag: string;
  color: string;
}

const CATEGORIES: Category[] = [
  {
    id: "tech",
    name: "Technology",
    gradient: "from-gray-700/50 to-gray-600/50",
    border: "border-gray-500/20",
    hover: "hover:from-gray-600/60 hover:to-gray-500/60",
    shadow: "hover:shadow-lg hover:shadow-gray-500/10",
  },
  {
    id: "ev",
    name: "Electric Vehicles",
    gradient: "from-gray-700/50 to-gray-600/50",
    border: "border-gray-500/20",
    hover: "hover:from-gray-600/60 hover:to-gray-500/60",
    shadow: "hover:shadow-lg hover:shadow-gray-500/10",
  },
  {
    id: "ai",
    name: "AI & ML",
    gradient: "from-gray-700/50 to-gray-600/50",
    border: "border-gray-500/20",
    hover: "hover:from-gray-600/60 hover:to-gray-500/60",
    shadow: "hover:shadow-lg hover:shadow-gray-500/10",
  },
  {
    id: "sustainability",
    name: "Sustainability",
    gradient: "from-gray-700/50 to-gray-600/50",
    border: "border-gray-500/20",
    hover: "hover:from-gray-600/60 hover:to-gray-500/60",
    shadow: "hover:shadow-lg hover:shadow-gray-500/10",
  },
  {
    id: "robotics",
    name: "Robotics",
    gradient: "from-gray-700/50 to-gray-600/50",
    border: "border-gray-500/20",
    hover: "hover:from-gray-600/60 hover:to-gray-500/60",
    shadow: "hover:shadow-lg hover:shadow-gray-500/10",
  },
];

const TRENDING_TOPICS: TrendingTopic[] = [
  {
    tag: "ElonMusk",
    color:
      "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-purple-500/30 text-purple-200",
  },
  {
    tag: "StormTaxi",
    color:
      "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-purple-500/30 text-purple-200",
  },
  {
    tag: "BatteryBreakthrough",
    color:
      "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-purple-500/30 text-purple-200",
  },
  {
    tag: "QuantumLeap",
    color:
      "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-purple-500/30 text-purple-200",
  },
  {
    tag: "RoboDelivery",
    color:
      "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-purple-500/30 text-purple-200",
  },
];

export default function Sidebar(): JSX.Element {
  const { filterByCategory, filterByTrend } = useArticles();

  return (
    <aside className="w-72 min-h-screen bg-gray-800/30 p-6 border-r border-gray-700/50">
      <nav className="space-y-8">
        <div>
          <h3 className="text-gray-400 uppercase text-sm font-medium mb-6 tracking-wider">
            Categories
          </h3>
          <div className="flex flex-col items-center">
            {CATEGORIES.map(
              ({ id, name, gradient, border, hover, shadow }, index) => (
                <div key={id} className="flex items-center">
                  <button
                    onClick={() => filterByCategory(id)}
                    className={`
                      w-[15vw]
                px-8 py-3 mb-2 
                bg-gradient-to-r ${gradient}
                border-y ${border}
                ${index === 0 ? "rounded-l-lg border-l" : ""}
                ${
                  index === CATEGORIES.length - 1 ? "rounded-r-lg border-r" : ""
                }
                backdrop-blur-sm
                ${hover} ${shadow}
                transition-all duration-300
                lg:text-base sm:text-sm font-medium text-gray-300
                hover:text-white
                flex items-center gap-3
                relative
                group
                `}
                  >
                    <div>
                      <span className="w-2 h-2 rounded-full bg-gray-400/50 group-hover:bg-white/50 transition-colors"></span>
                      <div>{name}</div>
                      {index !== CATEGORIES.length - 1 && (
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-600/30"></span>
                      )}
                    </div>
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        <div>
          <h3 className="text-gray-400 uppercase text-sm font-medium mb-4 tracking-wider">
            Trending Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {TRENDING_TOPICS.map(({ tag, color }) => (
              <button
                key={tag}
                onClick={() => filterByTrend(tag)}
                className={`
                  ${color} px-3 py-1.5 rounded-full text-sm
                  border shadow-sm hover:shadow-md
                  hover:scale-105 transition-all duration-300
                  cursor-pointer backdrop-blur-sm
                `}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
