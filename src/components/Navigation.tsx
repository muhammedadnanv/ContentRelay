
import { Instagram, Linkedin, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
    setIsMenuOpen(false);
  };

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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {/* User Status */}
            {user && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span className="hidden lg:inline">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </div>
            )}

            {/* Social Links */}
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

            {/* Auth Button */}
            <Button
              onClick={handleAuthAction}
              disabled={loading}
              variant={user ? "outline" : "default"}
              size="sm"
              className="ml-2"
            >
              {user ? (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </>
              ) : (
                'Sign In'
              )}
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
            <div className="space-y-4">
              {/* User Status Mobile */}
              {user && (
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{user.user_metadata?.full_name || user.email}</span>
                  </div>
                </div>
              )}

              {/* Social Links Mobile */}
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

              {/* Auth Button Mobile */}
              <div className="px-4">
                <Button
                  onClick={handleAuthAction}
                  disabled={loading}
                  variant={user ? "outline" : "default"}
                  className="w-full"
                >
                  {user ? (
                    <>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </>
                  ) : (
                    'Sign In with LinkedIn'
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
