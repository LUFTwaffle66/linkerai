import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById } from '../../../lib/api/projects';
import { getProposalsForProject, acceptProposal } from '../../../lib/api/proposals';
import { Project, Proposal } from '../../../types/database';
import { ArrowLeft, DollarSign, Calendar, CheckCircle, CreditCard } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { getProfileByClerkId } from '../../../lib/api/profiles';

export function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [acceptingProposalId, setAcceptingProposalId] = useState<string | null>(null);
  const { isLoaded, user } = useUser();

  const acceptedProposal = proposals.find((proposal) => proposal.status === 'accepted');

  useEffect(() => {
    loadProjectDetails();
  }, [projectId]);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!isLoaded || !user?.id) return;
      const profile = await getProfileByClerkId(user.id);
      setIsClient(profile?.role === 'client');
    };

    checkUserRole();
  }, [isLoaded, user?.id]);

  const loadProjectDetails = async () => {
    if (!projectId) return;

    try {
      const [projectData, proposalsData] = await Promise.all([
        getProjectById(projectId),
        getProposalsForProject(projectId),
      ]);

      setProject(projectData);
      setProposals(proposalsData);
    } catch (err) {
      console.error('Failed to load project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptProposal = async (proposalId: string) => {
    if (!projectId || !window.confirm('Are you sure you want to accept this proposal? This will reject all other proposals.')) {
      return;
    }

    setAcceptingProposalId(proposalId);
    try {
      await acceptProposal(proposalId, projectId);
      await loadProjectDetails();
    } catch (err) {
      console.error('Failed to accept proposal:', err);
      alert('Failed to accept proposal. Please try again.');
    } finally {
      setAcceptingProposalId(null);
    }
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
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'accepted':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'rejected':
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
        Back
      </button>

      <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-gray-400 leading-relaxed">{project.description}</p>
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
      </div>

      {isClient && acceptedProposal && project.status === 'in_progress' && (
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-sm text-indigo-100">Accepted bid amount</p>
              <p className="text-xl font-semibold text-white">
                ${acceptedProposal.bid_amount.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/project/${project.id}/checkout`)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Proceed to Stripe checkout
          </button>
        </div>
      )}

      {isClient && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Proposals ({proposals.length})</h2>
          </div>

          {proposals.length === 0 ? (
            <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-12 text-center">
              <p className="text-gray-400">No proposals yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-300">FR</span>
                        </div>
                        <div>
                          <p className="font-medium text-white">Freelancer</p>
                          <p className="text-sm text-gray-500">
                            {new Date(proposal.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-400 leading-relaxed mb-4">{proposal.cover_letter}</p>
                      <div className="flex items-center gap-2 text-indigo-400">
                        <DollarSign className="w-5 h-5" />
                        <span className="font-semibold">${proposal.bid_amount.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(proposal.status)}`}>
                        {formatStatus(proposal.status)}
                      </span>
                      {proposal.status === 'pending' && project.status === 'open' && (
                        <button
                          onClick={() => handleAcceptProposal(proposal.id)}
                          disabled={acceptingProposalId === proposal.id}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          {acceptingProposalId === proposal.id ? 'Accepting...' : 'Accept'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
