
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        }
      }
    )

    // Get the user from the JWT
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    const { username, full_name, email, profile_url } = await req.json()

    // Validate required fields
    if (!username || !full_name || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: username, full_name, email' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if account already exists
    const { data: existingAccount } = await supabaseClient
      .from('linkedin_accounts')
      .select('id')
      .eq('user_id', user.id)
      .eq('email', email)
      .single()

    if (existingAccount) {
      return new Response(
        JSON.stringify({ 
          message: 'LinkedIn account already exists',
          account_id: existingAccount.id 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create new LinkedIn account record
    const { data: newAccount, error: insertError } = await supabaseClient
      .from('linkedin_accounts')
      .insert({
        user_id: user.id,
        username: username,
        full_name: full_name,
        email: email,
        profile_url: profile_url || null,
        status: 'active',
        connection_count: null,
        plan_type: 'Basic',
        last_sync: null
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating LinkedIn account:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to create LinkedIn account' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ 
        message: 'LinkedIn account created successfully',
        account: newAccount 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
