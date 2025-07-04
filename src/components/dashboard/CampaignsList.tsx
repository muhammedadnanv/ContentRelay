
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Pause, Settings } from "lucide-react";

const CampaignsList = () => {
  const [campaigns] = useState([
    {
      id: 1,
      name: "B2B SaaS Founders",
      status: "active",
      targets: 45,
      comments: 23,
      connections: 12,
    },
    {
      id: 2,
      name: "Marketing Directors",
      status: "paused",
      targets: 32,
      comments: 18,
      connections: 8,
    },
    {
      id: 3,
      name: "Tech Entrepreneurs",
      status: "active",
      targets: 67,
      comments: 34,
      connections: 21,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Campaigns</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={campaign.status === "active" ? "default" : "secondary"}
                  >
                    {campaign.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={campaign.status === "active" ? "text-orange-600" : "text-green-600"}
                  >
                    {campaign.status === "active" ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Targets</p>
                  <p className="font-medium">{campaign.targets}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Comments</p>
                  <p className="font-medium">{campaign.comments}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Connections</p>
                  <p className="font-medium">{campaign.connections}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignsList;
