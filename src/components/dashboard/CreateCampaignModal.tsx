
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Bot, MessageSquare, UserPlus, Zap } from "lucide-react";

interface CreateCampaignModalProps {
  open: boolean;
  onClose: () => void;
  onCampaignCreated: () => void;
}

const CreateCampaignModal = ({ open, onClose, onCampaignCreated }: CreateCampaignModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    campaign_type: '',
    daily_limit: 50,
    comment_templates: [''],
    connection_message: '',
    ai_enabled: true,
    target_keywords: [''],
    personalization_level: 'high'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.campaign_type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const settings = {
        comment_templates: formData.comment_templates.filter(t => t.trim()),
        connection_message: formData.connection_message,
        ai_enabled: formData.ai_enabled,
        target_keywords: formData.target_keywords.filter(k => k.trim()),
        personalization_level: formData.personalization_level
      };

      // Mock creation for demo
      toast({
        title: "AI Campaign Created",
        description: "Your AI-powered LinkedIn engagement campaign has been created successfully.",
      });

      onCampaignCreated();
      onClose();
      setFormData({
        name: '',
        description: '',
        campaign_type: '',
        daily_limit: 50,
        comment_templates: [''],
        connection_message: '',
        ai_enabled: true,
        target_keywords: [''],
        personalization_level: 'high'
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addCommentTemplate = () => {
    setFormData({
      ...formData,
      comment_templates: [...formData.comment_templates, '']
    });
  };

  const updateCommentTemplate = (index: number, value: string) => {
    const templates = [...formData.comment_templates];
    templates[index] = value;
    setFormData({ ...formData, comment_templates: templates });
  };

  const removeCommentTemplate = (index: number) => {
    const templates = formData.comment_templates.filter((_, i) => i !== index);
    setFormData({ ...formData, comment_templates: templates });
  };

  const addKeyword = () => {
    setFormData({
      ...formData,
      target_keywords: [...formData.target_keywords, '']
    });
  };

  const updateKeyword = (index: number, value: string) => {
    const keywords = [...formData.target_keywords];
    keywords[index] = value;
    setFormData({ ...formData, target_keywords: keywords });
  };

  const removeKeyword = (index: number) => {
    const keywords = formData.target_keywords.filter((_, i) => i !== index);
    setFormData({ ...formData, target_keywords: keywords });
  };

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case 'comment': return MessageSquare;
      case 'connection': return UserPlus;
      case 'daily_engagement': return Zap;
      default: return Bot;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-600" />
            Create AI-Powered Campaign
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., AI Tech Startup Outreach"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign_type">Campaign Type *</Label>
              <Select
                value={formData.campaign_type}
                onValueChange={(value) => setFormData({ ...formData, campaign_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comment">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      AI Comments
                    </div>
                  </SelectItem>
                  <SelectItem value="connection">
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Connection Requests
                    </div>
                  </SelectItem>
                  <SelectItem value="daily_engagement">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Daily AI Engagement
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your AI campaign goals and target audience"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="daily_limit">Daily Action Limit</Label>
              <Input
                id="daily_limit"
                type="number"
                value={formData.daily_limit}
                onChange={(e) => setFormData({ ...formData, daily_limit: parseInt(e.target.value) || 0 })}
                min="1"
                max="200"
              />
              <p className="text-xs text-gray-500">Recommended: 20-50 actions per day</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="personalization_level">AI Personalization Level</Label>
              <Select
                value={formData.personalization_level}
                onValueChange={(value) => setFormData({ ...formData, personalization_level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High - Deep profile analysis</SelectItem>
                  <SelectItem value="medium">Medium - Basic personalization</SelectItem>
                  <SelectItem value="low">Low - Template-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="ai_enabled"
              checked={formData.ai_enabled}
              onCheckedChange={(checked) => setFormData({ ...formData, ai_enabled: checked })}
            />
            <Label htmlFor="ai_enabled" className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-purple-600" />
              Enable AI-Powered Content Generation
            </Label>
          </div>

          {formData.ai_enabled && (
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-2">AI Features Enabled:</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Hyper-relevant comment generation based on post content</li>
                <li>• Personalized connection requests using profile analysis</li>
                <li>• Context-aware engagement optimization</li>
                <li>• Industry-specific language and tone adaptation</li>
              </ul>
            </div>
          )}

          {(formData.campaign_type === 'comment' || formData.campaign_type === 'daily_engagement') && (
            <div className="space-y-2">
              <Label>AI Comment Templates</Label>
              <p className="text-sm text-gray-600">
                These templates will be enhanced by AI with specific details from each post and profile
              </p>
              {formData.comment_templates.map((template, index) => (
                <div key={index} className="flex space-x-2">
                  <Textarea
                    value={template}
                    onChange={(e) => updateCommentTemplate(index, e.target.value)}
                    placeholder="Great insights on {topic}! As someone in the {industry} space, I particularly resonate with your point about {key_point}."
                    className="flex-1"
                    rows={2}
                  />
                  {formData.comment_templates.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeCommentTemplate(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addCommentTemplate}>
                Add Template
              </Button>
            </div>
          )}

          {(formData.campaign_type === 'connection' || formData.campaign_type === 'daily_engagement') && (
            <div className="space-y-2">
              <Label htmlFor="connection_message">AI Connection Message Template</Label>
              <Textarea
                id="connection_message"
                value={formData.connection_message}
                onChange={(e) => setFormData({ ...formData, connection_message: e.target.value })}
                placeholder="Hi {name}, I noticed your work at {company} and would love to connect and share insights about {industry}."
                rows={3}
              />
              <p className="text-sm text-gray-600">
                AI will automatically fill in {`{name}`}, {`{company}`}, {`{industry}`} and other relevant details
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label>Target Keywords (Optional)</Label>
            <p className="text-sm text-gray-600">
              Keywords to help AI identify relevant posts and profiles
            </p>
            {formData.target_keywords.map((keyword, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  value={keyword}
                  onChange={(e) => updateKeyword(index, e.target.value)}
                  placeholder="e.g., startup, SaaS, AI, fintech"
                  className="flex-1"
                />
                {formData.target_keywords.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeKeyword(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addKeyword}>
              Add Keyword
            </Button>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              {loading ? 'Creating...' : 'Create AI Campaign'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;
