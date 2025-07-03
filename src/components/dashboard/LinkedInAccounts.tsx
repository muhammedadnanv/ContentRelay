
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Plus, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkedInAccount {
  id: string;
  linkedin_id: string;
  profile_data: any;
  is_active: boolean;
  created_at: string;
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

      const { data, error } = await supabase
        .from('linkedin_accounts' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.log('LinkedIn accounts table not ready yet');
      }
      setAccounts(data || []);
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
      description: "LinkedIn connection feature will be implemented in the next phase.",
    });
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
        <h2 className="text-xl font-semibold">LinkedIn Accounts</h2>
        <Button onClick={connectLinkedIn}>
          <Plus className="h-4 w-4 mr-2" />
          Connect LinkedIn
        </Button>
      </div>

      {accounts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Linkedin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">
              No LinkedIn accounts connected
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Connect your LinkedIn account to start automating your engagement
            </p>
            <Button onClick={connectLinkedIn}>
              <Linkedin className="h-4 w-4 mr-2" />
              Connect LinkedIn Account
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {accounts.map((account) => (
            <Card key={account.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Linkedin className="h-8 w-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">
                        {account.profile_data?.name || 'LinkedIn Account'}
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        {account.profile_data?.headline || 'Professional'}
                      </p>
                    </div>
                  </div>
                  <Badge className={account.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {account.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Connected on {new Date(account.created_at).toLocaleDateString()}
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Token
                  </Button>
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
