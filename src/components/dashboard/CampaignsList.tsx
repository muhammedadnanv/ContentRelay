
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Pause, Edit, Trash2, Zap, MessageSquare, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CreateCampaignModal from "./CreateCampaignModal";

interface Campaign {
  id: string;
  name: string;
  description: string;
  campaign_type: string;
  status: string;
  daily_limit: number;
  created_at: string;
  settings?: {
    comment_templates?: string[];
    connection_message?: string;
    ai_enabled?: boolean;
  };
}

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Mock data for demo since tables are not ready yet
      const mockCampaigns: Campaign[] = [
        {
          id: '1',
          name: 'AI-Powered Tech Startup Outreach',
          description: 'Automatically engage with tech startup founders and CTOs using AI-generated hyper-relevant comments',
          campaign_type: 'daily_engagement',
          status: 'active',
          daily_limit: 50,
          created_at: new Date().toISOString(),
          settings: {
            comment_templates: [
              'Great insights on {topic}! As someone in the {industry} space, I particularly resonate with your point about {key_point}.',
              'This really speaks to the challenges we face in {industry}. Have you considered {suggestion}?'
            ],
            connection_message: 'Hi {name}, I noticed your work in {company} and would love to connect and share insights about {industry}.',
            ai_enabled: true
          }
        },
        {
          id: '2',
          name: 'Strategic SaaS Leader Connections',
          description: 'Send personalized connection requests to SaaS industry leaders',
          campaign_type: 'connection',
          status: 'active',
          daily_limit: 25,
          created_at: new Date().toISOString(),
          settings: {
            connection_message: 'Hi {name}, I admire your work at {company} in the SaaS space. Would love to connect and exchange insights.',
            ai_enabled: true
          }
        },
        {
          id: '3',
          name: 'AI Comment Engagement',
          description: 'AI writes contextually relevant comments on posts from target audience',
          campaign_type: 'comment',
          status: 'paused',
          daily_limit: 30,
          created_at: new Date().toISOString(),
          settings: {
            comment_templates: [
              'Fascinating perspective on {topic}! This aligns with what we are seeing in {industry}.',
              'Thanks for sharing this {name}. Your point about {key_insight} is particularly valuable.'
            ],
            ai_enabled: true
          }
        }
      ];
      
      setCampaigns(mockCampaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: "Error",
        description: "Failed to load campaigns. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCampaignStatus = async (campaignId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active';
      
      setCampaigns(campaigns.map(c => 
        c.id === campaignId ? { ...c, status: newStatus } : c
      ));

      toast({
        title: "Campaign Updated",
        description: `Campaign ${newStatus === 'active' ? 'activated' : 'paused'} successfully.`,
      });
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to update campaign status.",
        variant: "destructive",
      });
    }
  };

  const deleteCampaign = async (campaignId: string) => {
    try {
      setCampaigns(campaigns.filter(c => c.id !== campaignId));
      toast({
        title: "Campaign Deleted",
        description: "Campaign deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast({
        title: "Error",
        description: "Failed to delete campaign.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCampaignTypeLabel = (type: string) => {
    switch (type) {
      case 'comment': return 'AI Comments';
      case 'connection': return 'Connection Requests';
      case 'daily_engagement': return 'Daily AI Engagement';
      default: return type;
    }
  };

  const getCampaignIcon = (type: string) => {
    switch (type) {
      case 'comment': return MessageSquare;
      case 'connection': return UserPlus;
      case 'daily_engagement': return Zap;
      default: return Zap;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">AI Engagement Campaigns</h2>
          <p className="text-gray-600 text-sm">Automate your LinkedIn engagement with AI-powered campaigns</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create AI Campaign
        </Button>
      </div>

      {campaigns.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">
              No AI campaigns created yet
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Create your first AI-powered LinkedIn engagement campaign to start automating your networking
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First AI Campaign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign) => {
            const Icon = getCampaignIcon(campaign.campaign_type);
            return (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {campaign.name}
                          {campaign.settings?.ai_enabled && (
                            <Badge variant="outline" className="text-xs bg-gradient-to-r from-purple-100 to-indigo-100">
                              AI-Powered
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{campaign.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      <Badge variant="outline">
                        {getCampaignTypeLabel(campaign.campaign_type)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">
                        Daily Limit: {campaign.daily_limit} actions
                      </div>
                      {campaign.settings?.comment_templates && (
                        <div className="text-sm text-gray-500">
                          {campaign.settings.comment_templates.length} AI comment templates
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCampaignStatus(campaign.id, campaign.status)}
                        className={campaign.status === 'active' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                      >
                        {campaign.status === 'active' ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteCampaign(campaign.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <CreateCampaignModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCampaignCreated={fetchCampaigns}
      />
    </div>
  );
};

export default CampaignsList;
