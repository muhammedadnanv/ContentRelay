
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleTryContentRelay = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Service Type Badge */}
          <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-fade-in">
            AI-Powered LinkedIn Engagement Automation
          </div>
          
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1A1A1A] mb-4 sm:mb-6 leading-tight animate-fade-in px-2">
            AI Comments, Connects & Engages.
            <span className="block text-indigo-600">Daily. Automatically.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in px-4" style={{
            animationDelay: '0.2s'
          }}>
            Our AI writes hyper-relevant comments, sends strategic connection requests, and maintains daily engagement on LinkedIn. Scale your networking while you focus on closing deals.
          </p>
          
          {/* CTA Button */}
          <div className="animate-fade-in mb-8 sm:mb-12 lg:mb-16 px-4" style={{
            animationDelay: '0.4s'
          }}>
            <Button 
              size="lg" 
              className="custom-gradient-bg text-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base lg:text-lg font-medium sketch-button border-2 border-black hover:bg-gradient-to-br hover:from-indigo-700 hover:to-purple-700 shadow-none w-full sm:w-auto max-w-sm sm:max-w-none" 
              onClick={handleTryContentRelay}
            >
              <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {user ? 'Go to Dashboard' : 'Start AI Engagement Automation'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
