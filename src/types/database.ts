export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';
export type ProposalStatus = 'pending' | 'accepted' | 'rejected';

export interface Project {
  id: string;
  client_id: string;
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
  freelancer_id: string;
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
