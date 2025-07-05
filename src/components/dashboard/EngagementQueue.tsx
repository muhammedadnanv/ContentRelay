
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, MessageCircle, UserPlus, Heart, Play, Pause, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface QueueItem {
  id: string;
  target_id: string;
  campaign_id: string;
  automation_rule_id: string;
  engagement_type: 'comment' | 'connection' | 'like';
  content?: string;
  scheduled_for: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  target: {
    name: string;
    company: string;
    position: string;
  };
  created_at: string;
}

const EngagementQueue = () => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchQueue = async () => {
    try {
      const { data, error } = await supabase
        .from('engagement_queue' as any)
        .select(`
          *,
          engagement_targets!inner(name, company, position)
        `)
        .order('scheduled_for', { ascending: true })
        .limit(50);

      if (error) throw error;
      
      const formattedData = (data || []).map((item: any) => ({
        ...item,
        target: item.engagement_targets
      }));
      
      setQueueItems(formattedData);
    } catch (error) {
      console.error('Error fetching queue:', error);
      toast({
        title: "Error",
        description: "Failed to load engagement queue",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const processQueueItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('engagement_queue' as any)
        .update({ status: 'processing' })
        .eq('id', itemId);

      if (error) throw error;

      // Call the automation function
      const { error: functionError } = await supabase.functions.invoke('process-engagement-queue', {
        body: { queueItemId: itemId }
      });

      if (functionError) throw functionError;

      toast({
        title: "Success",
        description: "Engagement processed successfully",
      });

      fetchQueue(); // Refresh the queue
    } catch (error) {
      console.error('Error processing queue item:', error);
      toast({
        title: "Error",
        description: "Failed to process engagement",
        variant: "destructive",
      });
    }
  };

  const removeFromQueue = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('engagement_queue' as any)
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setQueueItems(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "Success",
        description: "Item removed from queue",
      });
    } catch (error) {
      console.error('Error removing from queue:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from queue",
        variant: "destructive",
      });
    }
  };

  const getEngagementIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageCircle className="h-4 w-4" />;
      case 'connection':
        return <UserPlus className="h-4 w-4" />;
      case 'like':
        return <Heart className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchQueue();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('engagement_queue_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'engagement_queue'
      }, () => {
        fetchQueue();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2">Loading engagement queue...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Engagement Queue</h2>
          <p className="text-gray-600">
            {queueItems.filter(item => item.status === 'pending').length} pending engagements
          </p>
        </div>
        <Button onClick={fetchQueue} variant="outline">
          <Clock className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {queueItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 rounded-full">
                    {getEngagementIcon(item.engagement_type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.target.name}</h4>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.target.position} at {item.target.company}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {item.engagement_type} • Scheduled for {new Date(item.scheduled_for).toLocaleString()}
                    </p>
                    {item.content && (
                      <p className="text-sm text-gray-700 mt-2 p-2 bg-gray-50 rounded">
                        {item.content.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => processQueueItem(item.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFromQueue(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {queueItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No items in queue</h3>
              <p className="text-gray-600">
                Engagement items will appear here when automation rules are triggered.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EngagementQueue;
