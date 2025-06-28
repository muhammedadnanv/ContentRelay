
import { User, Rocket, Target, Code, Wrench } from "lucide-react";

const WhoItsFor = () => {
  const audiences = [
    {
      icon: User,
      title: "Solopreneurs",
      benefit: "Get custom automation workflows to build your personal brand"
    },
    {
      icon: Rocket,
      title: "Founders",
      benefit: "Professional workflow setup for thought leadership automation"
    },
    {
      icon: Target,
      title: "Marketers",
      benefit: "Ready-to-use automation workflows for consistent content delivery"
    },
    {
      icon: Code,
      title: "Tech Creators",
      benefit: "Custom-built workflows that work while you focus on coding"
    },
    {
      icon: Wrench,
      title: "Busy Professionals",
      benefit: "Done-for-you automation setup without technical complexity"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space-grotesk font-bold text-text mb-4 sm:mb-6 px-4">
              Who Gets These Automation Workflows
            </h2>
            <p className="text-lg sm:text-xl text-muted font-dm-sans max-w-2xl mx-auto px-4">
              Professional automation workflows designed for modern professionals who need results, not software
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {audiences.map((audience, index) => (
              <div 
                key={audience.title}
                className="group p-6 sm:p-8 rounded-2xl bg-light/50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <audience.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-space-grotesk font-semibold text-text mb-2 sm:mb-3">
                  {audience.title}
                </h3>
                <p className="text-sm sm:text-base text-muted font-dm-sans leading-relaxed">
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
