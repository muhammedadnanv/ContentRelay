
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
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Service Type Badge */}
          <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-fade-in">
            LinkedIn Content Writing Automation Service
          </div>
          
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1A1A1A] mb-4 sm:mb-6 leading-tight animate-fade-in px-2">
            Your LinkedIn Content.
            <span className="block text-indigo-600">Automated Daily.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in px-4" style={{
            animationDelay: '0.2s'
          }}>
            Get professional LinkedIn content writing automation workflows delivered as a service. We build and manage your AI-powered content system - you just approve and post.
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
              Get Your Content Automation
            </Button>
          </div>
          
          {/* Instagram Embed */}
          <div className="animate-fade-in px-2 sm:px-4" style={{
            animationDelay: '0.6s'
          }}>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#1A1A1A] mb-4 sm:mb-6">
                See How Our LinkedIn Content Automation Works
              </h3>
              <div className="flex justify-center">
                <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
                  <blockquote 
                    className="instagram-media" 
                    data-instgrm-permalink="https://www.instagram.com/reel/DK8uCT-SfaL/" 
                    data-instgrm-version="14" 
                    style={{
                      background: '#FFF',
                      border: '0',
                      borderRadius: '3px',
                      boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                      margin: '1px auto',
                      maxWidth: '540px',
                      minWidth: '280px',
                      padding: '0',
                      width: '100%'
                    }}
                  >
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
