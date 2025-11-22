import { useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-xl">L</span>
              </div>
              <span className="font-semibold text-lg">LinkerAI</span>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button className="text-gray-300 hover:text-white transition-colors">
                Find Work
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                Find AI Experts
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
