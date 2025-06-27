
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MessageCircle } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
          Choose Your Perfect Plan 🚀
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Pick the plan that fits your needs and start automating your LinkedIn presence today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {/* Content Relay Plan */}
        <Card className="sketch-card bg-white relative">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-2xl font-bold text-[#1A1A1A]">
                Content Relay Plan 📝
              </CardTitle>
              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
            </div>
            <CardDescription className="text-lg text-gray-600">
              Perfect for brands, business owners, and creators
            </CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold text-[#1A1A1A]">₹999</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Full automation setup using n8n + AI Agent</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Powered by Google Gemini AI</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">No-code system with auto-posting</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Monthly upgrades + onboarding support</span>
              </div>
            </div>
            <Button 
              className="w-full custom-gradient-bg text-white sketch-button border-2 border-black hover:bg-gradient-to-br hover:from-indigo-700 hover:to-purple-700"
              onClick={() => window.open('https://forms.gle/mTjevZH57N6PGvHdA', '_blank')}
            >
              Try Content Relay on LinkedIn 🎯
            </Button>
          </CardContent>
        </Card>

        {/* Automation Expert Plan */}
        <Card className="sketch-card bg-white relative">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-2xl font-bold text-[#1A1A1A]">
                Automation Expert Plan 🤖
              </CardTitle>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Expert
              </div>
            </div>
            <CardDescription className="text-lg text-gray-600">
              Designed for automation experts
            </CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold text-[#1A1A1A]">₹2,999</span>
              <span className="text-gray-600 ml-2">one-time</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Full automation setup using n8n + AI Agent</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Powered by Google Gemini AI</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">No-code system with auto-posting</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Lifetime access + onboarding support</span>
              </div>
            </div>
            <Button 
              className="w-full bg-purple-600 text-white sketch-button border-2 border-black hover:bg-purple-700"
              onClick={() => window.open('https://topmate.io/muhammad_adnan10/1610387', '_blank')}
            >
              Get Automation Setup ⚡
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <div className="text-center">
        <div className="bg-gray-50 sketch-card p-6 inline-block">
          <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
            Need help with implementation? 🤝
          </h3>
          <p className="text-gray-600 mb-4">
            Get personalized assistance to set up your automation system
          </p>
          <Button 
            variant="outline"
            className="white-outline-button"
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
