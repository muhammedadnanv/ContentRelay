
import { User, Rocket, Target, Code, Wrench } from "lucide-react";

const WhoItsFor = () => {
  const audiences = [
    {
      icon: User,
      title: "Solopreneurs",
      benefit: "Build your personal brand without the daily grind"
    },
    {
      icon: Rocket,
      title: "Founders",
      benefit: "Scale your thought leadership while scaling your business"
    },
    {
      icon: Target,
      title: "Marketers",
      benefit: "Amplify your reach with consistent, strategic content"
    },
    {
      icon: Code,
      title: "Tech Creators",
      benefit: "Share your expertise without interrupting your flow"
    },
    {
      icon: Wrench,
      title: "No-Code Users",
      benefit: "Professional automation without technical complexity"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-text mb-6">
              Built for Modern Professionals
            </h2>
            <p className="text-xl text-muted font-dm-sans max-w-2xl mx-auto">
              Whether you're building a business or a brand, AutoPulse adapts to your workflow
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {audiences.map((audience, index) => (
              <div 
                key={audience.title}
                className="group p-8 rounded-2xl bg-light/50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <audience.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-space-grotesk font-semibold text-text mb-3">
                  {audience.title}
                </h3>
                <p className="text-muted font-dm-sans leading-relaxed">
                  {audience.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
