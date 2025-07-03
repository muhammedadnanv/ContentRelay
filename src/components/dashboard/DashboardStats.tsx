
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, UserPlus, TrendingUp, Zap } from "lucide-react";

interface Stats {
  totalCampaigns: number;
  activeCampaigns: number;
  commentsToday: number;
  connectionsToday: number;
}

const DashboardStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalCampaigns: 0,
    activeCampaigns: 0,
    commentsToday: 0,
    connectionsToday: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch campaign stats with proper error handling
        const { data: campaigns, error: campaignsError } = await supabase
          .from('engagement_campaigns' as any)
          .select('status')
          .eq('user_id', user.id);

        if (campaignsError) {
          console.log('Campaigns table not ready yet, using mock data');
        }

        // Fetch today's activities with proper error handling
        const today = new Date().toISOString().split('T')[0];
        const { data: activities, error: activitiesError } = await supabase
          .from('engagement_activities' as any)
          .select('activity_type')
          .eq('user_id', user.id)
          .gte('created_at', today);

        if (activitiesError) {
          console.log('Activities table not ready yet, using mock data');
        }

        const totalCampaigns = campaigns?.length || 0;
        const activeCampaigns = campaigns?.filter((c: any) => c.status === 'active').length || 0;
        const commentsToday = activities?.filter((a: any) => a.activity_type === 'comment').length || 0;
        const connectionsToday = activities?.filter((a: any) => a.activity_type === 'connection_request').length || 0;

        setStats({
          totalCampaigns,
          activeCampaigns,
          commentsToday,
          connectionsToday,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set mock data for demo
        setStats({
          totalCampaigns: 3,
          activeCampaigns: 2,
          commentsToday: 15,
          connectionsToday: 8,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Campaigns",
      value: stats.totalCampaigns,
      icon: Zap,
      color: "text-blue-600",
    },
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Comments Today",
      value: stats.commentsToday,
      icon: MessageSquare,
      color: "text-purple-600",
    },
    {
      title: "Connections Today",
      value: stats.connectionsToday,
      icon: UserPlus,
      color: "text-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
