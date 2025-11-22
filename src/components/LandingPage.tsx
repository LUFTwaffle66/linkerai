import { useNavigate } from 'react-router-dom';
import { Search, Bot, Workflow, Brain, Database, Code, LineChart, ArrowRight, Clock, CheckCircle, Star, MapPin } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLanguage } from '../contexts/LanguageContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const categories = [
    { icon: Bot, name: t('expertise.chatbots'), count: '1,847 ' + t('expertise.experts') },
    { icon: Workflow, name: t('expertise.workflow'), count: '2,134 ' + t('expertise.experts') },
    { icon: Brain, name: t('expertise.ml'), count: '1,567 ' + t('expertise.experts') },
    { icon: Database, name: t('expertise.data'), count: '1,923 ' + t('expertise.experts') },
    { icon: Code, name: t('expertise.api'), count: '1,456 ' + t('expertise.experts') },
    { icon: LineChart, name: t('expertise.process'), count: '987 ' + t('expertise.experts') },
  ];

  const featuredProjects = [
    {
      id: 1,
      company: 'TechRetail Inc',
      avatar: 'TR',
      verified: true,
      title: 'AI Customer Support Chatbot Development',
      budget: '$5,000-$8,000',
      duration: '4-6 weeks',
      skills: ['GPT-4', 'Python', 'API Integration'],
    },
    {
      id: 2,
      company: 'DataFlow Solutions',
      avatar: 'DF',
      verified: true,
      title: 'Document Processing Automation with OCR',
      budget: '$3,000-$5,000',
      duration: '3-4 weeks',
      skills: ['OCR', 'Python', 'Computer Vision'],
    },
    {
      id: 3,
      company: 'Analytics Corp',
      avatar: 'AC',
      verified: true,
      title: 'Predictive Analytics Dashboard',
      budget: '$7,000-$12,000',
      duration: '6-8 weeks',
      skills: ['Machine Learning', 'Python', 'TensorFlow'],
    }
  ];

  const topExperts = [
    {
      id: 1,
      name: 'Alex Chen',
      avatar: 'AC',
      title: 'Senior AI Engineer & ML Specialist',
      rating: 4.9,
      reviews: 127,
      skills: ['GPT-4', 'Python', 'TensorFlow', 'NLP'],
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      avatar: 'MG',
      title: 'RPA & Workflow Automation Expert',
      rating: 5,
      reviews: 94,
      skills: ['UiPath', 'Power Automate', 'Python'],
      location: 'Austin, TX'
    },
    {
      id: 3,
      name: 'David Park',
      avatar: 'DP',
      title: 'Data Scientist & Analytics Engineer',
      rating: 4.8,
      reviews: 156,
      skills: ['Machine Learning', 'Python', 'R'],
      location: 'New York, NY'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="relative px-6 sm:px-12 lg:px-16 pt-32 pb-48 sm:pt-40 sm:pb-60 md:pt-48 md:pb-72 lg:pt-56 lg:pb-80 xl:pt-64 xl:pb-96">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
            <div className="space-y-10 sm:space-y-12 md:space-y-16">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[1.1] tracking-tight px-4">
                {t('hero.title')}<br className="hidden sm:block" />
                <span className="text-indigo-500"> {t('hero.titleHighlight')}</span> {t('hero.titleEnd')}
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="max-w-4xl mx-auto pt-8 md:pt-16 px-4">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1 relative group">
                  <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6 transition-colors group-focus-within:text-indigo-400" />
                  <input
                    type="text"
                    placeholder={t('hero.searchPlaceholder')}
                    className="w-full bg-gray-900/50 border border-gray-800/60 rounded-2xl pl-16 pr-8 py-6 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-gray-900/70 focus:ring-2 focus:ring-indigo-500/20 transition-all hover:border-gray-700 shadow-lg shadow-black/10"
                  />
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-[0.98] text-white px-12 py-6 rounded-2xl font-semibold transition-all text-lg whitespace-nowrap">
                  {t('hero.searchButton')}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12 md:pt-20 px-4">
              <button
                onClick={() => navigate('/signup')}
                className="bg-indigo-600 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-[0.98] text-white px-14 py-6 rounded-2xl font-semibold transition-all text-lg"
              >
                {t('hero.hireExperts')}
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-gray-900/50 border-2 border-gray-800/60 hover:border-gray-700 hover:bg-gray-900/70 hover:shadow-xl hover:shadow-black/20 active:scale-[0.98] text-white px-14 py-6 rounded-2xl font-semibold transition-all text-lg"
              >
                {t('hero.findProjects')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12 lg:px-16 py-32 sm:py-40 md:py-48 lg:py-56">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 sm:mb-32 md:mb-40 space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">{t('expertise.title')}</h2>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">{t('expertise.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  className="bg-gray-900/30 border border-gray-800/60 hover:border-indigo-500 hover:bg-gray-900/50 hover:shadow-2xl hover:shadow-indigo-600/10 hover:-translate-y-2 rounded-3xl p-12 lg:p-14 transition-all duration-300 text-left group shadow-lg shadow-black/10"
                >
                  <div className="space-y-8">
                    <div className="w-20 h-20 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600/20 group-hover:border-indigo-500/40 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-10 h-10 text-indigo-400" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-white text-xl leading-tight group-hover:text-indigo-400 transition-colors">{category.name}</h3>
                      <p className="text-base text-gray-500">{category.count}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 sm:px-12 lg:px-16 py-32 sm:py-40 md:py-48 lg:py-56 bg-gradient-to-b from-gray-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-28 sm:mb-36 md:mb-44 space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">{t('howItWorks.title')}</h2>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">{t('howItWorks.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 sm:gap-20 lg:gap-28">
            <div className="text-center space-y-10 group">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-indigo-600/40 transition-all duration-300 shadow-xl shadow-indigo-600/20">
                <span className="text-white font-bold text-4xl">1</span>
              </div>
              <h3 className="font-bold text-3xl group-hover:text-indigo-400 transition-colors px-4">{t('howItWorks.step1')}</h3>
              <p className="text-gray-300 leading-relaxed text-xl px-4 max-w-sm mx-auto">
                {t('howItWorks.step1Desc')}
              </p>
            </div>
            <div className="text-center space-y-10 group">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-indigo-600/40 transition-all duration-300 shadow-xl shadow-indigo-600/20">
                <span className="text-white font-bold text-4xl">2</span>
              </div>
              <h3 className="font-bold text-3xl group-hover:text-indigo-400 transition-colors px-4">{t('howItWorks.step2')}</h3>
              <p className="text-gray-300 leading-relaxed text-xl px-4 max-w-sm mx-auto">
                {t('howItWorks.step2Desc')}
              </p>
            </div>
            <div className="text-center space-y-10 group">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-indigo-600/40 transition-all duration-300 shadow-xl shadow-indigo-600/20">
                <span className="text-white font-bold text-4xl">3</span>
              </div>
              <h3 className="font-bold text-3xl group-hover:text-indigo-400 transition-colors px-4">{t('howItWorks.step3')}</h3>
              <p className="text-gray-300 leading-relaxed text-xl px-4 max-w-sm mx-auto">
                {t('howItWorks.step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12 lg:px-16 py-32 sm:py-40 md:py-48 lg:py-56">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col text-center sm:text-left sm:flex-row sm:items-end sm:justify-between mb-24 sm:mb-32 gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">{t('projects.title')}</h2>
              <p className="text-xl text-gray-300">{t('projects.subtitle')}</p>
            </div>
            <button className="hidden sm:flex items-center gap-3 text-gray-300 hover:text-white hover:gap-4 transition-all text-lg font-medium group">
              {t('projects.viewAll')}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900/30 border border-gray-800/60 hover:border-indigo-500 hover:bg-gray-900/50 hover:shadow-2xl hover:shadow-indigo-600/10 hover:-translate-y-2 rounded-3xl p-10 transition-all duration-300 cursor-pointer space-y-8 group shadow-lg shadow-black/10"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-700/50 transition-colors">
                    <span className="text-base font-semibold">{project.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xl truncate group-hover:text-indigo-400 transition-colors">{project.company}</p>
                    {project.verified && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-500 font-medium">{t('projects.verified')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-2xl leading-tight">{project.title}</h3>

                <div className="flex items-center gap-8 text-gray-400">
                  <span className="text-indigo-400 font-semibold text-lg">{project.budget}</span>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5" />
                    <span className="text-base">{project.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {project.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2.5 bg-gray-800/40 border border-gray-700/50 rounded-xl text-base text-gray-300 group-hover:bg-gray-800/60 group-hover:border-gray-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 sm:px-12 lg:px-16 py-32 sm:py-40 md:py-48 lg:py-56 bg-gradient-to-b from-gray-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col text-center sm:text-left sm:flex-row sm:items-end sm:justify-between mb-24 sm:mb-32 gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">{t('experts.title')}</h2>
              <p className="text-xl text-gray-300">{t('experts.subtitle')}</p>
            </div>
            <button className="hidden sm:flex items-center gap-3 text-gray-300 hover:text-white hover:gap-4 transition-all text-lg font-medium group">
              {t('projects.viewAll')}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {topExperts.map((expert) => (
              <div
                key={expert.id}
                className="bg-gray-900/30 border border-gray-800/60 hover:border-indigo-500 hover:bg-gray-900/50 hover:shadow-2xl hover:shadow-indigo-600/10 hover:-translate-y-2 rounded-3xl p-10 transition-all duration-300 cursor-pointer space-y-8 group shadow-lg shadow-black/10"
              >
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 bg-gray-800/50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-700/50 group-hover:scale-110 transition-all">
                    <span className="font-bold text-2xl">{expert.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-indigo-400 transition-colors">{expert.name}</h3>
                    <p className="text-base text-gray-400 leading-snug mb-4">{expert.title}</p>
                    <div className="flex items-center gap-2.5">
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{expert.rating}</span>
                      <span className="text-base text-gray-500">({expert.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {expert.skills.map((skill) => (
                    <span key={skill} className="px-4 py-2.5 bg-gray-800/40 border border-gray-700/50 rounded-xl text-base text-gray-300 group-hover:bg-gray-800/60 group-hover:border-gray-700 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-800/60">
                  <div className="flex items-center gap-3 text-base text-gray-400">
                    <MapPin className="w-5 h-5" />
                    <span>{expert.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
