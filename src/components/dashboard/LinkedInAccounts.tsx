
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Settings, Plus, RefreshCw, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LinkedInAccounts = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      username: "john.doe",
      fullName: "John Doe",
      email: "john.doe@company.com",
      status: "connected",
      lastSync: "2 hours ago",
      profileUrl: "https://linkedin.com/in/john.doe",
      connectionCount: 1247,
      planType: "Premium",
    },
  ]);

  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectAccount = async () => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      toast({
        title: "LinkedIn Connection",
        description: "LinkedIn OAuth integration will be available soon. This will allow you to connect your LinkedIn account for automated engagement.",
      });
      setIsConnecting(false);
    }, 2000);
  };

  const handleRefreshAccount = (accountId: number) => {
    toast({
      title: "Account Refreshed",
      description: "LinkedIn account data has been synchronized.",
    });
  };

  const handleDisconnectAccount = (accountId: number) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
    toast({
      title: "Account Disconnected",
      description: "LinkedIn account has been removed from your automation.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">LinkedIn Accounts</h2>
          <p className="text-muted-foreground">Manage your connected LinkedIn accounts for automation</p>
        </div>
        <Button onClick={handleConnectAccount} disabled={isConnecting}>
          {isConnecting ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          {isConnecting ? "Connecting..." : "Connect Account"}
        </Button>
      </div>

      <div className="grid gap-6">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Linkedin className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {account.fullName}
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {account.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">@{account.username}</p>
                    <p className="text-xs text-muted-foreground">{account.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRefreshAccount(account.id)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Connections</p>
                  <p className="font-semibold">{account.connectionCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plan Type</p>
                  <p className="font-semibold">{account.planType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Sync</p>
                  <p className="font-semibold">{account.lastSync}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <a 
                  href={account.profileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  View LinkedIn Profile
                </a>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Configure Automation
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDisconnectAccount(account.id)}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {accounts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="p-4 bg-blue-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Linkedin className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">No LinkedIn accounts connected</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Connect your LinkedIn account to start automating your engagement. 
                Our AI will help you create hyper-relevant comments and connection requests.
              </p>
              <Button onClick={handleConnectAccount} disabled={isConnecting}>
                {isConnecting ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Linkedin className="h-4 w-4 mr-2" />
                )}
                {isConnecting ? "Connecting..." : "Connect LinkedIn Account"}
              </Button>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> LinkedIn OAuth integration is in development. 
                  This will enable secure connection to your LinkedIn account for automated engagement.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LinkedInAccounts;
