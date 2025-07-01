
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Linkedin, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event, 'Session:', session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Redirect authenticated users to home
        if (session?.user) {
          toast({
            title: "Welcome!",
            description: "You have successfully signed in.",
          });
          navigate('/');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Redirect if already authenticated
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const signInWithLinkedIn = async () => {
    try {
      setLoading(true);
      console.log('Attempting LinkedIn sign in...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('LinkedIn auth error:', error);
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to sign in with LinkedIn. Please try again.",
          variant: "destructive",
        });
      } else {
        console.log('LinkedIn auth initiated:', data);
      }
    } catch (error) {
      console.error('LinkedIn signin error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out.",
        });
      }
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during sign out.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Content Relay
            </h1>
            <p className="text-gray-600">
              Sign in with your LinkedIn account to get started
            </p>
          </div>

          {/* Authentication Content */}
          {user ? (
            <div className="text-center space-y-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium">
                  Welcome, {user.user_metadata?.full_name || user.email}!
                </p>
                <p className="text-green-600 text-sm mt-1">
                  You are successfully authenticated.
                </p>
              </div>
              
              <Button
                onClick={signOut}
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                {loading ? 'Signing out...' : 'Sign Out'}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <Button
                onClick={signInWithLinkedIn}
                disabled={loading}
                className="w-full bg-[#0077B5] hover:bg-[#005885] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span>
                  {loading ? 'Connecting...' : 'Continue with LinkedIn'}
                </span>
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
              
              {/* Debug info in development */}
              <div className="text-xs text-gray-400 text-center">
                <p>Having trouble signing in?</p>
                <p>Make sure LinkedIn OAuth is enabled in your Supabase dashboard.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
