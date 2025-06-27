
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-light via-white to-blue-50/30 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,70,255,0.05)_0%,transparent_50%)] bg-[radial-gradient(circle_at_80%_20%,rgba(0,224,255,0.05)_0%,transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-space-grotesk font-bold text-text mb-6 leading-tight animate-fade-in">
            Your LinkedIn.
            <span className="block text-primary">On Autopilot.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted font-dm-sans mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Transform your LinkedIn presence with AI-powered automation. 
            Create, schedule, and publish compelling content while you focus on what matters most.
          </p>
          
          {/* CTA Button */}
          <div className="animate-fade-in mb-16" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-glow"
            >
              <Zap className="mr-2 h-5 w-5" />
              Try Content Relay Free
            </Button>
          </div>
          
          {/* Video Demo */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-space-grotesk font-semibold text-text mb-6">
                See How LinkedIn Post Creation System Works
              </h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <iframe
                  src="https://www.loom.com/embed/2c25b186cd6541daae1431a60f158958?sid=9a2b5ffc-78d5-4635-a91b-35e53acd7988"
                  frameBorder="0"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  title="LinkedIn Post Creation System Demo"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
