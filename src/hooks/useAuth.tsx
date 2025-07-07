
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { cleanupAuthState } from '@/utils/authUtils';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAuthStateChange = useCallback((event: string, session: Session | null) => {
    console.log('useAuth - Auth event:', event, 'Session:', !!session);
    setSession(session);
    setUser(session?.user ?? null);
    setAuthError(null);
    
    if (event === 'SIGNED_OUT') {
      cleanupAuthState();
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('useAuth - Session error:', error);
          setAuthError(error.message);
          if (mounted) {
            toast({
              title: "Session Error",
              description: "There was an issue retrieving your session. Please sign in again.",
              variant: "destructive",
            });
          }
        }
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('useAuth - Initialization error:', error);
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
  }, [handleAuthStateChange, toast]);

  const signOut = async () => {
    try {
      setLoading(true);
      cleanupAuthState();
      
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        console.error('useAuth - Sign out error:', error);
        toast({
          title: "Sign Out Error",
          description: error.message || "Failed to sign out. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      
      // Force page reload for clean state
      window.location.href = '/';
    } catch (error) {
      console.error('useAuth - Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('useAuth - Refresh session error:', error);
      throw error;
    }
  };

  return {
    session,
    user,
    loading,
    authError,
    signOut,
    refreshSession,
    isAuthenticated: !!user && !!session
  };
};
