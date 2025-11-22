import { supabase } from '../supabase/client';
import { Proposal, ProposalWithProject } from '../../types/database';

export async function createProposal(data: {
  project_id: string;
  cover_letter: string;
  bid_amount: number;
}) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data: proposal, error } = await supabase
    .from('proposals')
    .insert({
      project_id: data.project_id,
      freelancer_id: user.id,
      cover_letter: data.cover_letter,
      bid_amount: data.bid_amount,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return proposal as Proposal;
}

export async function getProposalsForProject(projectId: string): Promise<Proposal[]> {
  const { data: proposals, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return proposals as Proposal[];
}

export async function getFreelancerProposals(): Promise<ProposalWithProject[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data: proposals, error } = await supabase
    .from('proposals')
    .select(`
      *,
      project:projects(*)
    `)
    .eq('freelancer_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return proposals as ProposalWithProject[];
}

export async function acceptProposal(proposalId: string, projectId: string) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { error: rejectError } = await supabase
    .from('proposals')
    .update({ status: 'rejected' })
    .eq('project_id', projectId)
    .neq('id', proposalId);

  if (rejectError) throw rejectError;

  const { error: acceptError } = await supabase
    .from('proposals')
    .update({ status: 'accepted' })
    .eq('id', proposalId);

  if (acceptError) throw acceptError;

  const { error: projectError } = await supabase
    .from('projects')
    .update({ status: 'in_progress' })
    .eq('id', projectId);

  if (projectError) throw projectError;
}

export async function checkExistingProposal(projectId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from('proposals')
    .select('id')
    .eq('project_id', projectId)
    .eq('freelancer_id', user.id)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}
