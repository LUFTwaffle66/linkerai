/*
  # Create Projects and Proposals Tables

  ## Projects Table
  1. New Tables
    - `projects`
      - `id` (uuid, primary key) - Unique project identifier
      - `client_id` (uuid, foreign key to auth.users) - Project owner
      - `title` (text, required) - Project title
      - `description` (text, required) - Project description
      - `budget` (numeric, required) - Project budget
      - `status` (text, required) - Project status: 'open', 'in_progress', 'completed', 'cancelled'
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  ## Proposals Table
  2. New Tables
    - `proposals`
      - `id` (uuid, primary key) - Unique proposal identifier
      - `project_id` (uuid, foreign key to projects) - Associated project
      - `freelancer_id` (uuid, foreign key to auth.users) - Proposal author
      - `cover_letter` (text, required) - Proposal cover letter
      - `bid_amount` (numeric, required) - Bid amount
      - `status` (text, required) - Proposal status: 'pending', 'accepted', 'rejected'
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  3. Row Level Security
    - Enable RLS on both tables
    - Projects:
      - Clients can read all projects and insert/update their own
      - Freelancers can read all open projects
    - Proposals:
      - Freelancers can insert and read their own proposals
      - Clients can read proposals for their projects
      - Clients can update proposals for their projects (to accept/reject)

  ## Indexes
  4. Performance
    - Index on client_id for projects
    - Index on project_id and freelancer_id for proposals
    - Index on status for both tables
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  budget numeric NOT NULL CHECK (budget > 0),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  freelancer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cover_letter text NOT NULL,
  bid_amount numeric NOT NULL CHECK (bid_amount > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(project_id, freelancer_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_proposals_project_id ON proposals(project_id);
CREATE INDEX IF NOT EXISTS idx_proposals_freelancer_id ON proposals(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Projects RLS Policies
-- Clients can create projects
CREATE POLICY "Clients can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = client_id
  );

-- Clients can view their own projects
CREATE POLICY "Clients can view own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id);

-- Freelancers can view open projects
CREATE POLICY "Freelancers can view open projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (status = 'open');

-- Clients can update their own projects
CREATE POLICY "Clients can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id)
  WITH CHECK (auth.uid() = client_id);

-- Proposals RLS Policies
-- Freelancers can create proposals
CREATE POLICY "Freelancers can create proposals"
  ON proposals
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = freelancer_id
  );

-- Freelancers can view their own proposals
CREATE POLICY "Freelancers can view own proposals"
  ON proposals
  FOR SELECT
  TO authenticated
  USING (auth.uid() = freelancer_id);

-- Clients can view proposals for their projects
CREATE POLICY "Clients can view proposals for their projects"
  ON proposals
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = proposals.project_id
      AND projects.client_id = auth.uid()
    )
  );

-- Clients can update proposals for their projects
CREATE POLICY "Clients can update proposals for their projects"
  ON proposals
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = proposals.project_id
      AND projects.client_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = proposals.project_id
      AND projects.client_id = auth.uid()
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
