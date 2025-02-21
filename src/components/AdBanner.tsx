
import { X } from "lucide-react";

interface AdBannerProps {
  onClose: () => void;
}

const AdBanner = ({ onClose }: AdBannerProps) => {
  return (
    <div className="relative mb-8 bg-[#F97316] rounded-lg p-4 text-white animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="font-semibold">¡Oferta Especial! 🎉</p>
          <p className="text-sm mt-1">Obtén un 20% extra en tu primera compra</p>
        </div>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-1 hover:bg-black/20 rounded-full transition-colors"
          aria-label="Cerrar banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AdBanner;
