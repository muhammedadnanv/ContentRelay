
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EngagementTarget {
  id: string;
  name: string;
  company: string;
  position: string;
  industry: string;
  linkedin_profile_url?: string;
  status: 'pending' | 'active' | 'connected' | 'engaged';
  last_engagement?: string;
  engagement_count: number;
  campaign_id?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export const useEngagementTargets = () => {
  const [targets, setTargets] = useState<EngagementTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTargets = async () => {
    try {
      const { data, error } = await supabase
        .from('engagement_targets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTargets(data as EngagementTarget[]);
    } catch (error) {
      console.error('Error fetching targets:', error);
      toast({
        title: "Error",
        description: "Failed to load engagement targets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTarget = async (targetData: Omit<EngagementTarget, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'engagement_count'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('engagement_targets')
        .insert([{ ...targetData, user_id: user.id, engagement_count: 0 }])
        .select()
        .single();

      if (error) throw error;

      setTargets(prev => [data as EngagementTarget, ...prev]);
      toast({
        title: "Success",
        description: "Target added successfully",
      });
      
      return data as EngagementTarget;
    } catch (error) {
      console.error('Error creating target:', error);
      toast({
        title: "Error",
        description: "Failed to add target",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateTarget = async (id: string, updates: Partial<EngagementTarget>) => {
    try {
      const { data, error } = await supabase
        .from('engagement_targets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTargets(prev => prev.map(target => 
        target.id === id ? data as EngagementTarget : target
      ));

      return data as EngagementTarget;
    } catch (error) {
      console.error('Error updating target:', error);
      toast({
        title: "Error",
        description: "Failed to update target",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteTarget = async (id: string) => {
    try {
      const { error } = await supabase
        .from('engagement_targets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTargets(prev => prev.filter(target => target.id !== id));
      toast({
        title: "Success",
        description: "Target removed successfully",
      });
    } catch (error) {
      console.error('Error deleting target:', error);
      toast({
        title: "Error",
        description: "Failed to remove target",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  return {
    targets,
    loading,
    createTarget,
    updateTarget,
    deleteTarget,
    refetch: fetchTargets
  };
};
