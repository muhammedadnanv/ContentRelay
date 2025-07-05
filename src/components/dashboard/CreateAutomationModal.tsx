
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Plus } from 'lucide-react';
import { useAutomation } from '@/hooks/useAutomation';
import { useCampaigns } from '@/hooks/useCampaigns';

const CreateAutomationModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [triggerType, setTriggerType] = useState<'schedule' | 'keyword' | 'manual'>('schedule');
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [keywords, setKeywords] = useState('');
  const [dailyCommentLimit, setDailyCommentLimit] = useState(10);
  const [dailyConnectionLimit, setDailyConnectionLimit] = useState(5);
  const [autoLike, setAutoLike] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const { createRule } = useAutomation();
  const { campaigns } = useCampaigns();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
      
      await createRule({
        name,
        campaign_id: campaignId,
        trigger_type: triggerType,
        schedule_time: triggerType === 'schedule' ? scheduleTime : undefined,
        keywords: triggerType === 'keyword' ? keywordArray : undefined,
        is_active: true,
        daily_comment_limit: dailyCommentLimit,
        daily_connection_limit: dailyConnectionLimit,
        auto_like: autoLike
      });
      
      // Reset form
      setName('');
      setCampaignId('');
      setTriggerType('schedule');
      setScheduleTime('09:00');
      setKeywords('');
      setDailyCommentLimit(10);
      setDailyConnectionLimit(5);
      setAutoLike(true);
      setOpen(false);
    } catch (error) {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Automation Rule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-600" />
            Create Automation Rule
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input
              id="rule-name"
              placeholder="e.g., Morning SaaS Founders Engagement"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="campaign">Campaign</Label>
            <Select value={campaignId} onValueChange={setCampaignId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select campaign" />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trigger-type">Trigger Type</Label>
            <Select value={triggerType} onValueChange={setTriggerType as any}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="schedule">Schedule</SelectItem>
                <SelectItem value="keyword">Keyword</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {triggerType === 'schedule' && (
            <div className="space-y-2">
              <Label htmlFor="schedule-time">Schedule Time</Label>
              <Input
                id="schedule-time"
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>
          )}
          
          {triggerType === 'keyword' && (
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Textarea
                id="keywords"
                placeholder="e.g., SaaS, startup, entrepreneur, funding"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                rows={3}
              />
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="comment-limit">Daily Comments</Label>
              <Input
                id="comment-limit"
                type="number"
                min="1"
                max="50"
                value={dailyCommentLimit}
                onChange={(e) => setDailyCommentLimit(parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="connection-limit">Daily Connections</Label>
              <Input
                id="connection-limit"
                type="number"
                min="1"
                max="20"
                value={dailyConnectionLimit}
                onChange={(e) => setDailyConnectionLimit(parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-like">Auto-like posts</Label>
            <Switch
              id="auto-like"
              checked={autoLike}
              onCheckedChange={setAutoLike}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Rule'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAutomationModal;
