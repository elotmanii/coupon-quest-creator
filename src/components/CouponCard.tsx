
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Coupon } from "@/types";
import { toast } from "sonner";

const CouponCard = ({ coupon }: { coupon: Coupon }) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    toast.success("Código copiado al portapapeles");
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-40">
        <img
          src={coupon.productImage}
          alt={coupon.description}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-semibold text-[#FF9900]">
          {coupon.discount}
        </div>
      </div>

      <div className="p-3 space-y-2">
        <p className="text-sm line-clamp-2 h-10 text-gray-600">
          {coupon.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#FF9900]">
              €{coupon.afterPrice}
            </span>
            {coupon.beforePrice && (
              <span className="text-sm text-gray-400 line-through">
                €{coupon.beforePrice}
              </span>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="text-xs border-[#FF9900] text-[#FF9900] hover:bg-[#FF9900] hover:text-white"
            onClick={handleCopyCode}
          >
            <Copy className="mr-1 h-3 w-3" />
            {coupon.code}
          </Button>
        </div>

        <Button
          className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-white text-sm h-8"
          onClick={() => window.open(coupon.amazonLink, "_blank")}
        >
          Ver Oferta
        </Button>
      </div>
    </div>
  );
};

export default CouponCard;
