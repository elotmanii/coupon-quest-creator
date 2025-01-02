import { useState } from "react";
import { Copy, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CouponCardProps {
  code: string;
  discount: string;
  description: string;
  expiryDate: string;
  category: string;
}

const CouponCard = ({ code, discount, description, expiryDate, category }: CouponCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied to clipboard!");
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-white/10 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-sm border border-white/10 cursor-pointer"
      onClick={copyToClipboard}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#232F3E]/5 to-[#FF9900]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#FF9900]/20 text-[#FF9900] mb-4">
          {category}
        </span>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">{discount}</h3>
            <p className="text-sm text-gray-300">{description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`transition-colors duration-200 ${
              isFavorited ? "text-red-500" : "text-gray-400"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
          </Button>
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
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard();
            }} 
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