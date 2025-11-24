CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL UNIQUE,
  full_name TEXT,
  company_name TEXT,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Align existing tables to use Clerk user identifiers
ALTER TABLE IF EXISTS stripe_accounts
  RENAME COLUMN user_id TO clerk_user_id;
ALTER TABLE IF EXISTS stripe_accounts
  ALTER COLUMN clerk_user_id TYPE TEXT;

ALTER TABLE IF EXISTS projects
  ALTER COLUMN client_id TYPE TEXT USING client_id::text;

ALTER TABLE IF EXISTS proposals
  ALTER COLUMN freelancer_id TYPE TEXT USING freelancer_id::text;

ALTER TABLE IF EXISTS payment_intents
  ALTER COLUMN client_id TYPE TEXT USING client_id::text;
ALTER TABLE IF EXISTS payment_intents
  ALTER COLUMN freelancer_id TYPE TEXT USING freelancer_id::text;
