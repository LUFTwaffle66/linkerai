import { supabase } from '../supabase/client';
import { Project, ProjectWithProposalCount } from '../../types/database';

export async function createProject(data: {
  title: string;
  description: string;
  budget: number;
}) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      client_id: user.id,
      title: data.title,
      description: data.description,
      budget: data.budget,
      status: 'open',
    })
    .select()
    .single();

  if (error) throw error;
  return project as Project;
}

export async function getClientProjects(): Promise<ProjectWithProposalCount[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const projectsWithCounts = await Promise.all(
    (projects || []).map(async (project) => {
      const { count } = await supabase
        .from('proposals')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', project.id);

      return {
        ...project,
        proposal_count: count || 0,
      };
    })
  );

  return projectsWithCounts as ProjectWithProposalCount[];
}

export async function getOpenProjects(): Promise<Project[]> {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return projects as Project[];
}

export async function getProjectById(projectId: string): Promise<Project | null> {
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return project as Project;
}

export async function updateProjectStatus(projectId: string, status: Project['status']) {
  const { error } = await supabase
    .from('projects')
    .update({ status })
    .eq('id', projectId);

  if (error) throw error;
}
