
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhoItsFor from "@/components/WhoItsFor";
import UseCases from "@/components/UseCases";
import HowItWorks from "@/components/HowItWorks";
import WhyItMatters from "@/components/WhyItMatters";
import ToolsSection from "@/components/ToolsSection";
import PricingSection from "@/components/PricingSection";
import FounderSection from "@/components/FounderSection";
import ReferralSection from "@/components/ReferralSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Hero />
        <WhoItsFor />
        <UseCases />
        <HowItWorks />
        <WhyItMatters />
        <ToolsSection />
        <PricingSection />
        <FounderSection />
        <ReferralSection />
        <FinalCTA />
      </div>
    </div>
  );
};

export default Index;
