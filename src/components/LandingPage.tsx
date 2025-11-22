import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-primary">LinkerAI</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Connect with AI automation experts and transform your business
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
