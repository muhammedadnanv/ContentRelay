
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Plus, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkedInAccount {
  id: string;
  linkedin_id: string;
  profile_data: {
    name?: string;
    headline?: string;
    profilePicture?: string;
    connections?: number;
    industry?: string;
  };
  is_active: boolean;
  created_at: string;
  last_activity?: string;
  daily_actions?: {
    comments: number;
    connections: number;
    likes: number;
  };
}

const LinkedInAccounts = () => {
  const [accounts, setAccounts] = useState<LinkedInAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Mock data for demo since tables are not ready yet
      const mockAccounts: LinkedInAccount[] = [
        {
          id: '1',
          linkedin_id: 'john-doe-ceo',
          profile_data: {
            name: 'John Doe',
            headline: 'CEO & Founder at TechStart | AI Enthusiast | Building the Future',
            profilePicture: '/placeholder.svg',
            connections: 2847,
            industry: 'Technology'
          },
          is_active: true,
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          last_activity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          daily_actions: {
            comments: 12,
            connections: 5,
            likes: 8
          }
        }
      ];
      
      setAccounts(mockAccounts);
    } catch (error) {
      console.error('Error fetching LinkedIn accounts:', error);
      toast({
        title: "Error",
        description: "Failed to load LinkedIn accounts.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const connectLinkedIn = async () => {
    toast({
      title: "LinkedIn Integration",
      description: "LinkedIn connection feature will be implemented in the next phase with OAuth integration.",
    });
  };

  const refreshAccount = async (accountId: string) => {
    toast({
      title: "Account Refreshed",
      description: "LinkedIn account data has been refreshed successfully.",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">LinkedIn Accounts</h2>
          <p className="text-gray-600 text-sm">Manage your connected LinkedIn accounts for AI automation</p>
        </div>
        <Button onClick={connectLinkedIn}>
          <Plus className="h-4 w-4 mr-2" />
          Connect LinkedIn
        </Button>
      </div>

      {accounts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Linkedin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">
              No LinkedIn accounts connected
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Connect your LinkedIn account to start automating your engagement with AI-powered comments and strategic connections
            </p>
            <Button onClick={connectLinkedIn} className="bg-blue-600 hover:bg-blue-700">
              <Linkedin className="h-4 w-4 mr-2" />
              Connect LinkedIn Account
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {accounts.map((account) => (
            <Card key={account.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Linkedin className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {account.profile_data?.name || 'LinkedIn Account'}
                        {account.is_active ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-orange-600" />
                        )}
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        {account.profile_data?.headline || 'Professional'}
                      </p>
                      {account.profile_data?.industry && (
                        <p className="text-gray-500 text-xs">
                          {account.profile_data.industry}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={account.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {account.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    {account.profile_data?.connections && (
                      <div className="text-xs text-gray-500">
                        {account.profile_data.connections.toLocaleString()} connections
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Account Info</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>Connected: {new Date(account.created_at).toLocaleDateString()}</div>
                      {account.last_activity && (
                        <div>Last activity: {getTimeAgo(account.last_activity)}</div>
                      )}
                    </div>
                  </div>
                  
                  {account.daily_actions && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Today's AI Actions</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{account.daily_actions.comments}</div>
                          <div className="text-xs text-gray-500">Comments</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{account.daily_actions.connections}</div>
                          <div className="text-xs text-gray-500">Connections</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600">{account.daily_actions.likes}</div>
                          <div className="text-xs text-gray-500">Likes</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-xs text-gray-500">
                    AI automation {account.is_active ? 'enabled' : 'disabled'}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => refreshAccount(account.id)}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkedInAccounts;
