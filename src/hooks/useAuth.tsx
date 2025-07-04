
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('useAuth - Auth event:', event, 'Session:', session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('useAuth - Session error:', error);
        toast({
          title: "Session Error",
          description: "There was an issue retrieving your session.",
          variant: "destructive",
        });
      }
      console.log('useAuth - Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('useAuth - Sign out error:', error);
        toast({
          title: "Sign Out Error",
          description: error.message || "Failed to sign out. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      console.log('useAuth - Successfully signed out');
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('useAuth - Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    user,
    loading,
    signOut,
    isAuthenticated: !!user
  };
};
