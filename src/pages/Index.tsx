import { useState } from "react";
import CouponCard from "@/components/CouponCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

const CATEGORIES = ["Electronics", "Fashion", "Books", "Home", "Beauty"];

const SAMPLE_COUPONS = [
  {
    id: 1,
    code: "SAVE20",
    discount: "20% Off",
    description: "Save 20% on Electronics",
    expiryDate: "2024-05-01",
    category: "Electronics",
  },
  {
    id: 2,
    code: "FASHION30",
    discount: "30% Off",
    description: "Get 30% off on Fashion items",
    expiryDate: "2024-04-15",
    category: "Fashion",
  },
  {
    id: 3,
    code: "BOOKS15",
    discount: "15% Off",
    description: "Save on your favorite books",
    expiryDate: "2024-04-30",
    category: "Books",
  },
  {
    id: 4,
    code: "HOME25",
    discount: "25% Off",
    description: "Discount on Home items",
    expiryDate: "2024-05-15",
    category: "Home",
  },
  {
    id: 5,
    code: "BEAUTY40",
    discount: "40% Off",
    description: "Save big on Beauty products",
    expiryDate: "2024-04-20",
    category: "Beauty",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCoupons = SAMPLE_COUPONS.filter((coupon) => {
    const matchesSearch = coupon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || coupon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Amazing Deals
          </h1>
          <p className="text-lg text-gray-600">
            Discover the best Amazon coupons and save on your next purchase
          </p>
        </div>

        <SearchBar onSearch={setSearchQuery} />

        <div className="flex justify-center">
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              code={coupon.code}
              discount={coupon.discount}
              description={coupon.description}
              expiryDate={coupon.expiryDate}
              category={coupon.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;