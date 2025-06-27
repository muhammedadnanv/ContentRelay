
import { MessageSquare, Calendar, TrendingUp, Users, BarChart3, Clock } from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      icon: MessageSquare,
      title: "Thought Leadership",
      description: "Share insights and expertise consistently to build authority in your field"
    },
    {
      icon: Calendar,
      title: "Content Consistency",
      description: "Never miss a post with intelligent scheduling that adapts to your audience"
    },
    {
      icon: TrendingUp,
      title: "Growth Acceleration",
      description: "Scale your LinkedIn presence without scaling your time investment"
    },
    {
      icon: Users,
      title: "Audience Engagement",
      description: "Build meaningful connections through strategic, personalized content"
    },
    {
      icon: BarChart3,
      title: "Performance Optimization",
      description: "AI-driven insights help you understand what resonates with your network"
    },
    {
      icon: Clock,
      title: "Time Recovery",
      description: "Reclaim 5-10 hours weekly for high-impact activities that drive results"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
              Unlock Your LinkedIn Potential
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From content creation to audience building, Content Relay handles the heavy lifting
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

