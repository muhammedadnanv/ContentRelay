
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import CampaignsList from "@/components/dashboard/CampaignsList";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AutomationSettings from "@/components/dashboard/AutomationSettings";
import EngagementQueue from "@/components/dashboard/EngagementQueue";
import SmartCommentGenerator from "@/components/dashboard/SmartCommentGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinkedInAccounts from "@/components/dashboard/LinkedInAccounts";
import EngagementTargets from "@/components/dashboard/EngagementTargets";
import Analytics from "@/components/dashboard/Analytics";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          toast({
            title: "Authentication Error",
            description: "There was an issue with your session. Please sign in again.",
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }
        
        if (!session?.user) {
          console.log('No session found, redirecting to auth');
          navigate('/auth');
          return;
        }
        
        console.log('Dashboard - User authenticated:', session.user);
        setUser(session.user);
        setLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        toast({
          title: "Error",
          description: "Failed to verify authentication. Please try again.",
          variant: "destructive",
        });
        navigate('/auth');
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Dashboard - Auth event:', event, 'Session:', session);
        if (event === 'SIGNED_OUT' || !session?.user) {
          setUser(null);
          navigate('/auth');
        } else if (session?.user) {
          setUser(session.user);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in to access your dashboard.</p>
          <button
            onClick={() => navigate('/auth')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}!
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            AI-powered LinkedIn engagement automation with hyper-relevant comments
          </p>
        </div>

        <DashboardStats />

        <Tabs defaultValue="smart-comments" className="mt-6 sm:mt-8">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-4' : 'grid-cols-8'} gap-1`}>
            <TabsTrigger value="smart-comments" className="text-xs sm:text-sm">
              {isMobile ? 'Comments' : 'Smart Comments'}
            </TabsTrigger>
            <TabsTrigger value="automation" className="text-xs sm:text-sm">
              {isMobile ? 'Auto' : 'Automation'}
            </TabsTrigger>
            <TabsTrigger value="queue" className="text-xs sm:text-sm">Queue</TabsTrigger>
            <TabsTrigger value="campaigns" className="text-xs sm:text-sm">
              {isMobile ? 'Camps' : 'Campaigns'}
            </TabsTrigger>
            {!isMobile && (
              <>
                <TabsTrigger value="targets" className="text-xs sm:text-sm">Targets</TabsTrigger>
                <TabsTrigger value="linkedin" className="text-xs sm:text-sm">LinkedIn</TabsTrigger>
                <TabsTrigger value="activity" className="text-xs sm:text-sm">Activity</TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
              </>
            )}
          </TabsList>

          {isMobile && (
            <TabsList className="grid w-full grid-cols-4 gap-1 mt-2">
              <TabsTrigger value="targets" className="text-xs sm:text-sm">Targets</TabsTrigger>
              <TabsTrigger value="linkedin" className="text-xs sm:text-sm">LinkedIn</TabsTrigger>
              <TabsTrigger value="activity" className="text-xs sm:text-sm">Activity</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="smart-comments" className="mt-4 sm:mt-6">
            <SmartCommentGenerator />
          </TabsContent>

          <TabsContent value="automation" className="mt-4 sm:mt-6">
            <AutomationSettings />
          </TabsContent>

          <TabsContent value="queue" className="mt-4 sm:mt-6">
            <EngagementQueue />
          </TabsContent>

          <TabsContent value="campaigns" className="mt-4 sm:mt-6">
            <CampaignsList />
          </TabsContent>

          <TabsContent value="targets" className="mt-4 sm:mt-6">
            <EngagementTargets />
          </TabsContent>

          <TabsContent value="linkedin" className="mt-4 sm:mt-6">
            <LinkedInAccounts />
          </TabsContent>

          <TabsContent value="activity" className="mt-4 sm:mt-6">
            <RecentActivity />
          </TabsContent>

          <TabsContent value="analytics" className="mt-4 sm:mt-6">
            <Analytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
