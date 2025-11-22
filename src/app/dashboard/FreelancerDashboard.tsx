import { useState } from 'react';
import { FreelancerProjectsList } from '../../features/projects/components/FreelancerProjectsList';
import { FreelancerProposalsList } from '../../features/proposals/components/FreelancerProposalsList';

export function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'proposals'>('projects');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <div className="flex gap-4 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'projects'
                  ? 'text-white border-indigo-600'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              Browse Projects
            </button>
            <button
              onClick={() => setActiveTab('proposals')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'proposals'
                  ? 'text-white border-indigo-600'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              My Proposals
            </button>
          </div>
        </div>

        {activeTab === 'projects' ? <FreelancerProjectsList /> : <FreelancerProposalsList />}
      </div>
    </div>
  );
}
