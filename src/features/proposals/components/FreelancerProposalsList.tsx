import { useEffect, useState } from 'react';
import { getFreelancerProposals } from '../../../lib/api/proposals';
import { ProposalWithProject } from '../../../types/database';
import { FileText, DollarSign, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/nextjs';

export function FreelancerProposalsList() {
  const [proposals, setProposals] = useState<ProposalWithProject[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !user?.id) return;
    loadProposals(user.id);
  }, [isLoaded, user?.id]);

  const loadProposals = async (clerkUserId: string) => {
    try {
      const data = await getFreelancerProposals(clerkUserId);
      setProposals(data);
    } catch (err) {
      console.error('Failed to load proposals:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-400">Loading proposals...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Proposals</h1>
        <p className="text-gray-400">Track your submitted proposals and their status</p>
      </div>

      {proposals.length === 0 ? (
        <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-12 text-center">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No proposals yet</h3>
          <p className="text-gray-400 mb-6">Browse open projects and submit your first proposal</p>
          <button
            onClick={() => navigate('/dashboard/freelancer')}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Browse Projects
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className="text-xl font-semibold text-white hover:text-indigo-400 cursor-pointer"
                      onClick={() => navigate(`/project/${proposal.project_id}`)}
                    >
                      {proposal.project?.title || 'Project'}
                    </h3>
                  </div>
                  <p className="text-gray-400 line-clamp-2 mb-4">{proposal.cover_letter}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border whitespace-nowrap ${getStatusColor(proposal.status)}`}>
                  {formatStatus(proposal.status)}
                </span>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-indigo-400">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">Your bid: ${proposal.bid_amount.toLocaleString()}</span>
                </div>
                {proposal.project && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>Budget: ${proposal.project.budget.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-5 h-5" />
                  <span>Submitted {new Date(proposal.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              {proposal.status === 'accepted' && (
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-green-400 font-medium">
                    Congratulations! Your proposal was accepted.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
