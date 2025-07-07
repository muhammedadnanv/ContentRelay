
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linkedin, ArrowLeft, Mail, Lock, User, AlertCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { cleanupAuthState, handleAuthRedirect, isValidEmail } from "@/utils/authUtils";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth - Auth event:', event, 'Session:', !!session);
        
        if (!mounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        setAuthError(null);
        
        // Handle successful authentication
        if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          const redirectTo = handleAuthRedirect();
          
          toast({
            title: "Welcome!",
            description: "You have successfully signed in.",
          });
          
          // Small delay to ensure state is updated
          setTimeout(() => {
            navigate(redirectTo);
          }, 100);
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth - Session error:', error);
          setAuthError(error.message);
        }
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
          
          // Redirect if already authenticated
          if (session?.user) {
            const redirectTo = handleAuthRedirect();
            navigate(redirectTo);
          }
        }
      } catch (error) {
        console.error('Auth - Initialization error:', error);
        if (mounted) {
          setAuthError('Failed to initialize authentication');
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const signInWithLinkedIn = async () => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      console.log('Attempting LinkedIn sign in...');
      
      // Clean up any existing state first
      cleanupAuthState();
      
      const redirectUrl = `${window.location.origin}/dashboard?oauth=linkedin`;
      console.log('LinkedIn redirect URL:', redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: redirectUrl,
          scopes: 'openid profile email'
        }
      });
      
      if (error) {
        console.error('LinkedIn auth error:', error);
        setAuthError(error.message);
        toast({
          title: "LinkedIn Authentication Failed",
          description: error.message || "Failed to sign in with LinkedIn. Please try again.",
          variant: "destructive",
        });
      } else {
        console.log('LinkedIn auth initiated:', data);
      }
    } catch (error: any) {
      console.error('LinkedIn signin error:', error);
      setAuthError(error.message || 'An unexpected error occurred');
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    if (!email || !password) {
      setAuthError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    try {
      setAuthLoading(true);
      
      // Clean up existing state
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setAuthError(error.message);
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        console.log('Email sign in successful');
      }
    } catch (error: any) {
      setAuthError(error.message || 'An unexpected error occurred during sign in');
      toast({
        title: "Error",
        description: "An unexpected error occurred during sign in.",
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const signUpWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    if (!email || !password || !fullName) {
      setAuthError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setAuthLoading(true);
      
      // Clean up existing state
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        setAuthError(error.message);
        toast({
          title: "Sign Up Error",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        toast({
          title: "Account Created!",
          description: data.user.email_confirmed_at 
            ? "Your account has been created successfully." 
            : "Please check your email to verify your account.",
        });
        
        // If email is already confirmed, user will be signed in automatically
        if (data.user.email_confirmed_at) {
          console.log('User account created and confirmed');
        }
      }
    } catch (error: any) {
      setAuthError(error.message || 'An unexpected error occurred during sign up');
      toast({
        title: "Error",
        description: "An unexpected error occurred during sign up.",
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setAuthLoading(true);
      cleanupAuthState();
      
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
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
        // Force page reload for clean state
        window.location.href = '/';
      }
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during sign out.",
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back to Home Button */}
        <div className="mb-4 sm:mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 p-2 sm:p-3"
            size="sm"
            disabled={authLoading}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Welcome to Content Relay
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Your AI-powered LinkedIn automation platform
            </p>
          </div>

          {/* Error Alert */}
          {authError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          {/* Authentication Content */}
          {user ? (
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium text-sm sm:text-base">
                  Welcome, {user.user_metadata?.full_name || user.email}!
                </p>
                <p className="text-green-600 text-xs sm:text-sm mt-1">
                  You are successfully authenticated.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 h-11 sm:h-12"
                  disabled={authLoading}
                >
                  Go to Dashboard
                </Button>
                <Button
                  onClick={handleSignOut}
                  disabled={authLoading}
                  variant="outline"
                  className="flex-1 h-11 sm:h-12"
                >
                  {authLoading ? 'Signing out...' : 'Sign Out'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* LinkedIn OAuth */}
              <Button
                onClick={signInWithLinkedIn}
                disabled={authLoading}
                className="w-full bg-[#0077B5] hover:bg-[#005885] text-white h-11 sm:h-12 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">
                  {authLoading ? 'Connecting...' : 'Continue with LinkedIn'}
                </span>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Email/Password Auth */}
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-10 sm:h-11">
                  <TabsTrigger value="signin" className="text-sm sm:text-base" disabled={authLoading}>Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="text-sm sm:text-base" disabled={authLoading}>Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-4 mt-4 sm:mt-6">
                  <form onSubmit={signInWithEmail} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-sm sm:text-base">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                          required
                          disabled={authLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-sm sm:text-base">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                          required
                          disabled={authLoading}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={authLoading}
                      className="w-full h-11 sm:h-12 text-sm sm:text-base"
                    >
                      {authLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4 mt-4 sm:mt-6">
                  <form onSubmit={signUpWithEmail} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-sm sm:text-base">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                          required
                          disabled={authLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm sm:text-base">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                          required
                          disabled={authLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm sm:text-base">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password (min 6 characters)"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                          required
                          disabled={authLoading}
                          minLength={6}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={authLoading}
                      className="w-full h-11 sm:h-12 text-sm sm:text-base"
                    >
                      {authLoading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
