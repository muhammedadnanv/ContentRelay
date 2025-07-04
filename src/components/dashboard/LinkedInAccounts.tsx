
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Settings, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LinkedInAccounts = () => {
  const { toast } = useToast();
  const [accounts] = useState([
    {
      id: 1,
      username: "john.doe",
      fullName: "John Doe",
      status: "connected",
      lastSync: "2 hours ago",
    },
  ]);

  const handleConnectAccount = () => {
    toast({
      title: "LinkedIn Connection",
      description: "LinkedIn account connection will be available soon.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">LinkedIn Accounts</h2>
        <Button onClick={handleConnectAccount}>
          <Plus className="h-4 w-4 mr-2" />
          Connect Account
        </Button>
      </div>

      <div className="grid gap-6">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Linkedin className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{account.fullName}</CardTitle>
                    <p className="text-sm text-muted-foreground">@{account.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">
                    {account.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Last synchronized: {account.lastSync}
              </div>
            </CardContent>
          </Card>
        ))}

        {accounts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Linkedin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No LinkedIn accounts connected</h3>
              <p className="text-muted-foreground mb-4">
                Connect your LinkedIn account to start automating your engagement.
              </p>
              <Button onClick={handleConnectAccount}>
                Connect LinkedIn Account
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LinkedInAccounts;
