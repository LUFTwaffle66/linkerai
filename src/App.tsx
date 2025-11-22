import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignupForm } from './features/auth/components/SignupForm';
import { LoginForm } from './features/auth/components/LoginForm';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { ClientDashboard } from './app/dashboard/ClientDashboard';
import { FreelancerDashboard } from './app/dashboard/FreelancerDashboard';
import { LandingPage } from './components/LandingPage';

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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
