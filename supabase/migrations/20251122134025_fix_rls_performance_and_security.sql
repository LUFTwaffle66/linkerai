/*
  # Fix RLS Performance and Security Issues

  ## Overview
  This migration addresses critical performance and security issues identified by Supabase:
  
  ## Changes Made

  ### 1. RLS Policy Performance Optimization
  **Problem**: Policies using `auth.uid()` and `auth.jwt()` are re-evaluated for each row, causing performance degradation at scale.
  **Solution**: Wrap auth functions in SELECT subqueries: `(select auth.uid())` to evaluate once per query instead of per row.
  
  **Affected Policies**:
  - All policies on `users`, `projects`, and `proposals` tables
  
  ### 2. Remove Redundant Service Role Policy
  **Problem**: Multiple permissive policies on `users` table causing conflicts and unnecessary complexity.
  **Solution**: Remove the "Service role can do everything" policy as service_role bypasses RLS anyway.
  
  ### 3. Remove Unused Indexes
  **Problem**: Indexes that are never used consume storage and slow down writes.
  **Solution**: Drop unused indexes while keeping those needed for foreign key constraints.
  
  **Indexes Removed**:
  - `idx_users_email` - Email is already unique, covered by unique constraint
  - `idx_users_role` - Not used in current query patterns
  - `idx_users_is_active` - Not used in current query patterns
  
  **Indexes Kept** (used for foreign key lookups):
  - `idx_projects_client_id` - Used for project owner lookups
  - `idx_projects_status` - Used for filtering open projects
  - `idx_proposals_project_id` - Used for proposal-project joins
  - `idx_proposals_freelancer_id` - Used for freelancer proposal lookups
  - `idx_proposals_status` - Used for filtering proposal status
  
  ### 4. Fix Function Search Path Security
  **Problem**: Functions with role-mutable search_path are vulnerable to search_path attacks.
  **Solution**: Set explicit search_path on functions and mark as SECURITY DEFINER with proper schema qualification.
  
  ## Security Impact
  - ✅ Improved query performance (auth functions evaluated once per query)
  - ✅ Reduced policy conflicts (removed redundant service role policy)
  - ✅ Protected against search_path attacks
  - ✅ Maintained all security constraints
*/

-- ============================================================================
-- STEP 1: Drop all existing RLS policies to recreate them with optimizations
-- ============================================================================

-- Drop users table policies
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Service role can do everything" ON users;

-- Drop projects table policies
DROP POLICY IF EXISTS "Clients can create projects" ON projects;
DROP POLICY IF EXISTS "Clients can view own projects" ON projects;
DROP POLICY IF EXISTS "Freelancers can view open projects" ON projects;
DROP POLICY IF EXISTS "Clients can update own projects" ON projects;

-- Drop proposals table policies
DROP POLICY IF EXISTS "Freelancers can create proposals" ON proposals;
DROP POLICY IF EXISTS "Freelancers can view own proposals" ON proposals;
DROP POLICY IF EXISTS "Clients can view proposals for their projects" ON proposals;
DROP POLICY IF EXISTS "Clients can update proposals for their projects" ON proposals;

-- ============================================================================
-- STEP 2: Create optimized RLS policies with SELECT subqueries
-- ============================================================================

-- Users table policies (optimized)
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- Projects table policies (optimized)
CREATE POLICY "Clients can create projects" ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = client_id);

CREATE POLICY "Clients can view own projects" ON projects
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = client_id);

CREATE POLICY "Freelancers can view open projects" ON projects
  FOR SELECT
  TO authenticated
  USING (status = 'open');

CREATE POLICY "Clients can update own projects" ON projects
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = client_id)
  WITH CHECK ((select auth.uid()) = client_id);

-- Proposals table policies (optimized)
CREATE POLICY "Freelancers can create proposals" ON proposals
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = freelancer_id);

CREATE POLICY "Freelancers can view own proposals" ON proposals
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = freelancer_id);

CREATE POLICY "Clients can view proposals for their projects" ON proposals
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = proposals.project_id
      AND projects.client_id = (select auth.uid())
    )
  );

CREATE POLICY "Clients can update proposals for their projects" ON proposals
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = proposals.project_id
      AND projects.client_id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = proposals.project_id
      AND projects.client_id = (select auth.uid())
    )
  );

-- ============================================================================
-- STEP 3: Drop unused indexes
-- ============================================================================

DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_role;
DROP INDEX IF EXISTS idx_users_is_active;

-- ============================================================================
-- STEP 4: Fix function search_path security issues
-- ============================================================================

-- Recreate handle_new_user function with secure search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(new.raw_user_meta_data->>'role', 'client')
  );
  RETURN new;
END;
$$;

-- Recreate update_updated_at_column function with secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- STEP 5: Add comments for documentation
-- ============================================================================

COMMENT ON POLICY "Users can view their own profile" ON users IS 
  'Optimized: Users can only view their own profile data. Auth function wrapped in SELECT for performance.';

COMMENT ON POLICY "Users can update their own profile" ON users IS 
  'Optimized: Users can only update their own profile. Auth function wrapped in SELECT for performance.';

COMMENT ON POLICY "Clients can create projects" ON projects IS 
  'Optimized: Authenticated users can create projects where they are the client. Auth function wrapped in SELECT.';

COMMENT ON POLICY "Clients can view own projects" ON projects IS 
  'Optimized: Clients can view their own projects. Auth function wrapped in SELECT for performance.';

COMMENT ON POLICY "Freelancers can view open projects" ON projects IS 
  'Freelancers can browse all projects with status=open to find work opportunities.';

COMMENT ON POLICY "Clients can update own projects" ON projects IS 
  'Optimized: Clients can only update their own projects. Auth function wrapped in SELECT for performance.';

COMMENT ON POLICY "Freelancers can create proposals" ON proposals IS 
  'Optimized: Freelancers can submit proposals for projects. Auth function wrapped in SELECT for performance.';

COMMENT ON POLICY "Freelancers can view own proposals" ON proposals IS 
  'Optimized: Freelancers can view all their submitted proposals. Auth function wrapped in SELECT for performance.';

COMMENT ON POLICY "Clients can view proposals for their projects" ON proposals IS 
  'Optimized: Clients can view all proposals submitted to their projects. Auth function wrapped in SELECT for performance.';

COMMENT ON POLICY "Clients can update proposals for their projects" ON proposals IS 
  'Optimized: Clients can update proposal status (accept/reject) for their projects. Auth function wrapped in SELECT.';

COMMENT ON FUNCTION public.handle_new_user() IS 
  'Trigger function to automatically create user profile on auth signup. Secured with explicit search_path.';

COMMENT ON FUNCTION public.update_updated_at_column() IS 
  'Trigger function to update updated_at timestamp. Secured with explicit search_path.';
