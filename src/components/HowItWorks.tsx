
import { Target, Brain, MessageCircle, UserPlus, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Target,
      title: "Define Your Targets",
      description: "Set your ideal prospects, industries, and engagement preferences for precise targeting."
    },
    {
      step: "02",
      icon: Brain,
      title: "AI Analyzes Content",
      description: "Advanced AI scans LinkedIn posts, identifies engagement opportunities, and understands context."
    },
    {
      step: "03",
      icon: MessageCircle,
      title: "Writes Smart Comments",
      description: "AI crafts hyper-relevant, engaging comments that add value and spark conversations."
    },
    {
      step: "04",
      icon: UserPlus,
      title: "Sends Connection Requests",
      description: "Automated personalized connection requests sent to your ideal prospects with custom messages."
    },
    {
      step: "05",
      icon: TrendingUp,
      title: "Scales Your Network",
      description: "Daily engagement builds meaningful connections and expands your professional network automatically."
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space-grotesk font-bold text-text mb-4 sm:mb-6 px-4">
              How AI Engagement Works
            </h2>
            <p className="text-lg sm:text-xl text-muted font-dm-sans max-w-2xl mx-auto px-4">
              Five intelligent steps that transform your LinkedIn presence into a networking powerhouse
            </p>
          </div>
          
          <div className="relative">
            {/* Vertical Timeline Line - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform -translate-x-px"></div>
            
            <div className="space-y-8 sm:space-y-12">
              {steps.map((step, index) => (
                <div 
                  key={step.step}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Step Number Circle */}
                  <div className="md:absolute md:left-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center md:transform md:-translate-x-1/2 shadow-lg z-10 mb-4 md:mb-0">
                    <span className="text-white font-space-grotesk font-bold text-sm">{step.step}</span>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`flex-1 w-full md:w-auto ${index % 2 === 0 ? 'md:pr-24' : 'md:pl-24'}`}>
                    <div className="bg-light/50 p-6 sm:p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 group-hover:scale-110 transition-transform duration-300 self-start">
                          <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-space-grotesk font-semibold text-text">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-muted font-dm-sans leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
