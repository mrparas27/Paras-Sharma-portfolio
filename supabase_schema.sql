-- Create opportunities table for the recruiter Hire Me inquiries
CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    recruiter_name TEXT NOT NULL,
    role_offered TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    linkedin_profile TEXT,
    company_website TEXT,
    opportunity_type TEXT NOT NULL, -- Internship, Full-Time, Contract, Freelance, Consulting
    joining_date DATE,
    salary_range TEXT,
    work_mode TEXT,                 -- Remote, Hybrid, Onsite
    location TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New Lead' -- New Lead, Contacted, Hired, etc.
);

-- Enable Row Level Security (RLS) if desired, or set up policies
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public recruiter submissions)
CREATE POLICY "Allow anonymous inserts" 
ON opportunities 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow authenticated reads/updates (for dashboard administration)
-- Note: Replace with your actual user/role rules as needed
CREATE POLICY "Allow service role or authenticated reads" 
ON opportunities 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Allow service role or authenticated updates" 
ON opportunities 
FOR UPDATE 
TO authenticated 
USING (true);
