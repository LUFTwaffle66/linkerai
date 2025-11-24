import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CreditCard, Shield, Sparkles, XCircle } from 'lucide-react';
import { getProjectById } from '../../../lib/api/projects';
import { getProposalsForProject } from '../../../lib/api/proposals';
import {
  createPaymentIntentCheckout,
  getPaymentIntentsForProject,
  getStripeAccountForUser,
} from '../../../lib/api/payments';
import type { MilestoneType, PaymentIntent, Project, Proposal, StripeAccount } from '../../../types/database';

export function PaymentPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [paymentIntents, setPaymentIntents] = useState<PaymentIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingSession, setCreatingSession] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canceled, setCanceled] = useState(false);
  const [freelancerAccount, setFreelancerAccount] = useState<StripeAccount | null>(null);
  const [accountCheckInProgress, setAccountCheckInProgress] = useState(false);

  const acceptedProposal = useMemo(
    () => proposals.find((proposal) => proposal.status === 'accepted') ?? null,
    [proposals],
  );

  useEffect(() => {
    if (!projectId) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [projectData, proposalsData, intents] = await Promise.all([
          getProjectById(projectId),
          getProposalsForProject(projectId),
          getPaymentIntentsForProject(projectId),
        ]);

        setProject(projectData);
        setProposals(proposalsData);
        setPaymentIntents(intents);
        setCanceled(new URLSearchParams(window.location.search).has('canceled'));
      } catch (err) {
        console.error(err);
        setError('Unable to load project payment details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [projectId]);

  useEffect(() => {
    const freelancerId = acceptedProposal?.freelancer_id;
    if (!freelancerId) return;

    const loadStripeAccount = async () => {
      setAccountCheckInProgress(true);
      try {
        const account = await getStripeAccountForUser(freelancerId);
        setFreelancerAccount(account);
      } catch (err) {
        console.error(err);
        setError('Unable to verify freelancer payout account.');
      } finally {
        setAccountCheckInProgress(false);
      }
    };

    loadStripeAccount();
  }, [acceptedProposal?.freelancer_id]);

  const upfrontIntent = useMemo(
    () => paymentIntents.find((intent) => intent.milestone_type === 'upfront_50') ?? null,
    [paymentIntents],
  );

  const completionIntent = useMemo(
    () => paymentIntents.find((intent) => intent.milestone_type === 'completion_50') ?? null,
    [paymentIntents],
  );

  const upfrontPaid = upfrontIntent?.status === 'succeeded';
  const completionPaid = completionIntent?.status === 'succeeded';

  const nextMilestoneType: MilestoneType | null = useMemo(() => {
    if (!acceptedProposal) return null;
    if (!upfrontPaid) return 'upfront_50';
    if (!completionPaid) return 'completion_50';
    return null;
  }, [acceptedProposal, completionPaid, upfrontPaid]);

  const totalAmountCents = acceptedProposal ? Math.round(acceptedProposal.bid_amount * 100) : 0;
  const upfrontAmountCents = Math.round(totalAmountCents / 2);
  const completionAmountCents = totalAmountCents - upfrontAmountCents;

  const amountDueCents =
    nextMilestoneType === 'completion_50'
      ? completionAmountCents
      : nextMilestoneType === 'upfront_50'
        ? upfrontAmountCents
        : 0;

  const paymentComplete = !nextMilestoneType;

  const freelancerReady = useMemo(() => {
    if (!freelancerAccount) return false;
    return (
      freelancerAccount.charges_enabled &&
      freelancerAccount.payouts_enabled &&
      freelancerAccount.details_submitted
    );
  }, [freelancerAccount]);

  const renderMilestoneCard = (
    milestoneType: MilestoneType,
    amountCents: number,
    intent: PaymentIntent | null,
    paid: boolean,
  ) => {
    const label = milestoneType === 'upfront_50' ? 'Upfront 50%' : 'Completion 50%';
    const statusText = paid
      ? 'Paid'
      : intent?.status === 'canceled'
        ? 'Canceled'
        : intent?.status
          ? intent.status.replace(/_/g, ' ')
          : 'Not started';

    const statusColor = paid
      ? 'text-green-300 bg-green-500/10 border-green-500/20'
      : intent?.status === 'canceled'
        ? 'text-red-300 bg-red-500/10 border-red-500/20'
        : 'text-amber-200 bg-amber-500/10 border-amber-500/20';

    return (
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-lg font-semibold text-white">
              ${(amountCents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${statusColor}`}>
            {statusText}
          </span>
        </div>
        <div className="text-sm text-gray-400">
          {intent?.stripe_payment_intent_id ? (
            <span className="flex items-center gap-2">
              {paid ? <CheckCircle2 className="w-4 h-4 text-green-300" /> : <Sparkles className="w-4 h-4 text-indigo-300" />} 
              Stripe PI: {intent.stripe_payment_intent_id}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-gray-500" />
              No payment intent yet
            </span>
          )}
        </div>
      </div>
    );
  };

  const handleCheckout = async () => {
    if (!projectId || !acceptedProposal || !nextMilestoneType) return;
    if (!freelancerReady) {
      setError('Freelancer Stripe account is not ready to receive funds yet.');
      return;
    }

    setCreatingSession(true);
    setError(null);

    try {
      const { checkoutUrl } = await createPaymentIntentCheckout({
        projectId,
        milestoneType: nextMilestoneType,
        amount: amountDueCents,
        currency: 'usd',
        successUrl: `${window.location.origin}/project/${projectId}`,
        cancelUrl: `${window.location.origin}/project/${projectId}/checkout?canceled=true`,
      });

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      setError('Unable to start Stripe checkout. Please try again.');
      setCreatingSession(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400">Loading payment details...</div>
      </div>
    );
  }

  if (!project || !acceptedProposal) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-semibold text-white">Payment unavailable</h1>
          <p className="text-gray-400">
            We couldn&apos;t find an accepted proposal for this project. Accept a proposal to unlock checkout.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to project
        </button>

        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Secure payment for</p>
                <h1 className="text-2xl font-bold text-white">{project.title}</h1>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total contract</span>
                  <span className="text-white font-semibold text-lg">
                    ${(totalAmountCents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Amount due now</span>
                  <span className="text-indigo-300 font-semibold text-lg">
                    ${(amountDueCents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Split into two escrow-style milestones: 50% upfront and 50% on completion.</p>
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-green-400" />
                  Funds flow into platform-held escrow via Stripe PaymentIntents.
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Milestones: upfront_50 then completion_50.
                </div>
                {canceled && (
                  <p className="text-xs text-amber-400">Checkout canceled. You can restart whenever you&apos;re ready.</p>
                )}
                {!freelancerReady && !accountCheckInProgress && (
                  <p className="text-xs text-amber-400">
                    The freelancer&apos;s Stripe account is not ready for payouts. Please have them finish onboarding.
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {renderMilestoneCard('upfront_50', upfrontAmountCents, upfrontIntent, upfrontPaid)}
              {renderMilestoneCard('completion_50', completionAmountCents, completionIntent, completionPaid)}
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-400 space-y-1">
                <p>Each payment creates a PaymentIntent with the correct milestone type.</p>
                {accountCheckInProgress && <p>Checking freelancer payout eligibility...</p>}
              </div>
              <button
                onClick={handleCheckout}
                disabled={creatingSession || !nextMilestoneType || !freelancerReady || accountCheckInProgress}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors"
              >
                {paymentComplete
                  ? 'All milestones paid'
                  : creatingSession
                    ? 'Starting checkout...'
                    : nextMilestoneType === 'completion_50'
                      ? 'Pay remaining 50%'
                      : 'Pay 50% upfront'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
