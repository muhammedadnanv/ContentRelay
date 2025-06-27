
import { Clock, TrendingUp, Eye, Zap } from "lucide-react";

const WhyItMatters = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save 5-10 Hours Weekly",
      description: "Reclaim your time for strategic thinking and relationship building"
    },
    {
      icon: TrendingUp,
      title: "Scale Content Delivery",
      description: "Maintain consistent presence without increasing your workload"
    },
    {
      icon: Eye,
      title: "Always-On Brand Visibility",
      description: "Stay top-of-mind with your network through strategic content timing"
    },
    {
      icon: Zap,
      title: "Full No-Code Ease",
      description: "Professional automation without technical complexity or learning curve"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-12 md:p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-text mb-6">
                  Why This Matters
                </h2>
                <p className="text-xl text-muted font-dm-sans max-w-2xl mx-auto">
                  In today's digital landscape, consistent LinkedIn presence isn't optional—it's essential for professional growth
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={benefit.title}
                    className="flex items-start space-x-4 p-6 rounded-xl hover:bg-light/50 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-space-grotesk font-semibold text-text mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted font-dm-sans leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;
