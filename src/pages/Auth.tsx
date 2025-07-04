
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linkedin, ArrowLeft, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth - Auth event:', event, 'Session:', session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Redirect authenticated users to dashboard
        if (session?.user) {
          toast({
            title: "Welcome!",
            description: "You have successfully signed in.",
          });
          navigate('/dashboard');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Auth - Initial session check:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Redirect if already authenticated
      if (session?.user) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const signInWithLinkedIn = async () => {
    try {
      setAuthLoading(true);
      console.log('Attempting LinkedIn sign in...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
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
      setAuthLoading(false);
    }
  };

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setAuthLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        toast({
          title: "Success!",
          description: "You have successfully signed in.",
        });
      }
    } catch (error) {
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
    if (!email || !password || !fullName) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setAuthLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast({
          title: "Sign Up Error",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred during sign up.",
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setAuthLoading(true);
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
        navigate('/');
      }
    } catch (error) {
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
              Your AI-powered LinkedIn automation platform
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
                disabled={authLoading}
                variant="outline"
                className="w-full"
              >
                {authLoading ? 'Signing out...' : 'Sign Out'}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* LinkedIn OAuth */}
              <Button
                onClick={signInWithLinkedIn}
                disabled={authLoading}
                className="w-full bg-[#0077B5] hover:bg-[#005885] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span>
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
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-4">
                  <form onSubmit={signInWithEmail} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={authLoading}
                      className="w-full"
                    >
                      {authLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={signUpWithEmail} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={authLoading}
                      className="w-full"
                    >
                      {authLoading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <p className="text-xs text-gray-500 text-center">
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
