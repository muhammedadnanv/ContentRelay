
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Share2, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralModal = ({ isOpen, onClose }: ReferralModalProps) => {
  const [email, setEmail] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const { toast } = useToast();

  const generateReferralLink = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to generate a referral link",
        variant: "destructive",
      });
      return;
    }

    const encodedEmail = encodeURIComponent(email);
    const link = `${window.location.origin}?ref=${encodedEmail}`;
    setReferralLink(link);
    
    toast({
      title: "Referral Link Generated!",
      description: "Your unique referral link is ready to share",
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const shareMessage = "Transform your LinkedIn presence with AI-powered automation workflows! Save 5-10 hours weekly with Content Relay's professional automation setup.";

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(referralLink)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareMessage} ${referralLink}`)}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#1A1A1A]">
            Share Content Relay 🚀
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Your Email (for referral tracking)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button 
            onClick={generateReferralLink}
            className="w-full custom-gradient-bg text-white sketch-button border-2 border-black"
          >
            Generate Referral Link
          </Button>

          {referralLink && (
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Your Referral Link
                </Label>
                <div className="flex mt-1">
                  <Input
                    value={referralLink}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button
                    onClick={copyToClipboard}
                    className="rounded-l-none border-l-0"
                    variant="outline"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Share on Social Media
                </Label>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={shareOnTwitter}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Twitter className="h-4 w-4 mr-1" />
                    Twitter
                  </Button>
                  <Button
                    onClick={shareOnLinkedIn}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Linkedin className="h-4 w-4 mr-1" />
                    LinkedIn
                  </Button>
                  <Button
                    onClick={shareOnWhatsApp}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralModal;
