
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type LinkedInAccount = Tables<'linkedin_accounts'>;

export const useLinkedInAccounts = () => {
  const [accounts, setAccounts] = useState<LinkedInAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching LinkedIn accounts...');
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No authenticated user found');
        setAccounts([]);
        return;
      }

      console.log('User found:', user.id);

      const { data, error } = await supabase
        .from('linkedin_accounts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching LinkedIn accounts:', error);
        setError(error.message);
        toast({
          title: "Error",
          description: "Failed to load LinkedIn accounts.",
          variant: "destructive",
        });
        return;
      }

      console.log('LinkedIn accounts fetched:', data?.length || 0);
      setAccounts(data || []);
    } catch (error: any) {
      console.error('Unexpected error:', error);
      setError(error.message || 'An unexpected error occurred');
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading accounts.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const deleteAccount = async (accountId: string) => {
    try {
      console.log('Deleting LinkedIn account:', accountId);
      
      const { error } = await supabase
        .from('linkedin_accounts')
        .delete()
        .eq('id', accountId);

      if (error) {
        console.error('Error deleting LinkedIn account:', error);
        toast({
          title: "Error",
          description: "Failed to disconnect LinkedIn account.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Account Disconnected",
        description: "LinkedIn account has been disconnected successfully.",
      });

      // Update local state immediately
      setAccounts(prev => prev.filter(account => account.id !== accountId));
      return true;
    } catch (error: any) {
      console.error('Unexpected error while deleting:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while disconnecting.",
        variant: "destructive",
      });
      return false;
    }
  };

  const createAccount = async (accountData: {
    username: string;
    full_name: string;
    email: string;
    profile_url?: string;
  }) => {
    try {
      console.log('Creating LinkedIn account:', accountData);

      const { data, error } = await supabase.functions.invoke('create-linkedin-account', {
        body: accountData
      });

      if (error) {
        console.error('Error creating LinkedIn account:', error);
        toast({
          title: "Connection Error",
          description: "Failed to save LinkedIn account. Please try again.",
          variant: "destructive",
        });
        return null;
      }

      console.log('LinkedIn account created successfully:', data);
      
      // Refresh accounts list
      await fetchAccounts();
      
      toast({
        title: "LinkedIn Connected",
        description: "Your LinkedIn account has been successfully connected!",
      });
      
      return data.account;
    } catch (error: any) {
      console.error('Error creating LinkedIn account record:', error);
      toast({
        title: "Error",
        description: "Failed to connect LinkedIn account. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return {
    accounts,
    loading,
    error,
    deleteAccount,
    createAccount,
    refetch: fetchAccounts
  };
};
