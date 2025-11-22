import { useEffect, useState } from 'react';
import { getOpenProjects } from '../../../lib/api/projects';
import { Project } from '../../../types/database';
import { Briefcase, DollarSign, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FreelancerProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getOpenProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-400">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Browse Projects</h1>
        <p className="text-gray-400">Find open projects and submit proposals</p>
      </div>

      {projects.length === 0 ? (
        <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No open projects</h3>
          <p className="text-gray-400">Check back later for new opportunities</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className="bg-gray-900/30 border border-gray-800 hover:border-indigo-600 rounded-2xl p-8 transition-all cursor-pointer space-y-4"
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 line-clamp-3">{project.description}</p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-indigo-400">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">${project.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span>Posted {new Date(project.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <button className="text-indigo-400 hover:text-indigo-300 font-medium text-sm">
                  View Details & Submit Proposal →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
