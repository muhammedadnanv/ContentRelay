
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { queueItemId } = await req.json();

    console.log('Processing queue item:', queueItemId);

    // Get queue item details
    const { data: queueItem, error: queueError } = await supabase
      .from('engagement_queue')
      .select(`
        *,
        engagement_targets!inner(name, company, position, industry),
        campaigns!inner(name, target_industry),
        automation_rules!inner(*)
      `)
      .eq('id', queueItemId)
      .single();

    if (queueError || !queueItem) {
      throw new Error('Queue item not found');
    }

    // Update status to processing
    await supabase
      .from('engagement_queue')
      .update({ status: 'processing' })
      .eq('id', queueItemId);

    let result;
    try {
      switch (queueItem.engagement_type) {
        case 'comment':
          result = await processComment(queueItem, supabase);
          break;
        case 'connection':
          result = await processConnection(queueItem, supabase);
          break;
        case 'like':
          result = await processLike(queueItem, supabase);
          break;
        default:
          throw new Error('Unknown engagement type');
      }

      // Update status to completed
      await supabase
        .from('engagement_queue')
        .update({ 
          status: 'completed',
          processed_at: new Date().toISOString()
        })
        .eq('id', queueItemId);

      // Create engagement history record
      await supabase
        .from('engagement_history')
        .insert([{
          target_id: queueItem.target_id,
          campaign_id: queueItem.campaign_id,
          engagement_type: queueItem.engagement_type,
          content: queueItem.content,
          status: 'sent',
          sent_at: new Date().toISOString(),
          user_id: queueItem.user_id
        }]);

      return new Response(
        JSON.stringify({ success: true, result }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (processingError) {
      console.error('Processing error:', processingError);
      
      // Update status to failed
      await supabase
        .from('engagement_queue')
        .update({ 
          status: 'failed',
          error_message: processingError.message
        })
        .eq('id', queueItemId);

      throw processingError;
    }

  } catch (error) {
    console.error('Error in process-engagement-queue:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function processComment(queueItem: any, supabase: any) {
  console.log('Processing comment for:', queueItem.engagement_targets.name);
  
  // If no content is provided, generate it using AI
  let commentContent = queueItem.content;
  
  if (!commentContent && geminiApiKey) {
    // Generate AI comment (simplified version)
    const prompt = `Generate a professional LinkedIn comment for a post by ${queueItem.engagement_targets.name} who is ${queueItem.engagement_targets.position} at ${queueItem.engagement_targets.company} in the ${queueItem.engagement_targets.industry} industry. Make it engaging and relevant. Keep it under 100 words.`;
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 200 }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        commentContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Great insights! Thanks for sharing.';
      }
    } catch (aiError) {
      console.error('AI generation failed:', aiError);
      commentContent = 'Great insights! Thanks for sharing.';
    }
  }

  // In a real implementation, this would post to LinkedIn API
  // For now, we'll simulate the process
  console.log('Comment content:', commentContent);
  
  return {
    type: 'comment',
    content: commentContent,
    target: queueItem.engagement_targets.name,
    status: 'simulated' // In real implementation: 'posted'
  };
}

async function processConnection(queueItem: any, supabase: any) {
  console.log('Processing connection request for:', queueItem.engagement_targets.name);
  
  // Generate connection message if not provided
  let connectionMessage = queueItem.content || `Hi ${queueItem.engagement_targets.name}, I'd love to connect and learn more about your work in ${queueItem.engagement_targets.industry}.`;
  
  // In a real implementation, this would send connection request via LinkedIn API
  console.log('Connection message:', connectionMessage);
  
  return {
    type: 'connection',
    message: connectionMessage,
    target: queueItem.engagement_targets.name,
    status: 'simulated' // In real implementation: 'sent'
  };
}

async function processLike(queueItem: any, supabase: any) {
  console.log('Processing like for:', queueItem.engagement_targets.name);
  
  // In a real implementation, this would like the post via LinkedIn API
  
  return {
    type: 'like',
    target: queueItem.engagement_targets.name,
    status: 'simulated' // In real implementation: 'liked'
  };
}
