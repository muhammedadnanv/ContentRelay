
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthorProfile {
  name: string;
  company: string;
  industry: string;
  position: string;
}

interface UserContext {
  industry: string;
  company: string;
  expertise: string;
  role: string;
}

export const useGeminiCommenter = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateComment = async (
    postContent: string,
    authorProfile: AuthorProfile,
    userContext: UserContext,
    campaignId: string
  ) => {
    setLoading(true);
    try {
      console.log('Generating comment with Gemini API...');
      
      const { data, error } = await supabase.functions.invoke('linkedin-auto-commenter', {
        body: {
          action: 'generate_comment',
          postContent,
          authorProfile,
          userContext,
          campaignId
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data || !data.comment) {
        throw new Error('Invalid response from AI service');
      }

      toast({
        title: "Comment Generated",
        description: "AI has generated a hyper-relevant comment for the post.",
      });

      return data.comment;
    } catch (error) {
      console.error('Error generating comment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate comment. Please check your Gemini API configuration.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateConnectionMessage = async (
    authorProfile: AuthorProfile,
    userContext: UserContext,
    campaignId: string
  ) => {
    setLoading(true);
    try {
      console.log('Generating connection message with Gemini API...');
      
      const { data, error } = await supabase.functions.invoke('linkedin-auto-commenter', {
        body: {
          action: 'generate_connection_message',
          authorProfile,
          userContext,
          campaignId
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data || !data.connectionMessage) {
        throw new Error('Invalid response from AI service');
      }

      toast({
        title: "Connection Message Generated",
        description: "AI has created a personalized connection request message.",
      });

      return data.connectionMessage;
    } catch (error) {
      console.error('Error generating connection message:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate connection message. Please check your Gemini API configuration.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const processDailyEngagement = async (campaignId: string) => {
    setLoading(true);
    try {
      console.log('Processing daily engagement...');
      
      const { data, error } = await supabase.functions.invoke('linkedin-auto-commenter', {
        body: {
          action: 'process_daily_engagement',
          campaignId
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      toast({
        title: "Daily Engagement Processed",
        description: `Completed ${data.actions.comments} comments, ${data.actions.connections} connections, and ${data.actions.likes} likes.`,
      });

      return data;
    } catch (error) {
      console.error('Error processing daily engagement:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process daily engagement. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateComment,
    generateConnectionMessage,
    processDailyEngagement,
    loading
  };
};
