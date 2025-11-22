import { useNavigate } from 'react-router-dom';
import { Globe, Menu, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const languageMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: 'en' | 'fr') => {
    setLanguage(lang);
    setLanguageMenuOpen(false);
  };

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
                {t('nav.findWork')}
              </button>
              <button className="text-gray-300 hover:text-white transition-colors text-base">
                {t('nav.findExperts')}
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative hidden sm:block" ref={languageMenuRef}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Globe className="w-5 h-5" />
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-lg shadow-black/20 overflow-hidden">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-white text-base">English</span>
                    {language === 'en' && (
                      <Check className="w-4 h-4 text-indigo-500" />
                    )}
                  </button>
                  <div className="h-px bg-gray-800" />
                  <button
                    onClick={() => handleLanguageChange('fr')}
                    className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-white text-base">Français</span>
                    {language === 'fr' && (
                      <Check className="w-4 h-4 text-indigo-500" />
                    )}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/login')}
              className="text-white hover:text-gray-300 transition-colors text-sm sm:text-base"
            >
              {t('nav.login')}
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base"
            >
              {t('nav.signup')}
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
                {t('nav.findWork')}
              </button>
              <button
                className="text-gray-300 hover:text-white transition-colors text-left py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.findExperts')}
              </button>
              <div className="border-t border-gray-800 my-2" />
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className="text-gray-300 hover:text-white transition-colors text-left py-2 flex items-center justify-between"
                >
                  <span>English</span>
                  {language === 'en' && <Check className="w-4 h-4 text-indigo-500" />}
                </button>
                <button
                  onClick={() => handleLanguageChange('fr')}
                  className="text-gray-300 hover:text-white transition-colors text-left py-2 flex items-center justify-between"
                >
                  <span>Français</span>
                  {language === 'fr' && <Check className="w-4 h-4 text-indigo-500" />}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
