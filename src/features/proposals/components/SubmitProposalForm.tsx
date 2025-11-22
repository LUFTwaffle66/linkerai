import { useState } from 'react';
import { createProposal } from '../../../lib/api/proposals';
import { X } from 'lucide-react';

interface SubmitProposalFormProps {
  projectId: string;
  projectTitle: string;
  projectBudget: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function SubmitProposalForm({
  projectId,
  projectTitle,
  projectBudget,
  onSuccess,
  onCancel,
}: SubmitProposalFormProps) {
  const [coverLetter, setCoverLetter] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createProposal({
        project_id: projectId,
        cover_letter: coverLetter,
        bid_amount: parseFloat(bidAmount),
      });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit proposal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Submit Proposal</h2>
            <p className="text-gray-400 mt-1">{projectTitle}</p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="cover-letter" className="block text-sm font-medium text-gray-300 mb-2">
              Cover Letter
            </label>
            <textarea
              id="cover-letter"
              required
              rows={8}
              className="w-full px-5 py-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600 transition-colors resize-none"
              placeholder="Explain why you're the best fit for this project, your relevant experience, and your approach..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="bid-amount" className="block text-sm font-medium text-gray-300 mb-2">
              Your Bid Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                id="bid-amount"
                type="number"
                required
                min="1"
                step="0.01"
                max={projectBudget}
                className="w-full pl-10 pr-5 py-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600 transition-colors"
                placeholder={`Max: ${projectBudget.toLocaleString()}`}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Project budget: ${projectBudget.toLocaleString()}
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-4 px-6 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Proposal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
