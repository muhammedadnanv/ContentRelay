
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Zap, MessageSquare } from 'lucide-react';
import CommentPreview from './CommentPreview';

const AutoCommenterDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [demoData, setDemoData] = useState({
    postContent: '',
    authorName: '',
    authorCompany: '',
    authorIndustry: '',
    authorPosition: '',
    userIndustry: '',
    userCompany: '',
    userExpertise: '',
    userRole: ''
  });

  const mockPostContent = `🚀 Excited to share that our AI-powered customer service platform just reduced response times by 78% for our enterprise clients! 

The key was implementing contextual understanding that goes beyond keyword matching. Our system now grasps customer intent, emotional tone, and urgency levels to provide truly personalized responses.

What's your experience with AI in customer service? Are you seeing similar improvements in your industry?

#AI #CustomerService #Innovation #TechLeadership`;

  const mockData = {
    postContent: mockPostContent,
    authorName: 'Sarah Chen',
    authorCompany: 'TechForward Solutions',
    authorIndustry: 'Software Technology',
    authorPosition: 'VP of Product',
    userIndustry: 'SaaS',
    userCompany: 'Growth Analytics Co',
    userExpertise: 'Customer Success, AI Implementation',
    userRole: 'Head of Customer Success'
  };

  const handleTryDemo = () => {
    setDemoData(mockData);
    setShowDemo(true);
  };

  const handleCustomDemo = () => {
    if (demoData.postContent && demoData.authorName) {
      setShowDemo(true);
    }
  };

  if (showDemo) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setShowDemo(false)}
          >
            ← Back to Setup
          </Button>
        </div>
        <CommentPreview
          postContent={demoData.postContent}
          authorProfile={{
            name: demoData.authorName,
            company: demoData.authorCompany,
            industry: demoData.authorIndustry,
            position: demoData.authorPosition
          }}
          userContext={{
            industry: demoData.userIndustry,
            company: demoData.userCompany,
            expertise: demoData.userExpertise,
            role: demoData.userRole
          }}
          campaignId="demo-campaign"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-purple-600" />
            AI Auto-Commenter Demo
          </CardTitle>
          <p className="text-gray-600">
            Experience how our AI generates hyper-relevant LinkedIn comments using Google's Gemini API
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-medium">Context Analysis</div>
              <div className="text-sm text-gray-600">Understands post content & author profile</div>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <Zap className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <div className="font-medium">Hyper-Relevant</div>
              <div className="text-sm text-gray-600">Generates industry-specific insights</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Bot className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-medium">AI-Powered</div>
              <div className="text-sm text-gray-600">Uses Google Gemini for intelligence</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleTryDemo}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Try Quick Demo
            </Button>
            <Button variant="outline">
              Setup Custom Demo
            </Button>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Custom Demo Setup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input
                    id="authorName"
                    value={demoData.authorName}
                    onChange={(e) => setDemoData({...demoData, authorName: e.target.value})}
                    placeholder="e.g., Sarah Chen"
                  />
                </div>
                <div>
                  <Label htmlFor="authorCompany">Author Company</Label>
                  <Input
                    id="authorCompany"
                    value={demoData.authorCompany}
                    onChange={(e) => setDemoData({...demoData, authorCompany: e.target.value})}
                    placeholder="e.g., TechForward Solutions"
                  />
                </div>
                <div>
                  <Label htmlFor="authorIndustry">Author Industry</Label>
                  <Input
                    id="authorIndustry"
                    value={demoData.authorIndustry}
                    onChange={(e) => setDemoData({...demoData, authorIndustry: e.target.value})}
                    placeholder="e.g., Software Technology"
                  />
                </div>
                <div>
                  <Label htmlFor="authorPosition">Author Position</Label>
                  <Input
                    id="authorPosition"
                    value={demoData.authorPosition}
                    onChange={(e) => setDemoData({...demoData, authorPosition: e.target.value})}
                    placeholder="e.g., VP of Product"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="userIndustry">Your Industry</Label>
                  <Input
                    id="userIndustry"
                    value={demoData.userIndustry}
                    onChange={(e) => setDemoData({...demoData, userIndustry: e.target.value})}
                    placeholder="e.g., SaaS"
                  />
                </div>
                <div>
                  <Label htmlFor="userCompany">Your Company</Label>
                  <Input
                    id="userCompany"
                    value={demoData.userCompany}
                    onChange={(e) => setDemoData({...demoData, userCompany: e.target.value})}
                    placeholder="e.g., Growth Analytics Co"
                  />
                </div>
                <div>
                  <Label htmlFor="userRole">Your Role</Label>
                  <Input
                    id="userRole"
                    value={demoData.userRole}
                    onChange={(e) => setDemoData({...demoData, userRole: e.target.value})}
                    placeholder="e.g., Head of Customer Success"
                  />
                </div>
                <div>
                  <Label htmlFor="userExpertise">Your Expertise</Label>
                  <Input
                    id="userExpertise"
                    value={demoData.userExpertise}
                    onChange={(e) => setDemoData({...demoData, userExpertise: e.target.value})}
                    placeholder="e.g., Customer Success, AI Implementation"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="postContent">LinkedIn Post Content</Label>
              <Textarea
                id="postContent"
                value={demoData.postContent}
                onChange={(e) => setDemoData({...demoData, postContent: e.target.value})}
                placeholder="Paste the LinkedIn post content here..."
                rows={4}
              />
            </div>
            <div className="mt-4">
              <Button
                onClick={handleCustomDemo}
                disabled={!demoData.postContent || !demoData.authorName}
                className="w-full"
              >
                Generate Custom Demo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoCommenterDemo;
