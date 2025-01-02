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
    <div className="group relative overflow-hidden rounded-xl bg-white/30 p-6 shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-sm border border-white/20">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
          {category}
        </span>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">{discount}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
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

        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Expires: {expiryDate}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 rounded-lg bg-muted/30 px-4 py-2 font-mono text-sm">
            {code}
          </div>
          <Button onClick={copyToClipboard} variant="secondary" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;