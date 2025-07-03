
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Edit, Trash2, Users, Building2, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CreateTargetModal from "./CreateTargetModal";

interface EngagementTarget {
  id: string;
  name: string;
  description: string;
  target_criteria: {
    industries?: string[];
    job_titles?: string[];
    companies?: string[];
    keywords?: string[];
  };
  is_active: boolean;
  created_at: string;
}

const EngagementTargets = () => {
  const [targets, setTargets] = useState<EngagementTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Mock data for demo since tables are not ready yet
      const mockTargets: EngagementTarget[] = [
        {
          id: '1',
          name: 'Tech Startup Founders',
          description: 'Founders and co-founders in early-stage tech startups focusing on AI, SaaS, and fintech',
          target_criteria: {
            industries: ['Technology', 'Software', 'Artificial Intelligence', 'Financial Technology'],
            job_titles: ['Founder', 'Co-founder', 'CEO', 'CTO'],
            companies: ['Y Combinator', 'Techstars', '500 Startups'],
            keywords: ['startup', 'entrepreneur', 'AI', 'SaaS', 'fintech']
          },
          is_active: true,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'SaaS Marketing Leaders',
          description: 'Marketing directors and VPs at SaaS companies with 50+ employees',
          target_criteria: {
            industries: ['Software as a Service', 'Technology', 'Cloud Computing'],
            job_titles: ['Marketing Director', 'VP Marketing', 'Head of Marketing', 'CMO'],
            companies: ['Salesforce', 'HubSpot', 'Slack', 'Zoom'],
            keywords: ['SaaS marketing', 'growth marketing', 'demand generation']
          },
          is_active: true,
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Product Managers in Enterprise',
          description: 'Senior product managers and product directors at enterprise companies',
          target_criteria: {
            industries: ['Enterprise Software', 'Technology', 'Consulting'],
            job_titles: ['Senior Product Manager', 'Product Director', 'VP Product', 'Chief Product Officer'],
            companies: ['Microsoft', 'Google', 'Amazon', 'IBM'],
            keywords: ['product management', 'product strategy', 'user experience']
          },
          is_active: false,
          created_at: new Date().toISOString(),
        }
      ];
      
      setTargets(mockTargets);
    } catch (error) {
      console.error('Error fetching targets:', error);
      toast({
        title: "Error",
        description: "Failed to load engagement targets.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTarget = async (targetId: string) => {
    try {
      setTargets(targets.filter(t => t.id !== targetId));
      toast({
        title: "Target Deleted",
        description: "Engagement target deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting target:', error);
      toast({
        title: "Error",
        description: "Failed to delete target.",
        variant: "destructive",
      });
    }
  };

  const toggleTargetStatus = async (targetId: string) => {
    try {
      setTargets(targets.map(t => 
        t.id === targetId ? { ...t, is_active: !t.is_active } : t
      ));
      toast({
        title: "Target Updated",
        description: "Target status updated successfully.",
      });
    } catch (error) {
      console.error('Error updating target:', error);
      toast({
        title: "Error",
        description: "Failed to update target status.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
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
          <h2 className="text-xl font-semibold">Engagement Targets</h2>
          <p className="text-gray-600 text-sm">Define your ideal prospects for AI-powered outreach</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Target
        </Button>
      </div>

      {targets.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">
              No engagement targets defined
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Define who you want to engage with based on industry, job title, company, and keywords for precise AI targeting
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Target
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {targets.map((target) => (
            <Card key={target.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{target.name}</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">{target.description}</p>
                    </div>
                  </div>
                  <Badge className={target.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {target.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-3">Target Criteria:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {target.target_criteria.industries && target.target_criteria.industries.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Industries</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {target.target_criteria.industries.map((industry, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {target.target_criteria.job_titles && target.target_criteria.job_titles.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Job Titles</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {target.target_criteria.job_titles.map((title, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {target.target_criteria.companies && target.target_criteria.companies.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Companies</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {target.target_criteria.companies.map((company, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {target.target_criteria.keywords && target.target_criteria.keywords.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Keywords</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {target.target_criteria.keywords.map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-purple-50 text-purple-700">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-xs text-gray-500">
                    Created {new Date(target.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleTargetStatus(target.id)}
                      className={target.is_active ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                    >
                      {target.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteTarget(target.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateTargetModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onTargetCreated={fetchTargets}
      />
    </div>
  );
};

export default EngagementTargets;
