// src/App.tsx
import { ArticlesProvider } from "./context/ArticlesContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Home from "./pages/Home";
import { Discover } from "./pages/Discover";
import { About } from "./pages/About";
import { Article } from "./pages/Article";

const App = () => {
  return (
    <BrowserRouter>
      <ArticlesProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/about" element={<About />} />
                <Route path="/article/:id" element={<Article />} />
              </Routes>
            </main>
          </div>
        </div>
      </ArticlesProvider>
    </BrowserRouter>
  );
};

export default App;
