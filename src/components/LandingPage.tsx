import { useNavigate } from 'react-router-dom';
import { Search, Bot, Workflow, Brain, Database, Code, LineChart, ArrowRight, DollarSign, Clock, CheckCircle, Star, MapPin } from 'lucide-react';
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
      time: '2 hours ago',
      title: 'AI Customer Support Chatbot Development',
      description: 'Need an experienced AI engineer to build a GPT-4 powered chatbot for our e-commerce platform....',
      budget: '$5 000-$8 000',
      duration: '4-6 weeks',
      skills: ['GPT-4', 'Python', 'API Integration', '+1'],
      proposals: 12
    },
    {
      id: 2,
      company: 'DataFlow Solutions',
      avatar: 'DF',
      verified: true,
      time: '5 hours ago',
      title: 'Document Processing Automation with OCR',
      description: 'Looking for an automation expert to create a system that extracts data from invoices using OCR and...',
      budget: '$3 000-$5 000',
      duration: '3-4 weeks',
      skills: ['OCR', 'Python', 'Computer Vision', '+1'],
      proposals: 8
    },
    {
      id: 3,
      company: 'Analytics Corp',
      avatar: 'AC',
      verified: true,
      time: '1 day ago',
      title: 'Predictive Analytics Dashboard',
      description: 'Seeking a data scientist to build ML models for sales forecasting and create interactive dashboards using...',
      budget: '$7 000-$12 000',
      duration: '6-8 weeks',
      skills: ['Machine Learning', 'Python', 'TensorFlow', '+1'],
      proposals: 15
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
      verified: true,
      topRated: true,
      description: 'Specialized in building custom AI chatbots and automation systems. 8+ years of experience in ML and an...',
      skills: ['GPT-4', 'Python', 'TensorFlow', 'NLP'],
      completedJobs: 89,
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      avatar: 'MG',
      title: 'RPA & Workflow Automation Expert',
      rating: 5,
      reviews: 94,
      verified: true,
      topRated: true,
      description: 'Expert in robotic process automation and business workflow optimization. Certified UiPath developer.',
      skills: ['UiPath', 'Power Automate', 'Python', 'API Integration'],
      completedJobs: 76,
      location: 'Austin, TX'
    },
    {
      id: 3,
      name: 'David Park',
      avatar: 'DP',
      title: 'Data Scientist & Analytics Engineer',
      rating: 4.8,
      reviews: 156,
      verified: true,
      topRated: true,
      description: 'Building predictive models and data visualization dashboards. Ph.D. in Data Science.',
      skills: ['Machine Learning', 'Python', 'R', 'Tableau'],
      completedJobs: 112,
      location: 'New York, NY'
    }
  ];

  const testimonials = [
    {
      name: 'Jennifer Chen',
      initials: 'JC',
      role: 'CEO, TechStart Inc',
      content: 'Our AI chatbot specialist automated 80% of our customer support inquiries. Response times dropped from hours to seconds, and customer satisfaction soared.',
      rating: 5
    },
    {
      name: 'David Rodriguez',
      initials: 'DR',
      role: 'AI Automation Expert',
      content: 'LinkerAI helped me find consistent high-value projects. I\'ve built workflow automations for Fortune 500 companies and grown my consultancy significantly.',
      rating: 5
    },
    {
      name: 'Sarah Thompson',
      initials: 'ST',
      role: 'Operations Director',
      content: 'The escrow system and milestone payments give me confidence. Our data analysis project delivered incredible insights, and payments were seamless.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform your business with<br />
              <span className="text-indigo-500">AI automation</span> experts
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Connect with vetted AI specialists and automation engineers. From chatbots to workflow automation, find the perfect expert to streamline your operations and boost efficiency.
            </p>

            {/* Search Box */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="What AI automation do you need?"
                    className="w-full bg-black border border-indigo-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
                  Search
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-gray-400">Popular:</span>
                {['AI Chatbot', 'Workflow Automation', 'Data Analysis', 'Custom AI Model'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Hire AI Experts
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Find Projects
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Expertise */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Expertise</h2>
            <p className="text-gray-400">Find the right AI automation expert for your project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  className="bg-gray-900/50 border border-gray-800 hover:border-indigo-600 rounded-xl p-6 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center group-hover:bg-indigo-600/30 transition-colors">
                      <Icon className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-400">{category.count}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* How LinkerAI Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How LinkerAI Works</h2>
            <p className="text-gray-400">Simple, secure, and efficient</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Post Your Project</h3>
              <p className="text-gray-400 leading-relaxed">
                Describe your automation needs and get proposals from qualified AI experts within hours.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Hire the Best</h3>
              <p className="text-gray-400 leading-relaxed">
                Review portfolios, technical skills, and ratings to find the perfect AI specialist for your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Pay Safely</h3>
              <p className="text-gray-400 leading-relaxed">
                Our escrow system protects your payments until you're 100% satisfied with the automation delivered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
              <p className="text-gray-400">Hand-picked opportunities from top companies</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-white hover:text-indigo-400 transition-colors">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900/50 border border-gray-800 hover:border-indigo-600 rounded-xl p-6 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium">{project.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium">{project.company}</p>
                      {project.verified && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-500">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{project.time}</span>
                </div>

                <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-indigo-400">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">{project.budget}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{project.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-800 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-gray-800">
                    <p className="text-xs text-gray-500">{project.proposals} proposals</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top AI Experts */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Top AI Experts</h2>
              <p className="text-gray-400">Hire vetted professionals with proven track records</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-white hover:text-indigo-400 transition-colors">
              View All Experts
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {topExperts.map((expert) => (
              <div
                key={expert.id}
                className="bg-gray-900/50 border border-gray-800 hover:border-indigo-600 rounded-xl p-6 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-lg">{expert.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{expert.name}</h3>
                      {expert.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{expert.title}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{expert.rating}</span>
                      <span className="text-sm text-gray-400">({expert.reviews} reviews)</span>
                    </div>
                    {expert.topRated && (
                      <span className="inline-block px-2 py-1 bg-indigo-600/20 text-indigo-400 text-xs rounded border border-indigo-600/30">
                        Top Rated
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{expert.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-gray-800 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Completed Jobs</span>
                    <span className="font-medium">{expert.completedJobs}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{expert.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400">Join thousands of satisfied clients and AI experts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
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
