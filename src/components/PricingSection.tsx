
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MessageCircle } from "lucide-react";

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-8 sm:mb-12">
        {/* Content Relay Plan */}
        <Card className="sketch-card bg-white relative">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
              <CardTitle className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                Content Relay Workflow 📝
              </CardTitle>
              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium self-start">
                Popular
              </div>
            </div>
            <CardDescription className="text-base sm:text-lg text-gray-600">
              Monthly automation workflow service
            </CardDescription>
            <div className="mt-4">
              <span className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">₹999</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">Full automation workflow setup using n8n + AI Agent</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">Powered by Google Gemini AI</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">No-code system with auto-posting</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">Monthly workflow upgrades + onboarding support</span>
              </div>
            </div>
            <Button 
              className="w-full custom-gradient-bg text-white sketch-button border-2 border-black hover:bg-gradient-to-br hover:from-indigo-700 hover:to-purple-700 text-sm sm:text-base py-2 sm:py-3"
              onClick={() => window.open('https://forms.gle/mTjevZH57N6PGvHdA', '_blank')}
            >
              Get Your Workflow Built 🎯
            </Button>
          </CardContent>
        </Card>

        {/* Automation Expert Plan */}
        <Card className="sketch-card bg-white relative">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
              <CardTitle className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                Automation Expert Workflow 🤖
              </CardTitle>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium self-start">
                One-time
              </div>
            </div>
            <CardDescription className="text-base sm:text-lg text-gray-600">
              Complete automation workflow delivery
            </CardDescription>
            <div className="mt-4">
              <span className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">₹2,999</span>
              <span className="text-gray-600 ml-2">one-time</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">Full automation workflow setup using n8n + AI Agent</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">Powered by Google Gemini AI</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">No-code system with auto-posting</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">Lifetime workflow access + onboarding support</span>
              </div>
            </div>
            <Button 
              className="w-full bg-purple-600 text-white sketch-button border-2 border-black hover:bg-purple-700 text-sm sm:text-base py-2 sm:py-3"
              onClick={() => window.open('https://topmate.io/muhammad_adnan10/1610387', '_blank')}
            >
              Get Your Workflow Delivered ⚡
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <div className="text-center">
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
