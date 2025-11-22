import { useNavigate } from 'react-router-dom';
import { Globe, Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-6 lg:gap-8">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 sm:gap-3 text-white">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-lg sm:text-xl">L</span>
              </div>
              <span className="font-semibold text-base sm:text-lg">LinkerAI</span>
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              <button className="text-gray-300 hover:text-white transition-colors text-base">
                Find Work
              </button>
              <button className="text-gray-300 hover:text-white transition-colors text-base">
                Find AI Experts
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="text-gray-300 hover:text-white transition-colors hidden sm:block">
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-white hover:text-gray-300 transition-colors text-sm sm:text-base"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base"
            >
              Sign Up
            </button>
            <button
              className="lg:hidden text-gray-300 hover:text-white transition-colors ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col gap-4">
              <button
                className="text-gray-300 hover:text-white transition-colors text-left py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Work
              </button>
              <button
                className="text-gray-300 hover:text-white transition-colors text-left py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find AI Experts
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
