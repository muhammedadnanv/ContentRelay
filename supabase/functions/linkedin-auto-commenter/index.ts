
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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { action, campaignId, postContent, authorProfile, userContext } = await req.json();

    console.log('LinkedIn Auto-Commenter:', { action, campaignId });

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    switch (action) {
      case 'generate_comment':
        return await generateComment(postContent, authorProfile, userContext, campaignId);
      
      case 'generate_connection_message':
        return await generateConnectionMessage(authorProfile, userContext, campaignId);
      
      case 'process_daily_engagement':
        return await processDailyEngagement(campaignId, supabase);
      
      default:
        throw new Error('Invalid action');
    }

  } catch (error) {
    console.error('Error in linkedin-auto-commenter:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function generateComment(postContent: string, authorProfile: any, userContext: any, campaignId: string) {
  const prompt = `
You are an AI LinkedIn engagement expert. Generate a hyper-relevant, professional comment for this LinkedIn post.

POST CONTENT: "${postContent}"

AUTHOR PROFILE:
- Name: ${authorProfile.name}
- Company: ${authorProfile.company}
- Industry: ${authorProfile.industry}
- Position: ${authorProfile.position}

USER CONTEXT:
- Industry: ${userContext.industry}
- Company: ${userContext.company}
- Expertise: ${userContext.expertise}

REQUIREMENTS:
1. Make it feel genuine and personal
2. Add value to the conversation
3. Show industry knowledge
4. Keep it 50-150 words
5. Use a conversational, professional tone
6. Reference specific points from the post
7. Avoid generic responses like "Great post!"

Generate a comment that shows you actually read and understood the post while positioning the commenter as knowledgeable in their field.
`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    }),
  });

  const data = await response.json();
  const generatedComment = data.candidates[0].content.parts[0].text.trim();

  console.log('Generated comment:', generatedComment);

  return new Response(
    JSON.stringify({ 
      comment: generatedComment,
      postContent,
      authorProfile,
      timestamp: new Date().toISOString()
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function generateConnectionMessage(authorProfile: any, userContext: any, campaignId: string) {
  const prompt = `
Generate a personalized LinkedIn connection request message.

TARGET PROFILE:
- Name: ${authorProfile.name}
- Company: ${authorProfile.company}
- Industry: ${authorProfile.industry}
- Position: ${authorProfile.position}

USER CONTEXT:
- Industry: ${userContext.industry}
- Company: ${userContext.company}
- Role: ${userContext.role}

REQUIREMENTS:
1. Keep it under 300 characters (LinkedIn limit)
2. Be specific about why you want to connect
3. Mention something relevant about their background
4. Professional but friendly tone
5. No generic templates
6. Include a clear value proposition

Generate a connection message that feels personal and strategic.
`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 512,
      }
    }),
  });

  const data = await response.json();
  const connectionMessage = data.candidates[0].content.parts[0].text.trim();

  return new Response(
    JSON.stringify({ 
      connectionMessage,
      authorProfile,
      timestamp: new Date().toISOString()
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function processDailyEngagement(campaignId: string, supabase: any) {
  // This would integrate with LinkedIn API to fetch recent posts from target audience
  // For now, return a simulation of daily engagement processing

  const engagementResults = {
    campaignId,
    processed: new Date().toISOString(),
    actions: {
      comments: Math.floor(Math.random() * 10) + 5,
      connections: Math.floor(Math.random() * 5) + 2,
      likes: Math.floor(Math.random() * 15) + 10
    },
    status: 'completed'
  };

  return new Response(
    JSON.stringify(engagementResults),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
