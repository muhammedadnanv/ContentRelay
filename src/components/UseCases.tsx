
import { MessageSquare, UserPlus, TrendingUp, Users, Zap, Clock, Target, Brain } from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      icon: MessageSquare,
      title: "Smart Comments",
      description: "AI writes contextually relevant comments that spark meaningful conversations"
    },
    {
      icon: UserPlus,
      title: "Strategic Connections",
      description: "Automatically send personalized connection requests to your ideal prospects"
    },
    {
      icon: Zap,
      title: "Daily Engagement",
      description: "Maintain consistent LinkedIn presence with automated daily interactions"
    },
    {
      icon: Target,
      title: "Targeted Outreach",
      description: "Focus on specific industries, roles, or companies for maximum relevance"
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Advanced algorithms analyze posts to craft the most engaging responses"
    },
    {
      icon: Clock,
      title: "Time Freedom",
      description: "Reclaim 3-5 hours daily while your AI handles LinkedIn networking"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
              Transform Your LinkedIn Networking
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From comments to connections, our AI handles every aspect of LinkedIn engagement
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div 
                key={useCase.title}
                className="bg-white p-8 rounded-2xl sketch-card animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 custom-gradient-bg rounded-xl flex items-center justify-center mb-6">
                  <useCase.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
