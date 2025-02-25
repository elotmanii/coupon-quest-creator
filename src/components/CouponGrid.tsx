
import CouponCard from "@/components/CouponCard";
import { type MarketplaceType } from "@/types";

interface Coupon {
  id: number;
  discount: string;
  description: string;
  category: string;
  productImage: string;
  amazonLink: string;
  marketplace: MarketplaceType;
  beforePrice?: number;
  afterPrice?: number;
}

interface CouponGridProps {
  coupons: Coupon[];
}

const CouponGrid = ({ coupons }: CouponGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.id}
          discount={coupon.discount}
          description={coupon.description}
          category={coupon.category}
          productImage={coupon.productImage}
          amazonLink={coupon.amazonLink}
          marketplace={coupon.marketplace}
          beforePrice={coupon.beforePrice}
          afterPrice={coupon.afterPrice}
        />
      ))}
      
      {coupons.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-400 text-lg">No se encontraron cupones que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default CouponGrid;
