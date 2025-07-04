
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users } from "lucide-react";

const EngagementTargets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [targets] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      title: "VP of Marketing",
      company: "TechCorp",
      industry: "SaaS",
      status: "active",
      lastEngagement: "2 days ago",
    },
    {
      id: 2,
      name: "Mike Chen",
      title: "Founder & CEO",
      company: "StartupX",
      industry: "Fintech",
      status: "pending",
      lastEngagement: "1 week ago",
    },
    {
      id: 3,
      name: "Emma Davis",
      title: "Head of Growth",
      company: "InnovateLab",
      industry: "AI/ML",
      status: "active",
      lastEngagement: "1 day ago",
    },
  ]);

  const filteredTargets = targets.filter(target =>
    target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    target.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    target.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Engagement Targets</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Target
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="search" className="sr-only">Search targets</Label>
            <Input
              id="search"
              placeholder="Search by name, company, or industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {filteredTargets.map((target) => (
          <Card key={target.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-2">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{target.name}</h3>
                    <p className="text-muted-foreground">{target.title}</p>
                    <p className="text-sm text-muted-foreground">{target.company} • {target.industry}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last engagement: {target.lastEngagement}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={target.status === "active" ? "default" : "secondary"}>
                    {target.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredTargets.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No targets found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search terms." : "Add your first engagement target to get started."}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Target
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EngagementTargets;
