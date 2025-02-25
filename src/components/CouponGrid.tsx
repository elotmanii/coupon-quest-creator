
import { Coupon } from "@/types";
import CouponCard from "./CouponCard";

interface CouponGridProps {
  coupons: Coupon[];
}

const CouponGrid = ({ coupons }: CouponGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {coupons.map((coupon) => (
        <div key={coupon.id} className="max-w-[300px] mx-auto w-full">
          <CouponCard coupon={coupon} />
        </div>
      ))}
    </div>
  );
};

export default CouponGrid;
