
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type LinkedInAccount = Database['public']['Tables']['linkedin_accounts']['Row'];
type LinkedInAccountInsert = Database['public']['Tables']['linkedin_accounts']['Insert'];

export const useLinkedInAccounts = () => {
  const [accounts, setAccounts] = useState<LinkedInAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('linkedin_accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAccounts(data || []);
    } catch (error) {
      console.error('Error fetching LinkedIn accounts:', error);
      toast({
        title: "Error",
        description: "Failed to load LinkedIn accounts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (accountData: Omit<LinkedInAccountInsert, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('linkedin_accounts')
        .insert([{ ...accountData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setAccounts(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "LinkedIn account connected successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error creating LinkedIn account:', error);
      toast({
        title: "Error",
        description: "Failed to connect LinkedIn account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateAccount = async (id: string, updates: Partial<LinkedInAccountInsert>) => {
    try {
      const { data, error } = await supabase
        .from('linkedin_accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAccounts(prev => prev.map(account => 
        account.id === id ? { ...account, ...updates } : account
      ));

      toast({
        title: "Success",
        description: "LinkedIn account updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating LinkedIn account:', error);
      toast({
        title: "Error",
        description: "Failed to update LinkedIn account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteAccount = async (id: string) => {
    try {
      const { error } = await supabase
        .from('linkedin_accounts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAccounts(prev => prev.filter(account => account.id !== id));
      toast({
        title: "Success",
        description: "LinkedIn account disconnected successfully",
      });
    } catch (error) {
      console.error('Error deleting LinkedIn account:', error);
      toast({
        title: "Error",
        description: "Failed to disconnect LinkedIn account",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    loading,
    createAccount,
    updateAccount,
    deleteAccount,
    refetch: fetchAccounts
  };
};
