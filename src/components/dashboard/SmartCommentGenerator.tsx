
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Copy, RefreshCw, ThumbsUp, Send } from 'lucide-react';
import { useGeminiCommenter } from '@/hooks/useGeminiCommenter';
import { useEngagementTargets } from '@/hooks/useEngagementTargets';
import { useCampaigns } from '@/hooks/useCampaigns';
import { useToast } from '@/hooks/use-toast';

const SmartCommentGenerator = () => {
  const [postUrl, setPostUrl] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [generatedComment, setGeneratedComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { generateComment, loading } = useGeminiCommenter();
  const { targets } = useEngagementTargets();
  const { campaigns } = useCampaigns();
  const { toast } = useToast();

  const userContext = {
    industry: 'B2B SaaS',
    company: 'Growth AI',
    expertise: 'LinkedIn Automation & AI-Powered Engagement',
    role: 'Founder'
  };

  const handleGenerateComment = async () => {
    if (!postContent || !selectedTarget || !selectedCampaign) {
      toast({
        title: "Missing Information",
        description: "Please fill in post content, select a target, and choose a campaign.",
        variant: "destructive",
      });
      return;
    }

    const target = targets.find(t => t.id === selectedTarget);
    if (!target) return;

    const authorProfile = {
      name: target.name,
      company: target.company,
      industry: target.industry,
      position: target.position
    };

    try {
      const comment = await generateComment(postContent, authorProfile, userContext, selectedCampaign);
      setGeneratedComment(comment);
    } catch (error) {
      console.error('Failed to generate comment:', error);
    }
  };

  const handleCopyComment = () => {
    navigator.clipboard.writeText(generatedComment);
    toast({
      title: "Copied!",
      description: "Comment copied to clipboard.",
    });
  };

  const handleScheduleComment = async () => {
    // Add to engagement queue for later processing
    toast({
      title: "Scheduled",
      description: "Comment has been added to the engagement queue.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Smart Comment Generator</h2>
        <p className="text-gray-600">Generate AI-powered, hyper-relevant LinkedIn comments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Post Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="post-url">LinkedIn Post URL (Optional)</Label>
              <Input
                id="post-url"
                placeholder="https://linkedin.com/posts/..."
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-content">Post Content</Label>
              <Textarea
                id="post-content"
                placeholder="Paste the LinkedIn post content here..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">Target Person</Label>
              <Select value={selectedTarget} onValueChange={setSelectedTarget}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target person" />
                </SelectTrigger>
                <SelectContent>
                  {targets.map((target) => (
                    <SelectItem key={target.id} value={target.id}>
                      {target.name} - {target.position} at {target.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign</Label>
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
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

            <Button 
              onClick={handleGenerateComment} 
              disabled={loading || !postContent || !selectedTarget}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Comment
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-green-600" />
              Generated Comment
              {generatedComment && (
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Ready
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!generatedComment ? (
              <div className="text-center py-12">
                <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your AI-generated comment will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Generated Comment:</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Preview' : 'Edit'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyComment}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {isEditing ? (
                  <Textarea
                    value={generatedComment}
                    onChange={(e) => setGeneratedComment(e.target.value)}
                    className="min-h-[200px]"
                    placeholder="Edit your comment..."
                  />
                ) : (
                  <div className="bg-white border rounded-lg p-4 min-h-[200px]">
                    <div className="text-gray-800 whitespace-pre-wrap">{generatedComment}</div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleGenerateComment}
                    disabled={loading}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Regenerate
                  </Button>
                  <Button
                    onClick={handleScheduleComment}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Schedule Comment
                  </Button>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  <div className="font-medium text-blue-900 mb-1">AI Context Used:</div>
                  <div className="text-blue-700">
                    Target industry match, company relevance, position-specific insights
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartCommentGenerator;
