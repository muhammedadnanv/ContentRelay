
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
    console.log('Create LinkedIn Account function called');
    
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
      console.error('User authentication error:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: userError?.message }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('User authenticated:', user.id);

    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    console.log('Request body:', requestBody);
    
    const { username, full_name, email, profile_url } = requestBody;

    // Validate required fields
    if (!username || !full_name || !email) {
      const missingFields = [];
      if (!username) missingFields.push('username');
      if (!full_name) missingFields.push('full_name');
      if (!email) missingFields.push('email');
      
      console.error('Missing required fields:', missingFields);
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields', 
          missing_fields: missingFields,
          received: { username: !!username, full_name: !!full_name, email: !!email }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email);
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if account already exists for this user and email
    const { data: existingAccount, error: checkError } = await supabaseClient
      .from('linkedin_accounts')
      .select('id, email, username')
      .eq('user_id', user.id)
      .eq('email', email)
      .maybeSingle()

    if (checkError) {
      console.error('Error checking existing account:', checkError);
      // Continue anyway, as this might be a transient error
    }

    if (existingAccount) {
      console.log('Account already exists:', existingAccount);
      return new Response(
        JSON.stringify({ 
          message: 'LinkedIn account already exists',
          account: existingAccount
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create new LinkedIn account record
    const accountData = {
      user_id: user.id,
      username: username.trim(),
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      profile_url: profile_url || null,
      status: 'active',
      connection_count: null,
      plan_type: 'Basic',
      last_sync: new Date().toISOString()
    };

    console.log('Creating account with data:', accountData);

    const { data: newAccount, error: insertError } = await supabaseClient
      .from('linkedin_accounts')
      .insert(accountData)
      .select()
      .single()

    if (insertError) {
      console.error('Error creating LinkedIn account:', insertError);
      
      // Check if it's a duplicate key error
      if (insertError.code === '23505') {
        return new Response(
          JSON.stringify({ 
            error: 'Account already exists', 
            details: 'A LinkedIn account with this email already exists for this user'
          }),
          { 
            status: 409, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      return new Response(
        JSON.stringify({ 
          error: 'Failed to create LinkedIn account', 
          details: insertError.message,
          code: insertError.code 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('LinkedIn account created successfully:', newAccount);

    return new Response(
      JSON.stringify({ 
        message: 'LinkedIn account created successfully',
        account: newAccount 
      }),
      { 
        status: 201, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error in create-linkedin-account function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
