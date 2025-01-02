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
    description: "Save 20% on the latest Electronics including smartphones, laptops, and accessories",
    expiryDate: "2024-05-01",
    category: "Electronics",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    amazonLink: "https://www.amazon.com/electronics"
  },
  {
    id: 2,
    code: "FASHION30",
    discount: "30% Off",
    description: "Get 30% off on trending Fashion items including clothing, shoes, and accessories",
    expiryDate: "2024-04-15",
    category: "Fashion",
    productImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80",
    amazonLink: "https://www.amazon.com/fashion"
  },
  {
    id: 3,
    code: "BOOKS15",
    discount: "15% Off",
    description: "Save on bestselling Books across all genres including fiction, non-fiction, and educational",
    expiryDate: "2024-04-30",
    category: "Books",
    productImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80",
    amazonLink: "https://www.amazon.com/books"
  },
  {
    id: 4,
    code: "HOME25",
    discount: "25% Off",
    description: "Discount on premium Home items including furniture, decor, and kitchen essentials",
    expiryDate: "2024-05-15",
    category: "Home",
    productImage: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80",
    amazonLink: "https://www.amazon.com/home"
  },
  {
    id: 5,
    code: "BEAUTY40",
    discount: "40% Off",
    description: "Save big on luxury Beauty products including skincare, makeup, and fragrances",
    expiryDate: "2024-04-20",
    category: "Beauty",
    productImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
    amazonLink: "https://www.amazon.com/beauty"
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
    <div className="min-h-screen bg-gradient-to-br from-[#232F3E] to-[#131921] px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-fade-in">
            Amazing Deals
          </h1>
          <p className="text-lg text-gray-300 animate-fade-in">
            Discover the best Amazon coupons and save on your next purchase
          </p>
        </div>

        <SearchBar onSearch={setSearchQuery} />

        <div className="flex justify-center animate-fade-in">
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredCoupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              code={coupon.code}
              discount={coupon.discount}
              description={coupon.description}
              expiryDate={coupon.expiryDate}
              category={coupon.category}
              productImage={coupon.productImage}
              amazonLink={coupon.amazonLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
