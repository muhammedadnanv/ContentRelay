
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import PricingCalculator from "./PricingCalculator";

const PricingSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 px-4">
          LinkedIn Content Automation Service 🚀
        </h2>
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
          Professional LinkedIn content automation workflows delivered as a service. We build, manage, and optimize your content system.
        </p>
      </div>

      <PricingCalculator />

      {/* Help Section */}
      <div className="text-center mt-6 sm:mt-8 lg:mt-12">
        <div className="bg-white sketch-card p-4 sm:p-6 lg:p-8 max-w-md mx-auto">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#1A1A1A] mb-2 sm:mb-3">
            Need help with your automation setup? 🤝
          </h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
            Get personalized assistance to build your custom LinkedIn content automation workflow
          </p>
          <Button 
            variant="outline"
            className="white-outline-button text-xs sm:text-sm lg:text-base w-full"
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
