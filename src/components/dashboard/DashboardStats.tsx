
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, MessageCircle, Target } from "lucide-react";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useEngagementTargets } from "@/hooks/useEngagementTargets";
import { useEngagementHistory } from "@/hooks/useEngagementHistory";

const DashboardStats = () => {
  const { campaigns } = useCampaigns();
  const { targets } = useEngagementTargets();
  const { history } = useEngagementHistory();

  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalComments = history.filter(h => h.engagement_type === 'comment').length;
  const totalConnections = history.filter(h => h.engagement_type === 'connection').length;
  const responseRate = history.length > 0 
    ? Math.round((history.filter(h => h.response_received).length / history.length) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalComments}</div>
          <p className="text-xs text-muted-foreground">
            {history.filter(h => h.engagement_type === 'comment' && h.status === 'sent').length} sent successfully
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Connections</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalConnections}</div>
          <p className="text-xs text-muted-foreground">
            {targets.filter(t => t.status === 'connected').length} connected targets
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{responseRate}%</div>
          <p className="text-xs text-muted-foreground">
            {history.filter(h => h.response_received).length} responses received
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCampaigns}</div>
          <p className="text-xs text-muted-foreground">
            {campaigns.length - activeCampaigns} paused campaigns
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
