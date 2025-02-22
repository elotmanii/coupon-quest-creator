
import { X } from "lucide-react";

interface AdBannerProps {
  onClose: () => void;
  image?: string;
}

const AdBanner = ({ 
  onClose,
  image = "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80" 
}: AdBannerProps) => {
  return (
    <div className="relative mb-8 bg-[#F97316] rounded-lg overflow-hidden animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center">
        {/* Image Container */}
        <div className="w-full sm:w-1/3 h-40 sm:h-auto relative">
          <img 
            src={image}
            alt="Promotional banner"
            className="w-full h-full object-cover"
            loading="lazy"
            width={800}
            height={400}
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80";
            }}
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 p-4 text-white">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-xl sm:text-2xl mb-2">¡Oferta Especial! 🎉</p>
            <p className="text-sm sm:text-base">Obtén un 20% extra en tu primera compra</p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-1.5 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
          aria-label="Cerrar banner"
        >
          <X className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default AdBanner;
