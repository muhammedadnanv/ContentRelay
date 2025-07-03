
import { Bot, Brain, Share2, MessageCircle, UserPlus, Target } from "lucide-react";

const ToolsSection = () => {
  const tools = [
    {
      icon: Share2,
      name: "LinkedIn API",
      description: "Direct Integration",
      color: "from-blue-600 to-blue-800"
    },
    {
      icon: Brain,
      name: "Advanced AI",
      description: "Context Understanding",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: MessageCircle,
      name: "Comment Engine",
      description: "Smart Interactions",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: UserPlus,
      name: "Connection Bot",
      description: "Automated Networking",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Target,
      name: "Targeting System",
      description: "Precision Outreach",
      color: "from-primary to-accent"
    },
    {
      icon: Bot,
      name: "Engagement AI",
      description: "24/7 Activity",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-text mb-6">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-muted font-dm-sans max-w-2xl mx-auto">
              Our sophisticated AI engine understands context, writes like a human, and engages strategically
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div 
                key={tool.name}
                className="group text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 group-hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-space-grotesk font-semibold text-text mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-muted font-dm-sans">
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
