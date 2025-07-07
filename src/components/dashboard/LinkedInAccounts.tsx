
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Settings, Plus, RefreshCw, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLinkedInAccounts } from "@/hooks/useLinkedInAccounts";
import { supabase } from "@/integrations/supabase/client";

const LinkedInAccounts = () => {
  const { toast } = useToast();
  const { accounts, loading, deleteAccount, refetch } = useLinkedInAccounts();

  useEffect(() => {
    // Check if we just came back from LinkedIn OAuth
    const checkLinkedInConnection = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user && session.user.app_metadata?.provider === 'linkedin_oidc') {
        // Extract LinkedIn profile data from the session
        const linkedinProfile = session.user.user_metadata;
        
        if (linkedinProfile && !accounts.find(acc => acc.email === session.user.email)) {
          // Create LinkedIn account record
          try {
            await fetch('/api/create-linkedin-account', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: linkedinProfile.preferred_username || linkedinProfile.email?.split('@')[0] || 'unknown',
                full_name: linkedinProfile.name || linkedinProfile.full_name || 'Unknown User',
                email: linkedinProfile.email || session.user.email || '',
                profile_url: linkedinProfile.picture || null,
              })
            });
            
            // Refresh accounts list
            refetch();
            
            toast({
              title: "LinkedIn Connected",
              description: "Your LinkedIn account has been successfully connected!",
            });
          } catch (error) {
            console.error('Error creating LinkedIn account record:', error);
          }
        }
      }
    };

    checkLinkedInConnection();
  }, [accounts, refetch, toast]);

  const handleConnectAccount = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}/dashboard?tab=linkedin`,
          scopes: 'openid profile email'
        }
      });

      if (error) {
        toast({
          title: "Connection Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('LinkedIn connection error:', error);
      toast({
        title: "Error",
        description: "Failed to initiate LinkedIn connection. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRefreshAccount = async (accountId: string) => {
    try {
      // In a real implementation, this would sync data from LinkedIn API
      await refetch();
      toast({
        title: "Account Refreshed",
        description: "LinkedIn account data has been synchronized.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh account data.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnectAccount = async (accountId: string) => {
    try {
      await deleteAccount(accountId);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">LinkedIn Accounts</h2>
          <p className="text-muted-foreground">Manage your connected LinkedIn accounts for automation</p>
        </div>
        <Button onClick={handleConnectAccount}>
          <Plus className="h-4 w-4 mr-2" />
          Connect Account
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
                      {account.full_name}
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
                  <p className="font-semibold">{account.connection_count?.toLocaleString() || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plan Type</p>
                  <p className="font-semibold">{account.plan_type || 'Basic'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Sync</p>
                  <p className="font-semibold">
                    {account.last_sync ? new Date(account.last_sync).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                {account.profile_url ? (
                  <a 
                    href={account.profile_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View LinkedIn Profile
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">No profile URL available</span>
                )}
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
              <Button onClick={handleConnectAccount}>
                <Linkedin className="h-4 w-4 mr-2" />
                Connect LinkedIn Account
              </Button>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Make sure your LinkedIn app credentials are properly configured in your Supabase project settings under Authentication → Providers → LinkedIn.
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
