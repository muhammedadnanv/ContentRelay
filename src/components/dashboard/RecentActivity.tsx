
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, UserPlus, Heart, Share2, Bot } from "lucide-react";

interface Activity {
  id: string;
  activity_type: string;
  content: string;
  status: string;
  scheduled_for: string;
  executed_at: string;
  created_at: string;
  linkedin_profile?: {
    name: string;
    title: string;
    company: string;
  };
  ai_generated?: boolean;
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

      // Mock data for demo since tables are not ready yet
      const mockActivities: Activity[] = [
        {
          id: '1',
          activity_type: 'comment',
          content: 'Great insights on AI automation! As someone in the tech startup space, I particularly resonate with your point about scaling efficiently.',
          status: 'completed',
          scheduled_for: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          executed_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          linkedin_profile: {
            name: 'Sarah Johnson',
            title: 'Founder & CEO',
            company: 'TechFlow AI'
          },
          ai_generated: true
        },
        {
          id: '2',
          activity_type: 'connection_request',
          content: 'Hi John, I noticed your work at InnovateCorp and would love to connect and share insights about SaaS growth strategies.',
          status: 'pending',
          scheduled_for: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          executed_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          linkedin_profile: {
            name: 'John Smith',
            title: 'VP of Product',
            company: 'InnovateCorp'
          },
          ai_generated: true
        },
        {
          id: '3',
          activity_type: 'comment',
          content: 'This aligns perfectly with what we are seeing in the fintech space. Have you considered the impact of regulatory changes?',
          status: 'completed',
          scheduled_for: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          executed_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          linkedin_profile: {
            name: 'Michael Chen',
            title: 'Head of Strategy',
            company: 'FinTech Solutions'
          },
          ai_generated: true
        },
        {
          id: '4',
          activity_type: 'connection_request',
          content: 'Hi Lisa, I admire your work in growth marketing at CloudScale. Would love to connect and exchange insights.',
          status: 'accepted',
          scheduled_for: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          executed_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          linkedin_profile: {
            name: 'Lisa Rodriguez',
            title: 'Growth Marketing Director',
            company: 'CloudScale'
          },
          ai_generated: true
        },
        {
          id: '5',
          activity_type: 'like',
          content: '',
          status: 'completed',
          scheduled_for: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          executed_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          linkedin_profile: {
            name: 'David Park',
            title: 'Product Manager',
            company: 'TechHub'
          },
          ai_generated: false
        }
      ];
      
      setActivities(mockActivities);
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
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatActivityType = (type: string) => {
    switch (type) {
      case 'connection_request': return 'Connection Request';
      case 'comment': return 'AI Comment';
      case 'like': return 'Like';
      case 'share': return 'Share';
      default: return type;
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Recent AI Activity</h2>
          <p className="text-gray-600 text-sm">AI-powered engagement actions and their results</p>
        </div>
      </div>
      
      {activities.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">
              No recent AI activity
            </div>
            <p className="text-sm text-gray-400">
              Start a campaign to see your AI engagement activities here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.activity_type);
            return (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.ai_generated ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gray-100'}`}>
                      {activity.ai_generated ? (
                        <Bot className="h-4 w-4 text-white" />
                      ) : (
                        <Icon className={`h-4 w-4 ${getActivityColor(activity.activity_type)}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {formatActivityType(activity.activity_type)}
                          </span>
                          {activity.ai_generated && (
                            <Badge variant="outline" className="text-xs bg-gradient-to-r from-purple-100 to-indigo-100">
                              AI Generated
                            </Badge>
                          )}
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(activity.executed_at || activity.created_at)}
                        </span>
                      </div>
                      
                      {activity.linkedin_profile && (
                        <div className="mb-2">
                          <div className="text-sm font-medium text-gray-900">
                            {activity.linkedin_profile.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {activity.linkedin_profile.title} at {activity.linkedin_profile.company}
                          </div>
                        </div>
                      )}
                      
                      {activity.content && (
                        <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                          "{activity.content}"
                        </div>
                      )}
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
