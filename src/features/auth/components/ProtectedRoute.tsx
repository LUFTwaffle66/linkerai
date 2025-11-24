import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/nextjs';
import { ensureProfile } from '../../../lib/api/profiles';
import type { Profile } from '../../../types/database';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'client' | 'freelancer';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!isLoaded) return;

      if (!isSignedIn || !user?.id) {
        setLoading(false);
        return;
      }

      try {
        const ensuredProfile = await ensureProfile(user.id, {
          full_name: user.fullName || null,
        });
        setProfile(ensuredProfile);
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isLoaded, isSignedIn, user?.fullName, user?.id]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    const fallbackPath = profile?.role ? `/dashboard/${profile.role}` : '/';
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}
