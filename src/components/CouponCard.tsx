import { useState } from "react";
import { Heart, ExternalLink, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { MarketplaceType } from "@/types";

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
  },
  {
    id: "ebay",
    name: "eBay",
    primaryColor: "#0063D1",
    baseUrl: "https://www.ebay.com"
  }
] as const;

interface CouponCardProps {
  discount: string;
  description: string;
  category: string;
  productImage?: string;
  amazonLink?: string;
  marketplace?: MarketplaceType;
  beforePrice?: number;
  afterPrice?: number;
}

const CouponCard = ({ 
  discount, 
  description, 
  category,
  productImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  amazonLink = "https://www.amazon.com",
  marketplace = "amazon",
  beforePrice,
  afterPrice
}: CouponCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? "Eliminado de favoritos" : "Añadido a favoritos");
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: description,
        text: `¡Mira este cupón de descuento: ${discount} en ${description}!`,
        url: amazonLink
      }).catch(() => {
        navigator.clipboard.writeText(amazonLink);
        toast.success("¡Enlace copiado al portapapeles!");
      });
    } else {
      navigator.clipboard.writeText(amazonLink);
      toast.success("¡Enlace copiado al portapapeles!");
    }
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

  const getMarketplaceButtonText = () => {
    const supplier = SUPPLIERS.find(s => s.id === marketplace);
    return `Ver en ${supplier?.name || "Amazon"}`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const calculateDiscount = () => {
    if (beforePrice && afterPrice) {
      const discount = ((beforePrice - afterPrice) / beforePrice) * 100;
      return Math.round(discount);
    }
    return null;
  };

  const getOptimizedImageUrl = (url: string) => {
    if (url.includes('unsplash.com')) {
      return `${url}?w=400&h=400&fit=cover&q=80`;
    }
    return url;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-white/10 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-sm border border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#232F3E]/5 to-[#FF9900]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex flex-col gap-6">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
            )}
            
            <div 
              className="absolute inset-0 bg-center bg-cover blur-xl opacity-50 scale-110"
              style={{
                backgroundImage: `url(${imageError ? getOptimizedImageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80") : getOptimizedImageUrl(productImage)})`,
              }}
            />
            
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={imageError ? getOptimizedImageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80") : getOptimizedImageUrl(productImage)}
                alt={description}
                onError={handleImageError}
                onLoad={handleImageLoad}
                className={`w-full h-full object-contain transition-all duration-500 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } group-hover:scale-110`}
                loading="lazy"
                width={400}
                height={400}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="secondary"
                size="icon"
                className="bg-[#0EA5E9]/20 backdrop-blur-sm hover:bg-[#0EA5E9]/30 text-white"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className={`backdrop-blur-sm ${
                  isFavorited 
                    ? "bg-[#ea384c]/20 hover:bg-[#ea384c]/30 text-[#ea384c]" 
                    : "bg-[#ea384c]/20 hover:bg-[#ea384c]/30 text-white"
                }`}
                onClick={toggleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#FF9900]/20 text-[#FF9900]">
                {category}
              </span>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                marketplace === "amazon" ? "bg-[#FF9900]/20 text-[#FF9900]" :
                marketplace === "aliexpress" ? "bg-[#ff4747]/20 text-[#ff4747]" :
                "bg-[#0063D1]/20 text-[#0063D1]"
              }`}>
                {getMarketplaceName()}
              </span>
            </div>
            
            <h3 className="text-2xl font-semibold text-white">{discount}</h3>
            <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
            
            {beforePrice && afterPrice && (
              <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through">€{beforePrice}</span>
                  <span className="text-white font-semibold">€{afterPrice}</span>
                </div>
                <span className="text-green-500 font-semibold animate-pulse">
                  {calculateDiscount()}% OFF
                </span>
              </div>
            )}
            
            <Button
              onClick={handleMarketplaceClick}
              style={{ 
                background: `linear-gradient(to right, #232F3E, ${getMarketplaceColor()})`
              }}
              className="w-full hover:opacity-90 text-white group"
            >
              {getMarketplaceButtonText()}
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
