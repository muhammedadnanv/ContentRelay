
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyItMatters from "@/components/WhyItMatters";
import WhoItsFor from "@/components/WhoItsFor";
import UseCases from "@/components/UseCases";
import ToolsSection from "@/components/ToolsSection";
import VideoSection from "@/components/VideoSection";
import PricingSection from "@/components/PricingSection";
import PricingCalculator from "@/components/PricingCalculator";
import FounderSection from "@/components/FounderSection";
import ReferralSection from "@/components/ReferralSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Index - Auth event:', event, 'Session:', session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Redirect authenticated users to dashboard
        if (session?.user && event === 'SIGNED_IN') {
          navigate('/dashboard');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Index - Initial session:', session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Redirect if already authenticated
      if (session?.user) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <HowItWorks />
      <WhyItMatters />
      <WhoItsFor />
      <UseCases />
      <ToolsSection />
      <VideoSection />
      <PricingSection />
      <PricingCalculator />
      <FounderSection />
      <ReferralSection />
      <FinalCTA />
    </div>
  );
};

export default Index;
