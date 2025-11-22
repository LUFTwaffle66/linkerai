import { useEffect, useState } from 'react';
import { getClientProjects } from '../../../lib/api/projects';
import { ProjectWithProposalCount } from '../../../types/database';
import { Plus, Briefcase, DollarSign, MessageSquare } from 'lucide-react';
import { CreateProjectForm } from './CreateProjectForm';
import { useNavigate } from 'react-router-dom';

export function ClientProjectsList() {
  const [projects, setProjects] = useState<ProjectWithProposalCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  const loadProjects = async () => {
    try {
      const data = await getClientProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    loadProjects();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'in_progress':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'completed':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
          <p className="text-gray-400">Manage your posted projects and proposals</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-gray-400 mb-6">Create your first project to find AI automation experts</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className="bg-gray-900/30 border border-gray-800 hover:border-indigo-600 rounded-2xl p-8 transition-all cursor-pointer space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 line-clamp-2">{project.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(project.status)}`}>
                  {formatStatus(project.status)}
                </span>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-indigo-400">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">${project.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MessageSquare className="w-5 h-5" />
                  <span>{project.proposal_count || 0} proposals</span>
                </div>
                <div className="text-gray-500">
                  {new Date(project.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateForm && (
        <CreateProjectForm
          onSuccess={handleCreateSuccess}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
}
