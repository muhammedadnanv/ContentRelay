
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const settings = {
        comment_templates: formData.comment_templates.filter(t => t.trim()),
        connection_message: formData.connection_message,
      };

      const { error } = await supabase
        .from('engagement_campaigns' as any)
        .insert({
          user_id: user.id,
          name: formData.name,
          description: formData.description,
          campaign_type: formData.campaign_type,
          daily_limit: formData.daily_limit,
          settings: settings,
          status: 'draft',
        });

      if (error) throw error;

      toast({
        title: "Campaign Created",
        description: "Your campaign has been created successfully.",
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter campaign name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your campaign goals"
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
                <SelectItem value="comment">AI Comments</SelectItem>
                <SelectItem value="connection">Connection Requests</SelectItem>
                <SelectItem value="daily_engagement">Daily Engagement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="daily_limit">Daily Limit</Label>
            <Input
              id="daily_limit"
              type="number"
              value={formData.daily_limit}
              onChange={(e) => setFormData({ ...formData, daily_limit: parseInt(e.target.value) })}
              min="1"
              max="200"
            />
          </div>

          {(formData.campaign_type === 'comment' || formData.campaign_type === 'daily_engagement') && (
            <div className="space-y-2">
              <Label>Comment Templates</Label>
              {formData.comment_templates.map((template, index) => (
                <div key={index} className="flex space-x-2">
                  <Textarea
                    value={template}
                    onChange={(e) => updateCommentTemplate(index, e.target.value)}
                    placeholder="Enter comment template..."
                    className="flex-1"
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
              <Label htmlFor="connection_message">Connection Message</Label>
              <Textarea
                id="connection_message"
                value={formData.connection_message}
                onChange={(e) => setFormData({ ...formData, connection_message: e.target.value })}
                placeholder="Enter personalized connection message..."
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;
