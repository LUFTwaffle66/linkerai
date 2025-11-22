import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.findWork': 'Find Work',
    'nav.findExperts': 'Find AI Experts',
    'nav.login': 'Log In',
    'nav.signup': 'Sign Up',
    'hero.title': 'Transform your business with',
    'hero.titleHighlight': 'AI automation',
    'hero.titleEnd': 'experts',
    'hero.subtitle': 'Connect with vetted AI specialists and automation engineers',
    'hero.searchPlaceholder': 'What AI automation do you need?',
    'hero.searchButton': 'Search',
    'hero.hireExperts': 'Hire AI Experts',
    'hero.findProjects': 'Find Projects',
    'expertise.title': 'Browse by Expertise',
    'expertise.subtitle': 'Find the right expert for your project',
    'expertise.chatbots': 'AI Chatbots & Assistants',
    'expertise.workflow': 'Workflow Automation',
    'expertise.ml': 'Machine Learning & AI',
    'expertise.data': 'Data Analysis & BI',
    'expertise.api': 'API Integration',
    'expertise.process': 'Process Automation',
    'expertise.experts': 'experts',
    'howItWorks.title': 'How LinkerAI Works',
    'howItWorks.subtitle': 'Simple, secure, and efficient',
    'howItWorks.step1': 'Post Your Project',
    'howItWorks.step1Desc': 'Describe your automation needs and get proposals from qualified experts',
    'howItWorks.step2': 'Hire the Best',
    'howItWorks.step2Desc': 'Review portfolios and ratings to find the perfect specialist',
    'howItWorks.step3': 'Pay Safely',
    'howItWorks.step3Desc': 'Our escrow system protects your payments until delivery',
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Opportunities from top companies',
    'projects.viewAll': 'View All',
    'projects.verified': 'Verified',
    'experts.title': 'Top AI Experts',
    'experts.subtitle': 'Vetted professionals with proven track records',
    'footer.platform': 'Platform',
    'footer.findWork': 'Find Work',
    'footer.findExperts': 'Find Experts',
    'footer.howItWorks': 'How It Works',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.tagline': 'AI automation marketplace connecting businesses with top specialists',
    'footer.rights': 'All rights reserved.',
  },
  fr: {
    'nav.findWork': 'Trouver du travail',
    'nav.findExperts': 'Trouver des experts IA',
    'nav.login': 'Se connecter',
    'nav.signup': "S'inscrire",
    'hero.title': 'Transformez votre entreprise avec des experts en',
    'hero.titleHighlight': 'automatisation IA',
    'hero.titleEnd': '',
    'hero.subtitle': 'Connectez-vous avec des spécialistes IA et des ingénieurs en automatisation vérifiés',
    'hero.searchPlaceholder': 'Quelle automatisation IA recherchez-vous ?',
    'hero.searchButton': 'Rechercher',
    'hero.hireExperts': 'Embaucher des experts IA',
    'hero.findProjects': 'Trouver des projets',
    'expertise.title': 'Parcourir par expertise',
    'expertise.subtitle': 'Trouvez le bon expert pour votre projet',
    'expertise.chatbots': 'Chatbots IA & Assistants',
    'expertise.workflow': "Automatisation des flux de travail",
    'expertise.ml': "Apprentissage automatique & IA",
    'expertise.data': 'Analyse de données & BI',
    'expertise.api': "Intégration d'API",
    'expertise.process': 'Automatisation des processus',
    'expertise.experts': 'experts',
    'howItWorks.title': 'Comment fonctionne LinkerAI',
    'howItWorks.subtitle': 'Simple, sécurisé et efficace',
    'howItWorks.step1': 'Publiez votre projet',
    'howItWorks.step1Desc': "Décrivez vos besoins en automatisation et recevez des propositions d'experts qualifiés",
    'howItWorks.step2': 'Embauchez les meilleurs',
    'howItWorks.step2Desc': 'Examinez les portfolios et les évaluations pour trouver le spécialiste parfait',
    'howItWorks.step3': 'Payez en toute sécurité',
    'howItWorks.step3Desc': "Notre système d'entiercement protège vos paiements jusqu'à la livraison",
    'projects.title': 'Projets en vedette',
    'projects.subtitle': 'Opportunités des meilleures entreprises',
    'projects.viewAll': 'Voir tout',
    'projects.verified': 'Vérifié',
    'experts.title': 'Meilleurs experts IA',
    'experts.subtitle': 'Professionnels vérifiés avec des antécédents éprouvés',
    'footer.platform': 'Plateforme',
    'footer.findWork': 'Trouver du travail',
    'footer.findExperts': 'Trouver des experts',
    'footer.howItWorks': 'Comment ça marche',
    'footer.company': 'Entreprise',
    'footer.about': 'À propos',
    'footer.contact': 'Contact',
    'footer.support': 'Support',
    'footer.legal': 'Juridique',
    'footer.terms': "Conditions d'utilisation",
    'footer.privacy': 'Politique de confidentialité',
    'footer.tagline': "Marché d'automatisation IA connectant les entreprises avec les meilleurs spécialistes",
    'footer.rights': 'Tous droits réservés.',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
