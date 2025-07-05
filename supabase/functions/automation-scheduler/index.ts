
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    console.log('Running automation scheduler...');

    // Get active automation rules
    const { data: rules, error: rulesError } = await supabase
      .from('automation_rules')
      .select(`
        *,
        campaigns!inner(*)
      `)
      .eq('is_active', true);

    if (rulesError) throw rulesError;

    let totalScheduled = 0;

    for (const rule of rules || []) {
      console.log('Processing rule:', rule.name);
      
      // Check if we should trigger this rule based on schedule
      const shouldTrigger = await shouldTriggerRule(rule);
      
      if (!shouldTrigger) {
        console.log('Rule not triggered:', rule.name);
        continue;
      }

      // Get targets for this campaign
      const { data: targets, error: targetsError } = await supabase
        .from('engagement_targets')
        .select('*')
        .eq('campaign_id', rule.campaign_id)
        .eq('status', 'active')
        .limit(rule.daily_comment_limit + rule.daily_connection_limit);

      if (targetsError) {
        console.error('Error fetching targets:', targetsError);
        continue;
      }

      // Schedule engagements for each target
      for (let i = 0; i < (targets || []).length; i++) {
        const target = targets[i];
        
        // Determine engagement type based on rule and randomization
        const engagementTypes = [];
        
        // Add comment engagements
        if (i < rule.daily_comment_limit) {
          engagementTypes.push('comment');
        }
        
        // Add connection engagements
        if (i < rule.daily_connection_limit && Math.random() > 0.7) {
          engagementTypes.push('connection');
        }
        
        // Add likes if auto_like is enabled
        if (rule.auto_like && Math.random() > 0.5) {
          engagementTypes.push('like');
        }

        for (const engagementType of engagementTypes) {
          // Schedule engagement with some randomization
          const scheduledFor = new Date();
          scheduledFor.setMinutes(scheduledFor.getMinutes() + Math.random() * 480); // 0-8 hours from now
          
          const { error: insertError } = await supabase
            .from('engagement_queue')
            .insert([{
              target_id: target.id,
              campaign_id: rule.campaign_id,
              automation_rule_id: rule.id,
              engagement_type: engagementType,
              scheduled_for: scheduledFor.toISOString(),
              status: 'pending',
              user_id: rule.user_id
            }]);

          if (!insertError) {
            totalScheduled++;
            console.log(`Scheduled ${engagementType} for ${target.name}`);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        rulesProcessed: (rules || []).length,
        totalScheduled 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in automation-scheduler:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function shouldTriggerRule(rule: any): Promise<boolean> {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  switch (rule.trigger_type) {
    case 'schedule':
      if (rule.schedule_time) {
        const [scheduleHour, scheduleMinute] = rule.schedule_time.split(':').map(Number);
        // Trigger if we're within 30 minutes of the scheduled time
        const scheduledTime = scheduleHour * 60 + scheduleMinute;
        const currentTime = currentHour * 60 + currentMinute;
        return Math.abs(currentTime - scheduledTime) <= 30;
      }
      return false;
      
    case 'keyword':
      // For keyword triggers, we'd need to check recent posts
      // This would require LinkedIn API integration
      return Math.random() > 0.8; // Simulate 20% trigger rate
      
    case 'manual':
      return false; // Manual rules don't auto-trigger
      
    default:
      return false;
  }
}
