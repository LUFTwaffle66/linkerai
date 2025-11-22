import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-800 bg-black py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-lg sm:text-xl">L</span>
              </div>
              <span className="font-semibold text-lg sm:text-xl text-white">LinkerAI</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 sm:mb-6 text-base sm:text-lg">{t('footer.company')}</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('footer.about')}
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('footer.howItWorks')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 sm:mb-6 text-base sm:text-lg">{t('footer.support')}</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('footer.contact')}
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('footer.privacy')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-800">
          <p className="text-center text-sm sm:text-base text-gray-500">
            © 2025 LinkerAI. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
