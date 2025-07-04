
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Settings, MoreHorizontal } from "lucide-react";
import CreateCampaignModal from "./CreateCampaignModal";
import { useToast } from "@/hooks/use-toast";

const CampaignsList = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "B2B SaaS Founders",
      status: "active",
      targets: 45,
      comments: 23,
      connections: 12,
      responseRate: 78,
      industry: "SaaS",
    },
    {
      id: 2,
      name: "Marketing Directors",
      status: "paused",
      targets: 32,
      comments: 18,
      connections: 8,
      responseRate: 65,
      industry: "Marketing",
    },
    {
      id: 3,
      name: "Tech Entrepreneurs",
      status: "active",
      targets: 67,
      comments: 34,
      connections: 21,
      responseRate: 82,
      industry: "Technology",
    },
  ]);

  const toggleCampaignStatus = (id: number) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id 
        ? { ...campaign, status: campaign.status === "active" ? "paused" : "active" }
        : campaign
    ));
    
    const campaign = campaigns.find(camp => camp.id === id);
    const newStatus = campaign?.status === "active" ? "paused" : "active";
    
    toast({
      title: `Campaign ${newStatus === "active" ? "Resumed" : "Paused"}`,
      description: `${campaign?.name} has been ${newStatus === "active" ? "resumed" : "paused"}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Campaigns</h2>
        <CreateCampaignModal />
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <Badge
                    variant={campaign.status === "active" ? "default" : "secondary"}
                  >
                    {campaign.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCampaignStatus(campaign.id)}
                    className={campaign.status === "active" ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"}
                  >
                    {campaign.status === "active" ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Targets</p>
                  <p className="font-medium text-lg">{campaign.targets}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Comments</p>
                  <p className="font-medium text-lg">{campaign.comments}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Connections</p>
                  <p className="font-medium text-lg">{campaign.connections}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Response Rate</p>
                  <p className="font-medium text-lg">{campaign.responseRate}%</p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Industry: {campaign.industry}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {campaigns.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No campaigns yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first LinkedIn engagement campaign to get started.
              </p>
              <CreateCampaignModal />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CampaignsList;
