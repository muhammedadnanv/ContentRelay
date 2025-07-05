
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EngagementHistory {
  id: string;
  target_id: string;
  campaign_id?: string;
  engagement_type: 'comment' | 'connection' | 'like' | 'message';
  content?: string;
  post_url?: string;
  status: 'pending' | 'sent' | 'failed' | 'responded';
  created_at: string;
  sent_at?: string;
  response_received: boolean;
  user_id: string;
}

export const useEngagementHistory = () => {
  const [history, setHistory] = useState<EngagementHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('engagement_history')
        .select(`
          *,
          engagement_targets(name, company)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching engagement history:', error);
      toast({
        title: "Error",
        description: "Failed to load engagement history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createEngagement = async (engagementData: Omit<EngagementHistory, 'id' | 'created_at' | 'user_id' | 'response_received'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('engagement_history')
        .insert([{ 
          ...engagementData, 
          user_id: user.id, 
          response_received: false,
          sent_at: engagementData.status === 'sent' ? new Date().toISOString() : null
        }])
        .select()
        .single();

      if (error) throw error;

      // Update target engagement count
      if (engagementData.target_id) {
        await supabase.rpc('increment_engagement_count', {
          target_id: engagementData.target_id
        });
      }

      setHistory(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error creating engagement:', error);
      toast({
        title: "Error",
        description: "Failed to record engagement",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    history,
    loading,
    createEngagement,
    refetch: fetchHistory
  };
};
