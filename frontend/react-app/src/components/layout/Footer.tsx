// src/components/layout/Footer.tsx
export const Footer = () => {
  return (
    <footer className="bg-gray-800/30 text-gray-400 py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-medium mb-4">About</h4>
            <p className="text-sm">
              AI-powered news aggregation and analysis platform.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/trending" className="hover:text-white">
                  Trending
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:text-white">
                  Categories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <p className="text-sm">info@ainews.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
