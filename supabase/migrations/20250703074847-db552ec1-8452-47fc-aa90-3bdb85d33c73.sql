
-- Create user profiles table for additional user data
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  linkedin_profile_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create linkedin_accounts table to store connected LinkedIn accounts
CREATE TABLE public.linkedin_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  linkedin_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  profile_data JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create engagement_targets table for defining who to engage with
CREATE TABLE public.engagement_targets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  target_criteria JSONB NOT NULL, -- industries, job titles, companies, etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create engagement_campaigns table for managing automation campaigns
CREATE TABLE public.engagement_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  target_id UUID REFERENCES public.engagement_targets,
  name TEXT NOT NULL,
  description TEXT,
  campaign_type TEXT NOT NULL, -- 'comment', 'connection', 'daily_engagement'
  settings JSONB NOT NULL, -- comment templates, connection message templates, frequency, etc.
  status TEXT DEFAULT 'draft', -- 'draft', 'active', 'paused', 'completed'
  daily_limit INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create engagement_activities table to track all engagement actions
CREATE TABLE public.engagement_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  campaign_id UUID REFERENCES public.engagement_campaigns,
  linkedin_post_id TEXT,
  linkedin_profile_id TEXT,
  activity_type TEXT NOT NULL, -- 'comment', 'connection_request', 'like', 'share'
  content TEXT, -- comment text or connection message
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'rejected'
  scheduled_for TIMESTAMP WITH TIME ZONE,
  executed_at TIMESTAMP WITH TIME ZONE,
  response_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create analytics table for tracking performance
CREATE TABLE public.engagement_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  campaign_id UUID REFERENCES public.engagement_campaigns,
  date DATE NOT NULL,
  comments_sent INTEGER DEFAULT 0,
  connections_sent INTEGER DEFAULT 0,
  connections_accepted INTEGER DEFAULT 0,
  likes_given INTEGER DEFAULT 0,
  profile_views INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.linkedin_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for linkedin_accounts
CREATE POLICY "Users can manage own linkedin accounts" ON public.linkedin_accounts FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for engagement_targets
CREATE POLICY "Users can manage own engagement targets" ON public.engagement_targets FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for engagement_campaigns
CREATE POLICY "Users can manage own campaigns" ON public.engagement_campaigns FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for engagement_activities
CREATE POLICY "Users can view own activities" ON public.engagement_activities FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for analytics
CREATE POLICY "Users can view own analytics" ON public.engagement_analytics FOR ALL USING (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_linkedin_accounts_user_id ON public.linkedin_accounts(user_id);
CREATE INDEX idx_engagement_targets_user_id ON public.engagement_targets(user_id);
CREATE INDEX idx_engagement_campaigns_user_id ON public.engagement_campaigns(user_id);
CREATE INDEX idx_engagement_activities_user_id ON public.engagement_activities(user_id);
CREATE INDEX idx_engagement_activities_campaign_id ON public.engagement_activities(campaign_id);
CREATE INDEX idx_engagement_activities_scheduled_for ON public.engagement_activities(scheduled_for);
CREATE INDEX idx_engagement_analytics_user_id ON public.engagement_analytics(user_id);
CREATE INDEX idx_engagement_analytics_date ON public.engagement_analytics(date);
