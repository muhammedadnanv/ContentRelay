
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Copy, RefreshCw, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useEngagementTargets } from '@/hooks/useEngagementTargets';
import { useEngagementHistory } from '@/hooks/useEngagementHistory';

const SmartCommentGenerator = () => {
  const [targetPerson, setTargetPerson] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [postContext, setPostContext] = useState('');
  const [commentStyle, setCommentStyle] = useState('professional');
  const [generatedComment, setGeneratedComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { targets, createTarget } = useEngagementTargets();
  const { createEngagement } = useEngagementHistory();

  const commentStyles = [
    { value: 'professional', label: 'Professional & Insightful' },
    { value: 'friendly', label: 'Friendly & Conversational' },
    { value: 'thought-provoking', label: 'Thought-Provoking' },
    { value: 'supportive', label: 'Supportive & Encouraging' },
  ];

  const generateComment = async () => {
    if (!targetPerson || !postContext) {
      toast({
        title: "Missing Information",
        description: "Please provide the target person and post context",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('linkedin-auto-commenter', {
        body: {
          targetPerson,
          targetCompany,
          postContext,
          commentStyle,
          action: 'generate'
        }
      });

      if (error) throw error;

      setGeneratedComment(data.comment);
      toast({
        title: "Comment Generated",
        description: "AI has generated a personalized comment for you",
      });
    } catch (error) {
      console.error('Error generating comment:', error);
      toast({
        title: "Error",
        description: "Failed to generate comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedComment);
    toast({
      title: "Copied",
      description: "Comment copied to clipboard",
    });
  };

  const saveEngagement = async () => {
    if (!generatedComment) return;

    try {
      // Find the target or create a new one
      let target = targets.find(t => 
        t.name.toLowerCase().includes(targetPerson.toLowerCase())
      );

      if (!target) {
        // Create a new target if not found
        const targetData = {
          name: targetPerson,
          company: targetCompany || 'Unknown',
          position: 'Unknown',
          industry: 'Unknown',
          status: 'pending' as const
        };
        
        target = await createTarget(targetData);
      }

      await createEngagement({
        target_id: target?.id || null,
        engagement_type: 'comment',
        content: generatedComment,
        status: 'pending'
      });

      toast({
        title: "Engagement Saved",
        description: "Comment saved to your engagement history",
      });
    } catch (error) {
      console.error('Error saving engagement:', error);
      toast({
        title: "Error",
        description: "Failed to save engagement",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Smart Comment Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target-person">Target Person</Label>
              <Input
                id="target-person"
                placeholder="e.g., John Smith"
                value={targetPerson}
                onChange={(e) => setTargetPerson(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-company">Company (Optional)</Label>
              <Input
                id="target-company"
                placeholder="e.g., Tech Corp"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-context">Post Context</Label>
            <Textarea
              id="post-context"
              placeholder="Describe what the LinkedIn post is about, key points, or paste the post content..."
              value={postContext}
              onChange={(e) => setPostContext(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment-style">Comment Style</Label>
            <Select value={commentStyle} onValueChange={setCommentStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {commentStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={generateComment}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Smart Comment
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedComment && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Comment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-800 leading-relaxed">{generatedComment}</p>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </Button>
              <Button onClick={saveEngagement} variant="outline" className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Save Engagement
              </Button>
              <Button onClick={generateComment} variant="outline">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartCommentGenerator;
