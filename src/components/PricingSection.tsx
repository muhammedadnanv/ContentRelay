
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import PricingCalculator from "./PricingCalculator";

const PricingSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4 px-4">
          Choose Your Automation Workflow 🚀
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Professional automation workflows, not software subscriptions. Get your system built and delivered.
        </p>
      </div>

      <PricingCalculator />

      {/* Help Section */}
      <div className="text-center mt-8 sm:mt-12">
        <div className="bg-gray-50 sketch-card p-4 sm:p-6 inline-block max-w-md mx-auto">
          <h3 className="text-base sm:text-lg font-semibold text-[#1A1A1A] mb-2">
            Need help with your workflow setup? 🤝
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Get personalized assistance to build your custom automation workflow
          </p>
          <Button 
            variant="outline"
            className="white-outline-button text-sm sm:text-base w-full sm:w-auto"
            onClick={() => window.open('https://wa.link/a3n7ng', '_blank')}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Get Help on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
