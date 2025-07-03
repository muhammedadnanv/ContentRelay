
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface CreateTargetModalProps {
  open: boolean;
  onClose: () => void;
  onTargetCreated: () => void;
}

const CreateTargetModal = ({ open, onClose, onTargetCreated }: CreateTargetModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industries: [''],
    job_titles: [''],
    companies: [''],
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast({
        title: "Validation Error",
        description: "Please enter a target name.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const target_criteria = {
        industries: formData.industries.filter(i => i.trim()),
        job_titles: formData.job_titles.filter(j => j.trim()),
        companies: formData.companies.filter(c => c.trim()),
      };

      const { error } = await supabase
        .from('engagement_targets' as any)
        .insert({
          user_id: user.id,
          name: formData.name,
          description: formData.description,
          target_criteria: target_criteria,
          is_active: true,
        });

      if (error) throw error;

      toast({
        title: "Target Created",
        description: "Your engagement target has been created successfully.",
      });

      onTargetCreated();
      onClose();
      setFormData({
        name: '',
        description: '',
        industries: [''],
        job_titles: [''],
        companies: [''],
      });
    } catch (error) {
      console.error('Error creating target:', error);
      toast({
        title: "Error",
        description: "Failed to create target. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addField = (field: 'industries' | 'job_titles' | 'companies') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const updateField = (field: 'industries' | 'job_titles' | 'companies', index: number, value: string) => {
    const array = [...formData[field]];
    array[index] = value;
    setFormData({ ...formData, [field]: array });
  };

  const removeField = (field: 'industries' | 'job_titles' | 'companies', index: number) => {
    const array = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: array });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Engagement Target</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Target Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Tech Startup Founders"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your target audience"
            />
          </div>

          <div className="space-y-2">
            <Label>Industries</Label>
            {formData.industries.map((industry, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  value={industry}
                  onChange={(e) => updateField('industries', index, e.target.value)}
                  placeholder="e.g., Technology, Healthcare"
                  className="flex-1"
                />
                {formData.industries.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeField('industries', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addField('industries')}>
              Add Industry
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Job Titles</Label>
            {formData.job_titles.map((title, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  value={title}
                  onChange={(e) => updateField('job_titles', index, e.target.value)}
                  placeholder="e.g., CEO, Marketing Manager"
                  className="flex-1"
                />
                {formData.job_titles.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeField('job_titles', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addField('job_titles')}>
              Add Job Title
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Companies</Label>
            {formData.companies.map((company, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  value={company}
                  onChange={(e) => updateField('companies', index, e.target.value)}
                  placeholder="e.g., Microsoft, Google"
                  className="flex-1"
                />
                {formData.companies.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeField('companies', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addField('companies')}>
              Add Company
            </Button>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Target'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTargetModal;
