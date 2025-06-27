
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
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-text mb-6">
              Unlock Your LinkedIn Potential
            </h2>
            <p className="text-xl text-muted font-dm-sans max-w-2xl mx-auto">
              From content creation to audience building, AutoPulse handles the heavy lifting
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div 
                key={useCase.title}
                className="group p-8 rounded-2xl bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30 transition-all duration-500 shadow-sm hover:shadow-2xl border border-gray-100 hover:border-primary/30 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <useCase.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-space-grotesk font-semibold text-text mb-4 group-hover:text-primary transition-colors duration-300">
                  {useCase.title}
                </h3>
                <p className="text-muted font-dm-sans leading-relaxed">
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
