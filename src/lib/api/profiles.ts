import { supabase } from '../supabase/client';
import type { Profile } from '../../types/database';

export async function getProfileByClerkId(clerkUserId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Profile | null;
}

export async function ensureProfile(
  clerkUserId: string,
  profileData?: Partial<Pick<Profile, 'full_name' | 'company_name' | 'role'>>,
): Promise<Profile> {
  const existing = await getProfileByClerkId(clerkUserId);

  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert({
      clerk_user_id: clerkUserId,
      full_name: profileData?.full_name ?? null,
      company_name: profileData?.company_name ?? null,
      role: profileData?.role ?? null,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data as Profile;
}
