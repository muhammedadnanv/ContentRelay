-- Fix webhook_events table security vulnerability
-- Remove the overly permissive policy that allows any user access
DROP POLICY IF EXISTS "System can manage webhook events" ON public.webhook_events;

-- Create restrictive policies for webhook_events table
-- Only service role can insert webhook events (for system integrations)
CREATE POLICY "Service role can insert webhook events" 
ON public.webhook_events 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- Only service role can update webhook events (for processing status)
CREATE POLICY "Service role can update webhook events" 
ON public.webhook_events 
FOR UPDATE 
USING (auth.role() = 'service_role');

-- Only service role can read webhook events (no user access to sensitive system data)
CREATE POLICY "Service role can read webhook events" 
ON public.webhook_events 
FOR SELECT 
USING (auth.role() = 'service_role');

-- Only service role can delete webhook events (for cleanup)
CREATE POLICY "Service role can delete webhook events" 
ON public.webhook_events 
FOR DELETE 
USING (auth.role() = 'service_role');