
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Bot, User, Building2 } from 'lucide-react';
import CommentPreview from './CommentPreview';

const AutoCommenterDemo = () => {
  const [postContent, setPostContent] = useState('');
  const [authorProfile, setAuthorProfile] = useState({
    name: '',
    company: '',
    industry: '',
    position: ''
  });
  const [userContext, setUserContext] = useState({
    industry: '',
    company: '',
    expertise: '',
    role: ''
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleDemo = () => {
    // Set demo data
    setPostContent(`Just had an incredible breakthrough with our AI automation platform! 🚀 

After months of development, we've finally cracked the code on hyper-personalized outreach that actually converts. Our latest feature analyzes LinkedIn profiles in real-time and generates contextually relevant messages that feel genuinely human.

The results? 340% increase in response rates and 89% acceptance rate on connection requests. 

The key insight: Generic outreach is dead. People can smell automation from a mile away. But when you combine AI intelligence with genuine personalization, magic happens.

What's your experience with AI-powered outreach? Are you seeing similar results or facing different challenges?

#AI #Automation #LinkedInMarketing #B2B #SaaS`);
    
    setAuthorProfile({
      name: 'Sarah Chen', 
      company: 'TechFlow Solutions',
      industry: 'B2B SaaS',
      position: 'VP of Marketing'
    });
    
    setUserContext({
      industry: 'Marketing Technology',
      company: 'Content Relay',
      expertise: 'AI-powered LinkedIn automation',
      role: 'Growth Marketing Manager'
    });
    
    setShowPreview(true);
  };

  const isReadyForPreview = postContent && authorProfile.name && authorProfile.company && 
                           userContext.industry && userContext.company;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">AI Comment Generator Demo</h2>
        <p className="text-gray-600 mb-6">
          See how our AI creates hyper-relevant LinkedIn comments that drive real engagement
        </p>
        <Button onClick={handleDemo} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
          <Sparkles className="h-4 w-4 mr-2" />
          Try Demo with Sample Data
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                LinkedIn Post Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="post-content">Post Content</Label>
                <Textarea
                  id="post-content"
                  placeholder="Paste the LinkedIn post content here..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-green-600" />
                Author Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author-name">Author Name</Label>
                  <Input
                    id="author-name"
                    placeholder="e.g., John Smith"
                    value={authorProfile.name}
                    onChange={(e) => setAuthorProfile({...authorProfile, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="author-company">Company</Label>
                  <Input
                    id="author-company"
                    placeholder="e.g., TechCorp Inc"
                    value={authorProfile.company}
                    onChange={(e) => setAuthorProfile({...authorProfile, company: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author-position">Position</Label>
                  <Input
                    id="author-position"
                    placeholder="e.g., CEO, VP Marketing"
                    value={authorProfile.position}
                    onChange={(e) => setAuthorProfile({...authorProfile, position: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="author-industry">Industry</Label>
                  <Select value={authorProfile.industry} onValueChange={(value) => setAuthorProfile({...authorProfile, industry: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">B2B SaaS</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                Your Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="user-industry">Your Industry</Label>
                  <Input
                    id="user-industry"
                    placeholder="e.g., Marketing Tech"
                    value={userContext.industry}
                    onChange={(e) => setUserContext({...userContext, industry: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="user-company">Your Company</Label>
                  <Input
                    id="user-company"
                    placeholder="e.g., Content Relay"
                    value={userContext.company}
                    onChange={(e) => setUserContext({...userContext, company: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="user-expertise">Your Expertise</Label>
                  <Input
                    id="user-expertise"
                    placeholder="e.g., AI automation"
                    value={userContext.expertise}
                    onChange={(e) => setUserContext({...userContext, expertise: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="user-role">Your Role</Label>
                  <Input
                    id="user-role"
                    placeholder="e.g., Growth Manager"
                    value={userContext.role}
                    onChange={(e) => setUserContext({...userContext, role: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => setShowPreview(true)}
            disabled={!isReadyForPreview}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            size="lg"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate AI Comment
          </Button>
        </div>

        {/* Preview Section */}
        <div>
          {showPreview && isReadyForPreview ? (
            <CommentPreview
              postContent={postContent}
              authorProfile={authorProfile}
              userContext={userContext}
              campaignId="demo-campaign"
            />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI Comment Preview</h3>
                <p className="text-gray-600 mb-4">
                  Fill in the form to see your AI-generated comment
                </p>
                <div className="text-sm text-gray-500">
                  ✓ Enter post content<br/>
                  ✓ Add author details<br/>
                  ✓ Set your context
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoCommenterDemo;
