
-- Create automation_rules table
CREATE TABLE public.automation_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  campaign_id UUID REFERENCES public.campaigns(id) NOT NULL,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('schedule', 'keyword', 'manual')),
  schedule_time TIME,
  keywords TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  daily_comment_limit INTEGER NOT NULL DEFAULT 10,
  daily_connection_limit INTEGER NOT NULL DEFAULT 5,
  auto_like BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create engagement_queue table
CREATE TABLE public.engagement_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  target_id UUID REFERENCES public.engagement_targets(id) NOT NULL,
  campaign_id UUID REFERENCES public.campaigns(id) NOT NULL,
  automation_rule_id UUID REFERENCES public.automation_rules(id),
  engagement_type TEXT NOT NULL CHECK (engagement_type IN ('comment', 'connection', 'like')),
  content TEXT,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_queue ENABLE ROW LEVEL SECURITY;

-- RLS policies for automation_rules
CREATE POLICY "Users can manage their own automation rules" 
  ON public.automation_rules 
  FOR ALL 
  USING (auth.uid() = user_id);

-- RLS policies for engagement_queue
CREATE POLICY "Users can manage their own engagement queue" 
  ON public.engagement_queue 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Add triggers to update updated_at timestamp
CREATE TRIGGER update_automation_rules_updated_at
  BEFORE UPDATE ON public.automation_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
