
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#1A1A1A]">
              Content Relay
            </h1>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://www.instagram.com/ai.adnanvv/', '_blank')}
              className="flex items-center space-x-2 hover:bg-gray-100"
            >
              <Instagram className="h-4 w-4" />
              <span className="hidden sm:inline">Instagram</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://www.linkedin.com/in/muhamm', '_blank')}
              className="flex items-center space-x-2 hover:bg-gray-100"
            >
              <Linkedin className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
