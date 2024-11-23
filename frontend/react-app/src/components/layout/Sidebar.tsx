// src/components/layout/Sidebar.tsx
import { Link } from "react-router-dom";

export default function Sidebar(): JSX.Element {
  return (
    <aside className="w-64 min-h-screen bg-gray-800/30 p-6">
      <nav className="space-y-6">
        <div>
          <h3 className="text-gray-400 uppercase text-sm font-medium mb-3">
            Categories
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/categories/tech"
                className="text-gray-300 hover:text-white"
              >
                Technology
              </Link>
            </li>
            <li>
              <Link
                to="/categories/ev"
                className="text-gray-300 hover:text-white"
              >
                Electric Vehicles
              </Link>
            </li>
            <li>
              <Link
                to="/categories/ai"
                className="text-gray-300 hover:text-white"
              >
                AI & ML
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-400 uppercase text-sm font-medium mb-3">
            Trending Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
              #ElectricVehicles
            </span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
              #AI
            </span>
            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
              #Sustainability
            </span>
          </div>
        </div>
      </nav>
    </aside>
  );
}
