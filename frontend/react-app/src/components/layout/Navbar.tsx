// src/components/layout/Navbar.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) => location.pathname === path;

  const navLinks = [
    {
      path: "/",
      label: "Home",
      color: "from-purple-400 to-indigo-500",
      hoverColor: "from-blue-500 to-blue-600",
      inactiveColor: "from-gray-800 to-gray-900",
    },
    {
      path: "/discover",
      label: "Discover",
      color: "from-purple-400 to-indigo-500",
      hoverColor: "from-purple-500 to-indigo-600",
      inactiveColor: "from-gray-800 to-gray-900",
    },
    {
      path: "/about",
      label: "About AI News",
      color: "from-purple-400 to-indigo-500",
      hoverColor: "from-sky-500 to-cyan-600",
      inactiveColor: "from-gray-800 to-gray-900",
    },
  ];

  return (
    <nav className="bg-gray-800/30 backdrop-blur-sm">
      <div className="mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI News
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map(
              ({ path, label, color, hoverColor, inactiveColor }) => (
                <Link
                  key={path}
                  to={path}
                  className={`
                  px-8 py-3 rounded-lg 
                  text-base font-semibold
                  transition-all duration-300 ease-in-out
                  bg-gradient-to-r
                  ${
                    isActivePath(path)
                      ? `${color} text-white shadow-lg`
                      : `${inactiveColor} text-gray-300 
                      hover:${hoverColor} hover:text-white 
                      hover:shadow-lg hover:scale-105`
                  }
                  border border-gray-500
                  hover:border-white/20
                  backdrop-blur-sm
                `}
                >
                  {label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button - remains the same */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-700 mt-4">
            <div className="space-y-3">
              {navLinks.map(({ path, label, color, hoverColor }) => (
                <Link
                  key={path}
                  to={path}
                  className={`
                    block px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActivePath(path)
                        ? `bg-gradient-to-r ${color} text-white`
                        : `hover:bg-gradient-to-r hover:${hoverColor} 
                           text-gray-300 hover:text-white`
                    }
                    border border-white/10
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
