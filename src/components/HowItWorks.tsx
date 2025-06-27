
import { MessageCircle, Settings, PenTool, Zap, Share2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: MessageCircle,
      title: "Input Your Prompt",
      description: "Simply describe what you want to share. Your expertise, insights, or story ideas."
    },
    {
      step: "02",
      icon: Settings,
      title: "AI Agent Structures",
      description: "Our intelligent agent analyzes your prompt and creates a strategic content framework."
    },
    {
      step: "03",
      icon: PenTool,
      title: "Gemini Writes",
      description: "Advanced AI crafts compelling, professional content that matches your voice and style."
    },
    {
      step: "04",
      icon: Zap,
      title: "n8n Automates",
      description: "Sophisticated workflows handle scheduling, optimization, and timing for maximum impact."
    },
    {
      step: "05",
      icon: Share2,
      title: "LinkedIn API Publishes",
      description: "Your content goes live seamlessly, maintaining consistent presence and engagement."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-text mb-6">
              How AutoPulse Works
            </h2>
            <p className="text-xl text-muted font-dm-sans max-w-2xl mx-auto">
              Five intelligent steps that transform your ideas into professional LinkedIn content
            </p>
          </div>
          
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-px"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div 
                  key={step.step}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Step Number Circle */}
                  <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center transform md:-translate-x-1/2 shadow-lg z-10">
                    <span className="text-white font-space-grotesk font-bold text-sm">{step.step}</span>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`flex-1 ml-24 md:ml-0 ${index % 2 === 0 ? 'md:pr-24' : 'md:pl-24'}`}>
                    <div className="bg-light/50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <step.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-space-grotesk font-semibold text-text">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted font-dm-sans leading-relaxed">
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
