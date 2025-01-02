import { useState } from "react";
import { Copy, Clock, Heart, ExternalLink, Facebook, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CouponCardProps {
  code: string;
  discount: string;
  description: string;
  expiryDate: string;
  category: string;
  productImage?: string;
  amazonLink?: string;
}

const CouponCard = ({ 
  code, 
  discount, 
  description, 
  expiryDate, 
  category,
  productImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  amazonLink = "https://www.amazon.com"
}: CouponCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied to clipboard!");
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? "Removed from favorites" : "Added to favorites");
  };

  const handleAmazonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(amazonLink, '_blank');
  };

  const shareOnFacebook = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = encodeURIComponent(amazonLink);
    const text = encodeURIComponent(`Check out this amazing deal: ${discount} - ${description}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const shareOnTelegram = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(`${discount} - ${description}\n\nUse code: ${code}\n\nLink: ${amazonLink}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(amazonLink)}&text=${text}`, '_blank');
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-white/10 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-sm border border-white/10"
      onClick={copyToClipboard}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#232F3E]/5 to-[#FF9900]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex flex-col gap-6 mb-4">
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src={productImage} 
              alt="Product" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          <div className="flex-1">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#FF9900]/20 text-[#FF9900] mb-2">
              {category}
            </span>
            
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-semibold text-white mb-2">{discount}</h3>
              <Button
                variant="ghost"
                size="icon"
                className={`transition-colors duration-200 ${
                  isFavorited ? "text-red-500" : "text-gray-400"
                }`}
                onClick={toggleFavorite}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
              </Button>
            </div>
            
            <p className="text-sm text-gray-300 mb-2">{description}</p>
            
            <div className="flex items-center gap-2">
              <Button
                variant="link"
                className="text-[#FF9900] hover:text-[#FF9900]/80 p-0 h-auto font-medium text-sm"
                onClick={handleAmazonClick}
              >
                View on Amazon <ExternalLink className="ml-1 h-4 w-4" />
              </Button>

              <div className="flex gap-2 ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#1877F2] hover:text-[#1877F2]/80"
                  onClick={shareOnFacebook}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#0088cc] hover:text-[#0088cc]/80"
                  onClick={shareOnTelegram}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">Expires: {expiryDate}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 rounded-lg bg-[#232F3E]/30 px-4 py-2 font-mono text-sm text-white">
            {code}
          </div>
          <Button 
            onClick={copyToClipboard}
            variant="secondary" 
            size="icon"
            className="bg-[#FF9900] hover:bg-[#FF9900]/80 text-white"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;