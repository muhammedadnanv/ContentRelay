
import { Instagram, Linkedin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-[#1A1A1A]">
              Content Relay
            </h1>
            <p className="text-xs text-gray-600 hidden sm:block">LinkedIn Automation Service</p>
          </div>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-gray-600 hover:text-[#1A1A1A] p-2"
            >
              <a
                href="https://www.instagram.com/ai.adnanvv/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
              >
                <Instagram className="h-4 w-4 lg:h-5 lg:w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-gray-600 hover:text-[#1A1A1A] p-2"
            >
              <a
                href="https://www.linkedin.com/in/muhamm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="h-4 w-4 lg:h-5 lg:w-5" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-8">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-600 hover:text-[#1A1A1A] flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <a
                  href="https://www.instagram.com/ai.adnanvv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Instagram</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-600 hover:text-[#1A1A1A] flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <a
                  href="https://www.linkedin.com/in/muhamm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
