
import Hero from "@/components/Hero";
import WhoItsFor from "@/components/WhoItsFor";
import UseCases from "@/components/UseCases";
import HowItWorks from "@/components/HowItWorks";
import WhyItMatters from "@/components/WhyItMatters";
import ToolsSection from "@/components/ToolsSection";
import FounderSection from "@/components/FounderSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhoItsFor />
      <UseCases />
      <HowItWorks />
      <WhyItMatters />
      <ToolsSection />
      <FounderSection />
      <FinalCTA />
    </div>
  );
};

export default Index;

