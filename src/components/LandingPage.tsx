import { useNavigate } from 'react-router-dom';
import { Search, Bot, Workflow, Brain, Database, Code, LineChart, ArrowRight, Clock, CheckCircle, Star, MapPin } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

export function LandingPage() {
  const navigate = useNavigate();

  const categories = [
    { icon: Bot, name: 'AI Chatbots & Assistants', count: '1,847 experts' },
    { icon: Workflow, name: 'Workflow Automation', count: '2,134 experts' },
    { icon: Brain, name: 'Machine Learning & AI', count: '1,567 experts' },
    { icon: Database, name: 'Data Analysis & BI', count: '1,923 experts' },
    { icon: Code, name: 'API Integration', count: '1,456 experts' },
    { icon: LineChart, name: 'Process Automation', count: '987 experts' },
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

      {/* Hero Section - Maximum breathing room */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32 md:py-40 lg:py-48 xl:py-56">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-10 sm:space-y-12 md:space-y-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
              Transform your business with<br className="hidden sm:block" />
              <span className="text-indigo-500"> AI automation</span> experts
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Connect with vetted AI specialists and automation engineers
            </p>

            {/* Simplified Search Box */}
            <div className="max-w-3xl mx-auto pt-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="What AI automation do you need?"
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl pl-14 pr-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600 transition-colors text-base"
                  />
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-xl font-medium transition-colors text-base whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>

            {/* Simple CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
              <button
                onClick={() => navigate('/signup')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-5 rounded-xl font-medium transition-colors text-base"
              >
                Hire AI Experts
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-gray-900/50 border border-gray-800 hover:border-gray-700 text-white px-12 py-5 rounded-xl font-medium transition-colors text-base"
              >
                Find Projects
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Expertise - Minimal grid */}
      <section className="px-6 sm:px-8 lg:px-12 py-20 sm:py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Browse by Expertise</h2>
            <p className="text-lg sm:text-xl text-gray-400">Find the right expert for your project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  className="bg-gray-900/30 border border-gray-800 hover:border-indigo-600 rounded-2xl p-8 sm:p-10 transition-all text-left group"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-indigo-600/20 rounded-xl flex items-center justify-center group-hover:bg-indigo-600/30 transition-colors">
                      <Icon className="w-7 h-7 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-lg mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.count}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Clean and spacious */}
      <section className="px-6 sm:px-8 lg:px-12 py-20 sm:py-28 md:py-36 bg-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20 md:mb-28">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">How LinkerAI Works</h2>
            <p className="text-lg sm:text-xl text-gray-400">Simple, secure, and efficient</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 sm:gap-20 md:gap-24">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="font-semibold text-2xl">Post Your Project</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Describe your automation needs and get proposals from qualified experts
              </p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="font-semibold text-2xl">Hire the Best</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Review portfolios and ratings to find the perfect specialist
              </p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="font-semibold text-2xl">Pay Safely</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Our escrow system protects your payments until delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Clean cards */}
      <section className="px-6 sm:px-8 lg:px-12 py-20 sm:py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 sm:mb-20 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-gray-400">Opportunities from top companies</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              View All
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900/30 border border-gray-800 hover:border-indigo-600 rounded-2xl p-8 transition-all cursor-pointer space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">{project.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-lg truncate">{project.company}</p>
                    {project.verified && (
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-500">Verified</span>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-xl leading-snug">{project.title}</h3>

                <div className="flex items-center gap-6 text-gray-400">
                  <span className="text-indigo-400 font-medium">{project.budget}</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{project.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gray-800/50 rounded-lg text-sm text-gray-300"
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

      {/* Top Experts - Minimal cards */}
      <section className="px-6 sm:px-8 lg:px-12 py-20 sm:py-28 md:py-36 bg-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 sm:mb-20 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Top AI Experts</h2>
              <p className="text-lg text-gray-400">Vetted professionals with proven track records</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              View All
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            {topExperts.map((expert) => (
              <div
                key={expert.id}
                className="bg-gray-900/30 border border-gray-800 hover:border-indigo-600 rounded-2xl p-8 transition-all cursor-pointer space-y-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-xl">{expert.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-semibold text-lg mb-2">{expert.name}</h3>
                    <p className="text-sm text-gray-400 leading-snug mb-3">{expert.title}</p>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{expert.rating}</span>
                      <span className="text-sm text-gray-500">({expert.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {expert.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-gray-800/50 rounded-lg text-sm text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
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
