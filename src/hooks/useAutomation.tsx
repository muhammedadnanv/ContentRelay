
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

// Use the database type directly to avoid type mismatches
type AutomationRuleRow = Database['public']['Tables']['automation_rules']['Row'];

export interface AutomationRule extends AutomationRuleRow {}

export const useAutomation = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRules = async () => {
    try {
      const { data, error } = await supabase
        .from('automation_rules')
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

  const createRule = async (ruleData: Omit<AutomationRule, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('automation_rules')
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
        .from('automation_rules')
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
