
import Hero from "@/components/Hero";
import WhoItsFor from "@/components/WhoItsFor";
import UseCases from "@/components/UseCases";
import HowItWorks from "@/components/HowItWorks";
import WhyItMatters from "@/components/WhyItMatters";
import ToolsSection from "@/components/ToolsSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <WhoItsFor />
      <UseCases />
      <HowItWorks />
      <WhyItMatters />
      <ToolsSection />
      <FinalCTA />
    </div>
  );
};

export default Index;
