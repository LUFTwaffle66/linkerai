export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';
export type ProposalStatus = 'pending' | 'accepted' | 'rejected';
export type PaymentIntentStatus =
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'succeeded'
  | 'canceled';
export type MilestoneType = 'upfront_50' | 'completion_50';

export interface Project {
  id: string;
  client_id: string; // Clerk user ID
  title: string;
  description: string;
  budget: number;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  project_id: string;
  freelancer_id: string; // Clerk user ID
  cover_letter: string;
  bid_amount: number;
  status: ProposalStatus;
  created_at: string;
  updated_at: string;
}

export interface ProjectWithProposalCount extends Project {
  proposal_count?: number;
}

export interface ProposalWithProject extends Proposal {
  project?: Project;
}

export interface PaymentIntent {
  id: string;
  project_id: string;
  client_id: string;
  freelancer_id: string;
  stripe_payment_intent_id: string;
  amount: number;
  currency: string;
  status: PaymentIntentStatus;
  milestone_type: MilestoneType;
  platform_fee: number | null;
  application_fee: number | null;
  metadata?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface StripeAccount {
  id: string;
  clerk_user_id: string;
  stripe_account_id: string;
  account_type: 'standard' | 'express' | 'custom';
  charges_enabled: boolean;
  payouts_enabled: boolean;
  details_submitted: boolean;
  country: string | null;
  currency: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  clerk_user_id: string;
  full_name: string | null;
  company_name: string | null;
  role: 'client' | 'freelancer' | null;
  created_at: string;
  updated_at: string;
}
