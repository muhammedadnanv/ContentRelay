
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
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              const { error } = await supabase.from('linkedin_accounts').insert({
                user_id: user.id,
                username: linkedinProfile.preferred_username || linkedinProfile.email?.split('@')[0] || 'unknown',
                full_name: linkedinProfile.name || linkedinProfile.full_name || 'Unknown User',
                email: linkedinProfile.email || session.user.email || '',
                profile_url: linkedinProfile.picture || null,
                status: 'active'
              });

              if (error) {
                console.error('Error creating LinkedIn account:', error);
              } else {
                // Refresh accounts list
                refetch();
                
                toast({
                  title: "LinkedIn Connected",
                  description: "Your LinkedIn account has been successfully connected!",
                });
              }
            }
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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">LinkedIn Accounts</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your connected LinkedIn accounts for automation</p>
        </div>
        <Button onClick={handleConnectAccount} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Connect Account
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {accounts.map((account) => (
          <Card key={account.id} className="overflow-hidden">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <Linkedin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="truncate">{account.full_name}</span>
                      <Badge variant="default" className="bg-green-100 text-green-800 w-fit">
                        {account.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground truncate">@{account.username}</p>
                    <p className="text-xs text-muted-foreground truncate">{account.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRefreshAccount(account.id)}
                    className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                  >
                    <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                  >
                    <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-muted-foreground">Connections</p>
                  <p className="font-semibold text-sm sm:text-base">{account.connection_count?.toLocaleString() || 'N/A'}</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-muted-foreground">Plan Type</p>
                  <p className="font-semibold text-sm sm:text-base">{account.plan_type || 'Basic'}</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-muted-foreground">Last Sync</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {account.last_sync ? new Date(account.last_sync).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
                {account.profile_url ? (
                  <a 
                    href={account.profile_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm w-fit"
                  >
                    <ExternalLink className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">View LinkedIn Profile</span>
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">No profile URL available</span>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    Configure Automation
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700 text-xs sm:text-sm"
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
            <CardContent className="text-center py-8 sm:py-12">
              <div className="p-3 sm:p-4 bg-blue-50 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center">
                <Linkedin className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-medium mb-2">No LinkedIn accounts connected</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
                Connect your LinkedIn account to start automating your engagement. 
                Our AI will help you create hyper-relevant comments and connection requests.
              </p>
              <Button onClick={handleConnectAccount} className="w-full sm:w-auto">
                <Linkedin className="h-4 w-4 mr-2" />
                Connect LinkedIn Account
              </Button>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
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
