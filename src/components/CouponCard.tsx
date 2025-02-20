
import { useState } from "react";
import { Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SUPPLIERS = [
  {
    id: "amazon",
    name: "Amazon",
    primaryColor: "#FF9900",
    baseUrl: "https://www.amazon.com"
  },
  {
    id: "aliexpress",
    name: "AliExpress",
    primaryColor: "#ff4747",
    baseUrl: "https://www.aliexpress.com"
  }
] as const;

type MarketplaceType = typeof SUPPLIERS[number]['id'];

interface CouponCardProps {
  discount: string;
  description: string;
  expiryDate: string;
  category: string;
  productImage?: string;
  amazonLink?: string;
  marketplace?: MarketplaceType;
}

const CouponCard = ({ 
  discount, 
  description, 
  expiryDate, 
  category,
  productImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  amazonLink = "https://www.amazon.com",
  marketplace = "amazon"
}: CouponCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? "Removed from favorites" : "Added to favorites");
  };

  const handleMarketplaceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(amazonLink, '_blank');
  };

  const getMarketplaceColor = () => {
    const supplier = SUPPLIERS.find(s => s.id === marketplace);
    return supplier?.primaryColor || "#FF9900";
  };

  const getMarketplaceName = () => {
    const supplier = SUPPLIERS.find(s => s.id === marketplace);
    return supplier?.name || "Amazon";
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-white/10 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-sm border border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#232F3E]/5 to-[#FF9900]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex flex-col gap-6">
          {/* Image Container with improved sizing and fallback */}
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={imageError ? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" : productImage}
              alt={description}
              onError={handleImageError}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            
            <p className="text-sm text-gray-300 mb-4">{description}</p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center text-sm text-gray-400">
                <span>Expires: {expiryDate}</span>
              </div>
              
              <Button
                onClick={handleMarketplaceClick}
                style={{ 
                  background: `linear-gradient(to right, #232F3E, ${getMarketplaceColor()})`
                }}
                className="w-full hover:opacity-90 text-white"
              >
                View on {getMarketplaceName()}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
