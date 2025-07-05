
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, UserPlus, Heart, Send, Loader2 } from "lucide-react";
import { useEngagementHistory } from "@/hooks/useEngagementHistory";

const RecentActivity = () => {
  const { history, loading } = useEngagementHistory();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageCircle className="h-4 w-4" />;
      case "connection":
        return <UserPlus className="h-4 w-4" />;
      case "like":
        return <Heart className="h-4 w-4" />;
      case "message":
        return <Send className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "responded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading activity...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recent Activity</h2>

      <Card>
        <CardHeader>
          <CardTitle>Engagement History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.length > 0 ? (
              history.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full">
                    {getActivityIcon(activity.engagement_type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium">
                        {activity.engagement_type.charAt(0).toUpperCase() + activity.engagement_type.slice(1)} 
                        {/* @ts-ignore */}
                        {activity.engagement_targets && ` to ${activity.engagement_targets.name}`}
                      </p>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                    
                    {activity.content && (
                      <p className="text-sm text-muted-foreground mb-2 truncate">
                        {activity.content}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{new Date(activity.created_at).toLocaleString()}</span>
                      {activity.sent_at && (
                        <span>Sent: {new Date(activity.sent_at).toLocaleString()}</span>
                      )}
                      {activity.response_received && (
                        <span className="text-green-600">✓ Response received</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No activity yet</h3>
                <p className="text-muted-foreground">
                  Your engagement activities will appear here once you start interacting with targets.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivity;
