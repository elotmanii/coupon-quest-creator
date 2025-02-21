
import CouponCard from "@/components/CouponCard";
import { type MarketplaceType } from "@/types";

interface Coupon {
  id: number;
  discount: string;
  description: string;
  expiryDate: string;
  category: string;
  productImage: string;
  amazonLink: string;
  marketplace: MarketplaceType;
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
          expiryDate={coupon.expiryDate}
          category={coupon.category}
          productImage={coupon.productImage}
          amazonLink={coupon.amazonLink}
          marketplace={coupon.marketplace}
        />
      ))}
    </div>
  );
};

export default CouponGrid;
