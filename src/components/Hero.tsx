import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useEffect } from "react";
const Hero = () => {
  const handleTryContentRelay = () => {
    window.open("https://forms.gle/ktjPyVR4F7ryMVri6", "_blank");
  };
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);
    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);
  return <section className="relative flex items-center justify-center overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Service Type Badge */}
          <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-fade-in">
            Automation Workflow as a Service (AWaaS)
          </div>
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#1A1A1A] mb-4 sm:mb-6 leading-tight animate-fade-in">
            Your LinkedIn.
            <span className="block text-indigo-600">On Autopilot.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in px-4" style={{
          animationDelay: '0.2s'
        }}>Get custom automation workflows that transform your LinkedIn presence with AI-powered content creation. Professional automation setup, with software subscription.</p>
          
          {/* CTA Button */}
          <div className="animate-fade-in mb-12 sm:mb-16" style={{
          animationDelay: '0.4s'
        }}>
            <Button size="lg" className="custom-gradient-bg text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium sketch-button border-2 border-black hover:bg-gradient-to-br hover:from-indigo-700 hover:to-purple-700 shadow-none w-full sm:w-auto" onClick={handleTryContentRelay}>
              <Zap className="mr-2 h-5 w-5" />
              Try Content Relay
            </Button>
          </div>
          
          {/* Instagram Embed */}
          <div className="animate-fade-in px-4" style={{
          animationDelay: '0.6s'
        }}>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-4 sm:mb-6">
                See How LinkedIn Automation Workflow Works
              </h3>
              <div className="flex justify-center">
                <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DK8uCT-SfaL/" data-instgrm-version="14" style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '99.375%'
              }}>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;