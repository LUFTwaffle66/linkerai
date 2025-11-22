import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignupForm } from './features/auth/components/SignupForm';
import { LoginForm } from './features/auth/components/LoginForm';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { ClientDashboard } from './app/dashboard/ClientDashboard';
import { FreelancerDashboard } from './app/dashboard/FreelancerDashboard';
import { LandingPage } from './components/LandingPage';
import { ProjectDetails } from './features/projects/components/ProjectDetails';
import { FreelancerProjectDetail } from './features/projects/components/FreelancerProjectDetail';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase/client';

function ProjectDetailRouter() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        setUserRole(userData?.role || null);
      }
      setLoading(false);
    };
    loadUserRole();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return userRole === 'client' ? <ProjectDetails /> : <FreelancerProjectDetail />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/dashboard/client"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/freelancer"
          element={
            <ProtectedRoute requiredRole="freelancer">
              <FreelancerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/project/:projectId"
          element={
            <ProtectedRoute>
              <ProjectDetailRouter />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
