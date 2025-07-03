
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, UserPlus, Heart, Share2 } from "lucide-react";

interface Activity {
  id: string;
  activity_type: string;
  content: string;
  status: string;
  scheduled_for: string;
  executed_at: string;
  created_at: string;
}

const RecentActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('engagement_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comment': return MessageSquare;
      case 'connection_request': return UserPlus;
      case 'like': return Heart;
      case 'share': return Share2;
      default: return MessageSquare;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'comment': return 'text-blue-600';
      case 'connection_request': return 'text-green-600';
      case 'like': return 'text-red-600';
      case 'share': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatActivityType = (type: string) => {
    switch (type) {
      case 'connection_request': return 'Connection Request';
      case 'comment': return 'Comment';
      case 'like': return 'Like';
      case 'share': return 'Share';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
      
      {activities.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500 mb-4">
              No recent activity
            </div>
            <p className="text-sm text-gray-400">
              Start a campaign to see your engagement activities here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.activity_type);
            return (
              <Card key={activity.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-5 w-5 mt-1 ${getActivityColor(activity.activity_type)}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">
                          {formatActivityType(activity.activity_type)}
                        </div>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                      {activity.content && (
                        <p className="text-gray-600 text-sm mt-1 truncate">
                          {activity.content}
                        </p>
                      )}
                      <div className="text-xs text-gray-500 mt-2">
                        {activity.executed_at 
                          ? `Executed: ${new Date(activity.executed_at).toLocaleString()}`
                          : `Scheduled: ${new Date(activity.scheduled_for || activity.created_at).toLocaleString()}`
                        }
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
