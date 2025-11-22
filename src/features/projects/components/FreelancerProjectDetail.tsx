import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById } from '../../../lib/api/projects';
import { checkExistingProposal } from '../../../lib/api/proposals';
import { Project } from '../../../types/database';
import { ArrowLeft, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { SubmitProposalForm } from '../../proposals/components/SubmitProposalForm';

export function FreelancerProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [hasProposal, setHasProposal] = useState(false);

  useEffect(() => {
    loadProjectDetails();
  }, [projectId]);

  const loadProjectDetails = async () => {
    if (!projectId) return;

    try {
      const [projectData, existingProposal] = await Promise.all([
        getProjectById(projectId),
        checkExistingProposal(projectId),
      ]);

      setProject(projectData);
      setHasProposal(existingProposal);
    } catch (err) {
      console.error('Failed to load project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProposalSuccess = () => {
    setShowProposalForm(false);
    setHasProposal(true);
    alert('Proposal submitted successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'in_progress':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
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
        <div className="text-gray-400">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 mb-4">Project not found</p>
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-400 hover:text-indigo-300"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Projects
      </button>

      <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-gray-400 leading-relaxed whitespace-pre-line">{project.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(project.status)}`}>
            {formatStatus(project.status)}
          </span>
        </div>

        <div className="flex items-center gap-8 pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-indigo-400">
            <DollarSign className="w-5 h-5" />
            <span className="font-semibold text-lg">${project.budget.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-5 h-5" />
            <span>Posted {new Date(project.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          {hasProposal ? (
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">You have already submitted a proposal for this project</span>
            </div>
          ) : project.status === 'open' ? (
            <button
              onClick={() => setShowProposalForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-medium transition-colors"
            >
              Submit Proposal
            </button>
          ) : (
            <p className="text-gray-500">This project is no longer accepting proposals</p>
          )}
        </div>
      </div>

      {showProposalForm && project && (
        <SubmitProposalForm
          projectId={project.id}
          projectTitle={project.title}
          projectBudget={project.budget}
          onSuccess={handleProposalSuccess}
          onCancel={() => setShowProposalForm(false)}
        />
      )}
    </div>
  );
}
