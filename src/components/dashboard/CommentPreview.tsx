
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bot, Copy, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { useGeminiCommenter } from '@/hooks/useGeminiCommenter';
import { useToast } from '@/hooks/use-toast';

interface CommentPreviewProps {
  postContent: string;
  authorProfile: {
    name: string;
    company: string;
    industry: string;
    position: string;
  };
  userContext: {
    industry: string;
    company: string;
    expertise: string;
    role: string;
  };
  campaignId: string;
}

const CommentPreview = ({ postContent, authorProfile, userContext, campaignId }: CommentPreviewProps) => {
  const [generatedComment, setGeneratedComment] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const { generateComment, loading } = useGeminiCommenter();
  const { toast } = useToast();

  const handleGenerateComment = async () => {
    try {
      const comment = await generateComment(postContent, authorProfile, userContext, campaignId);
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

  const handleApprove = () => {
    toast({
      title: "Comment Approved",
      description: "Comment has been queued for posting.",
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-purple-600" />
          AI Comment Generator
          <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-indigo-100">
            Gemini Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-2">Original Post</h4>
          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <div className="font-medium text-gray-900">{authorProfile.name}</div>
            <div className="text-gray-600 text-xs mb-2">{authorProfile.position} at {authorProfile.company}</div>
            <div className="text-gray-800">{postContent}</div>
          </div>
        </div>

        {!generatedComment ? (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Ready to generate a hyper-relevant comment?</p>
            <Button 
              onClick={handleGenerateComment} 
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {loading ? 'Generating...' : 'Generate AI Comment'}
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-700">Generated Comment</h4>
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
                className="min-h-[120px]"
                placeholder="Edit your comment..."
              />
            ) : (
              <div className="bg-white border rounded-lg p-4">
                <div className="text-gray-800 whitespace-pre-wrap">{generatedComment}</div>
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateComment}
                  disabled={loading}
                >
                  Regenerate
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={handleApprove}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Approve & Post
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-3 rounded-lg text-xs">
          <div className="font-medium text-blue-900 mb-1">Context Used:</div>
          <div className="text-blue-700">
            Your Industry: {userContext.industry} | Your Company: {userContext.company} | Target: {authorProfile.industry}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentPreview;
