
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type LinkedInAccount = Tables<'linkedin_accounts'>;

export const useLinkedInAccounts = () => {
  const [accounts, setAccounts] = useState<LinkedInAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAccounts = async () => {
    try {
      setLoading(true);
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
        toast({
          title: "Error",
          description: "Failed to load LinkedIn accounts.",
          variant: "destructive",
        });
        return;
      }

      console.log('LinkedIn accounts fetched:', data);
      setAccounts(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
        return;
      }

      toast({
        title: "Account Disconnected",
        description: "LinkedIn account has been disconnected successfully.",
      });

      // Refresh the accounts list
      fetchAccounts();
    } catch (error) {
      console.error('Unexpected error while deleting:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while disconnecting.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    loading,
    deleteAccount,
    refetch: fetchAccounts
  };
};
