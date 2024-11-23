import { HexagonGrid } from "./components/articles/HexagonGrid";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">AI Generated Articles</h1>
      <HexagonGrid />
    </div>
  );
};

export default App;
