
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-dark via-slate-900 to-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,70,255,0.1)_0%,transparent_50%)] bg-[radial-gradient(circle_at_80%_50%,rgba(0,224,255,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold text-white mb-6 animate-fade-in">
            Ready to Transform Your
            <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
              LinkedIn Presence?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 font-dm-sans mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join forward-thinking professionals who've already discovered the power of intelligent automation. 
            Your LinkedIn success story starts here.
          </p>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-12 py-6 text-xl font-medium rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
            >
              Get Early Access
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-400 mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
