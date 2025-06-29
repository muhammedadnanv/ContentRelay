
import { Play, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoSection = () => {
  const handleWatchVideo = () => {
    window.open("https://youtube.com/shorts/aggHTtF3wvc?si=bJsbvdTpvFMf3UHf", "_blank");
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 px-4">
              See How It Works 🎥
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
              Watch a complete walkthrough of our LinkedIn content automation workflow in action
            </p>
          </div>

          {/* Video Player Container */}
          <div className="bg-white sketch-card p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <div className="relative aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg overflow-hidden group cursor-pointer" onClick={handleWatchVideo}>
              {/* Video Thumbnail/Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 sm:p-6 lg:p-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-indigo-600 ml-1" />
                </div>
              </div>
              
              {/* Overlay Content */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">
                  LinkedIn Content Automation Demo
                </h3>
                <p className="text-white/90 text-xs sm:text-sm">
                  Complete workflow walkthrough • 5 min watch
                </p>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="text-center">
            <div className="bg-light/50 sketch-card p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-3 sm:mb-4">
                What You'll See in This Video:
              </h3>
              <ul className="text-left text-sm sm:text-base text-gray-700 space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2 font-bold">•</span>
                  How to input your content ideas and prompts
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2 font-bold">•</span>
                  AI agent structuring your content automatically
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2 font-bold">•</span>
                  Gemini AI writing professional LinkedIn posts
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2 font-bold">•</span>
                  n8n automation workflows in action
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2 font-bold">•</span>
                  Automatic publishing to LinkedIn via API
                </li>
              </ul>
            </div>

            <Button 
              variant="outline"
              className="white-outline-button text-sm sm:text-base"
              onClick={handleWatchVideo}
            >
              <Youtube className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Watch Full Demo on YouTube
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
