
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Clock, Target, Settings, Play, Pause } from 'lucide-react';
import { useAutomation } from '@/hooks/useAutomation';
import { useCampaigns } from '@/hooks/useCampaigns';
import CreateAutomationModal from './CreateAutomationModal';

const AutomationSettings = () => {
  const { rules, loading, toggleRule } = useAutomation();
  const { campaigns } = useCampaigns();

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getCampaignName = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign?.name || 'Unknown Campaign';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2">Loading automation settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Automation Settings</h2>
          <p className="text-gray-600">Set up automated LinkedIn engagement rules</p>
        </div>
        <CreateAutomationModal />
      </div>

      <div className="grid gap-6">
        {rules.map((rule) => (
          <Card key={rule.id} className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-purple-600" />
                  <div>
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      Campaign: {getCampaignName(rule.campaign_id)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(rule.is_active)}>
                    {rule.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <Switch
                    checked={rule.is_active}
                    onCheckedChange={(checked) => toggleRule(rule.id, checked)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Daily Comments</p>
                    <p className="font-medium">{rule.daily_comment_limit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Daily Connections</p>
                    <p className="font-medium">{rule.daily_connection_limit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-500">Trigger</p>
                    <p className="font-medium capitalize">{rule.trigger_type}</p>
                  </div>
                </div>
                {rule.schedule_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500">Schedule</p>
                      <p className="font-medium">{rule.schedule_time}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {rule.keywords && rule.keywords.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Keywords:</p>
                  <div className="flex flex-wrap gap-1">
                    {rule.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Auto-like: {rule.auto_like ? '✓' : '✗'}</span>
                  <span>Created: {new Date(rule.created_at).toLocaleDateString()}</span>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {rules.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No automation rules yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first automation rule to start engaging automatically with your target audience.
              </p>
              <CreateAutomationModal />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AutomationSettings;
