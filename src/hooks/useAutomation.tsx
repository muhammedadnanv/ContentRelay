
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AutomationRule {
  id: string;
  campaign_id: string;
  name: string;
  trigger_type: 'schedule' | 'keyword' | 'manual';
  schedule_time?: string;
  keywords?: string[];
  is_active: boolean;
  daily_comment_limit: number;
  daily_connection_limit: number;
  auto_like: boolean;
  created_at: string;
  user_id: string;
}

export const useAutomation = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRules = async () => {
    try {
      const { data, error } = await supabase
        .from('automation_rules' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRules(data || []);
    } catch (error) {
      console.error('Error fetching automation rules:', error);
      toast({
        title: "Error",
        description: "Failed to load automation rules",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createRule = async (ruleData: Omit<AutomationRule, 'id' | 'created_at' | 'user_id'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('automation_rules' as any)
        .insert([{ ...ruleData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setRules(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Automation rule created successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error creating rule:', error);
      toast({
        title: "Error",
        description: "Failed to create automation rule",
        variant: "destructive",
      });
      throw error;
    }
  };

  const toggleRule = async (id: string, is_active: boolean) => {
    try {
      const { data, error } = await supabase
        .from('automation_rules' as any)
        .update({ is_active })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setRules(prev => prev.map(rule => 
        rule.id === id ? { ...rule, is_active } : rule
      ));

      toast({
        title: "Success",
        description: `Automation ${is_active ? 'enabled' : 'disabled'}`,
      });
      
      return data;
    } catch (error) {
      console.error('Error toggling rule:', error);
      toast({
        title: "Error",
        description: "Failed to update automation rule",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return {
    rules,
    loading,
    createRule,
    toggleRule,
    refetch: fetchRules
  };
};
