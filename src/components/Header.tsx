import { Star, Github, ExternalLink } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-400 p-2 rounded-full">
              <Star className="h-8 w-8 text-black fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Star Wars API</h1>
              <p className="text-gray-300 text-sm">
                Explore o universo de Star Wars
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://swapi.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              API Docs
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
