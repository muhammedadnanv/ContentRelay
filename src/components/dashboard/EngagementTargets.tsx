
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, UserPlus, MoreHorizontal } from "lucide-react";
import CreateTargetModal from "./CreateTargetModal";

const EngagementTargets = () => {
  const [targets] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechFlow Solutions",
      position: "VP of Marketing",
      industry: "B2B SaaS",
      status: "active",
      lastEngagement: "2 days ago",
      engagementCount: 3,
    },
    {
      id: 2,
      name: "Mike Chen",
      company: "StartupX",
      position: "CEO",
      industry: "Fintech",
      status: "pending",
      lastEngagement: "1 week ago",
      engagementCount: 1,
    },
    {
      id: 3,
      name: "Emma Davis",
      company: "InnovateLab",
      position: "CTO",
      industry: "Healthcare",
      status: "connected",
      lastEngagement: "3 hours ago",
      engagementCount: 7,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "connected":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Engagement Targets</h2>
        <CreateTargetModal />
      </div>

      <div className="grid gap-6">
        {targets.map((target) => (
          <Card key={target.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {target.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{target.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {target.position} at {target.company}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {target.industry}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(target.status)}>
                    {target.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{target.engagementCount} engagements</span>
                  </div>
                  <span>Last: {target.lastEngagement}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Comment
                  </Button>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {targets.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No engagement targets yet</h3>
              <p className="text-muted-foreground mb-4">
                Add LinkedIn profiles you want to engage with automatically.
              </p>
              <CreateTargetModal />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EngagementTargets;
