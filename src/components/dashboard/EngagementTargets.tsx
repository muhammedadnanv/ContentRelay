
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CreateTargetModal from "./CreateTargetModal";

interface EngagementTarget {
  id: string;
  name: string;
  description: string;
  target_criteria: any;
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

      const { data, error } = await supabase
        .from('engagement_targets' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Targets table not ready, using mock data');
        // Mock data for demo
        setTargets([
          {
            id: '1',
            name: 'Tech Startup Founders',
            description: 'Founders and co-founders in tech startups',
            target_criteria: {
              industries: ['Technology', 'Software'],
              job_titles: ['Founder', 'Co-founder', 'CEO'],
              companies: []
            },
            is_active: true,
            created_at: new Date().toISOString(),
          }
        ]);
      } else {
        setTargets(data || []);
      }
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
      const { error } = await supabase
        .from('engagement_targets' as any)
        .delete()
        .eq('id', targetId);

      if (error) throw error;

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
        <h2 className="text-xl font-semibold">Engagement Targets</h2>
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
              Define who you want to engage with based on industry, job title, company, etc.
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
            <Card key={target.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{target.name}</CardTitle>
                    <p className="text-gray-600 text-sm mt-1">{target.description}</p>
                  </div>
                  <Badge className={target.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {target.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Target Criteria:</h4>
                  <div className="flex flex-wrap gap-2">
                    {target.target_criteria.industries && (
                      <Badge variant="outline">
                        Industries: {target.target_criteria.industries.join(', ')}
                      </Badge>
                    )}
                    {target.target_criteria.job_titles && (
                      <Badge variant="outline">
                        Roles: {target.target_criteria.job_titles.join(', ')}
                      </Badge>
                    )}
                    {target.target_criteria.companies && (
                      <Badge variant="outline">
                        Companies: {target.target_criteria.companies.join(', ')}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteTarget(target.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
