
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, UserPlus, MoreHorizontal, Loader2, ExternalLink } from "lucide-react";
import CreateTargetModal from "./CreateTargetModal";
import { useEngagementTargets } from "@/hooks/useEngagementTargets";
import { useEngagementHistory } from "@/hooks/useEngagementHistory";

const EngagementTargets = () => {
  const { targets, loading, updateTarget } = useEngagementTargets();
  const { createEngagement } = useEngagementHistory();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "connected":
        return "bg-blue-100 text-blue-800";
      case "engaged":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleComment = async (target: any) => {
    try {
      await createEngagement({
        target_id: target.id,
        engagement_type: 'comment',
        status: 'pending',
        content: 'AI-generated comment will be posted'
      });
      
      await updateTarget(target.id, { 
        status: 'engaged',
        last_engagement: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error creating engagement:', error);
    }
  };

  const handleConnect = async (target: any) => {
    try {
      await createEngagement({
        target_id: target.id,
        engagement_type: 'connection',
        status: 'pending',
        content: 'Connection request sent'
      });
      
      await updateTarget(target.id, { 
        status: 'connected',
        last_engagement: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error creating connection:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading targets...</span>
      </div>
    );
  }

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
                    <p className="text-xs text-muted-foreground capitalize">
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
                    <span>{target.engagement_count || 0} engagements</span>
                  </div>
                  {target.last_engagement && (
                    <span>Last: {new Date(target.last_engagement).toLocaleDateString()}</span>
                  )}
                  {target.linkedin_profile_url && (
                    <a 
                      href={target.linkedin_profile_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Profile
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleComment(target)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Comment
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConnect(target)}
                  >
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
