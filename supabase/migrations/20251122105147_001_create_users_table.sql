-- # Create Users Table Migration
--
-- This migration sets up the core users table for LinkerAI platform.
--
-- ## What this migration does:
--
-- 1. **Creates users table** - Core user data that extends Supabase Auth
--    - Links to auth.users via foreign key
--    - Stores profile information (name, company, avatar)
--    - Tracks user role (client/freelancer), verification status, and account state
--
-- 2. **Adds performance indexes** - Optimized for common query patterns
--    - Email lookups for login/verification
--    - Role-based filtering for user segmentation
--    - Active status filtering for user management
--
-- 3. **Enables Row Level Security (RLS)** - Secure data access
--    - Users can only access their own profile data
--    - Service role has full access for admin operations
--
-- 4. **Auto-profile creation** - Seamless user onboarding
--    - Trigger automatically creates user profile on auth signup
--    - Ensures every authenticated user has a profile record
--
-- ## Security Considerations:
-- - RLS policies prevent users from accessing other user data
-- - Email verification tracking for account security
-- - Account banning capability for moderation
-- - Audit trail with created_at/updated_at timestamps

-- Create users table
CREATE TABLE users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR NOT NULL,
    role VARCHAR NOT NULL CHECK (role IN ('client', 'freelancer')),
    company_name VARCHAR,
    avatar_url TEXT,
    email_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    is_banned BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own profile
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- RLS Policy: Users can update their own profile
CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policy: Service role can do everything
CREATE POLICY "Service role can do everything" ON users
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users (id, email, full_name, role)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', 'New User'),
        COALESCE(new.raw_user_meta_data->>'role', 'client')
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Add updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at timestamp
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();