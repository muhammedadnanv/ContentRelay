
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, UserPlus, Heart } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "comment",
      user: "Sarah Johnson",
      company: "TechCorp",
      content: "Great insight on AI automation! Really resonates with our experience.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "connection",
      user: "Mike Chen",
      company: "StartupX",
      content: "Connected successfully",
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      type: "like",
      user: "Emma Davis",
      company: "InnovateLab",
      content: "Liked your comment on marketing automation",
      timestamp: "6 hours ago",
    },
    {
      id: 4,
      type: "comment",
      user: "Alex Rodriguez",
      company: "GrowthCo",
      content: "Your approach to B2B engagement is spot on. Would love to discuss further.",
      timestamp: "8 hours ago",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-600" />;
      case "connection":
        return <UserPlus className="h-4 w-4 text-green-600" />;
      case "like":
        return <Heart className="h-4 w-4 text-red-600" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                {getIcon(activity.type)}
                <span className="font-medium text-sm">{activity.user}</span>
                <span className="text-xs text-muted-foreground">at {activity.company}</span>
              </div>
              <p className="text-sm text-gray-600">{activity.content}</p>
              <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
