import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignupForm } from './features/auth/components/SignupForm';
import { LoginForm } from './features/auth/components/LoginForm';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { ClientDashboard } from './app/dashboard/ClientDashboard';
import { FreelancerDashboard } from './app/dashboard/FreelancerDashboard';
import { LandingPage } from './components/LandingPage';
import { ProjectDetails } from './features/projects/components/ProjectDetails';
import { FreelancerProjectDetail } from './features/projects/components/FreelancerProjectDetail';
import { PaymentPage } from './features/payments/components/PaymentPage';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { getProfileByClerkId } from './lib/api/profiles';

type UserRole = 'client' | 'freelancer' | null;

function ProjectDetailRouter() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserRole = async () => {
      if (!isLoaded) return;

      if (!isSignedIn || !user?.id) {
        setUserRole(null);
        setLoading(false);
        return;
      }

      const profile = await getProfileByClerkId(user.id);
      setUserRole(profile?.role ?? null);
      setLoading(false);
    };

    loadUserRole();
  }, [isLoaded, isSignedIn, user?.id]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!userRole) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400">No profile role found.</div>
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

        <Route
          path="/project/:projectId/checkout"
          element={
            <ProtectedRoute requiredRole="client">
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
