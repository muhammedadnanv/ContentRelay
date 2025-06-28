
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Users, Gift } from "lucide-react";
import ReferralModal from "./ReferralModal";

const ReferralSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4 sm:mb-6">
              Share Content Relay & Help Others Automate Their LinkedIn 🤝
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Know someone who could benefit from LinkedIn automation workflows? Share Content Relay and help them save hours every week!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="text-center p-4 sm:p-6 bg-white sketch-card">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Share2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-2">
                Easy Sharing
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Get your unique referral link and share across social media platforms
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-white sketch-card">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-2">
                Help Others
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Introduce your network to professional LinkedIn automation workflows
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-white sketch-card">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-2">
                Build Community
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Join a community of professionals leveraging automation for growth
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="custom-gradient-bg text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium sketch-button border-2 border-black hover:bg-gradient-to-br hover:from-indigo-700 hover:to-purple-700"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share Content Relay
            </Button>
          </div>
        </div>
      </div>

      <ReferralModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default ReferralSection;
