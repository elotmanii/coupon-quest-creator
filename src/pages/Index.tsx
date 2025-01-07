import { useState } from "react";
import CouponCard from "@/components/CouponCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { ShoppingCart } from "lucide-react";

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
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 text-[#FF9900] mb-4">
            <ShoppingCart className="h-8 w-8" />
            <span className="text-2xl font-bold">CouponQuest</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Amazing Deals
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Discover the best Amazon coupons and save on your next purchase
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <SearchBar onSearch={setSearchQuery} />

            <div className="flex justify-center mt-8">
              <CategoryFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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

          {/* Desktop Ad Banner */}
          <div className="hidden lg:block w-64 h-[600px] sticky top-8">
            <a 
              href="https://www.amazon.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full overflow-hidden rounded-lg shadow-xl transition-transform hover:scale-[1.02] border border-gray-200"
            >
              <div className="absolute top-0 left-0 bg-yellow-400 text-xs px-2 py-1 rounded-br-lg text-black font-medium">
                Ad
              </div>
              <img
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                alt="Special Offer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-lg font-bold">Special Offer</p>
                <p className="text-white/80 text-sm">Limited Time Deal</p>
                <p className="text-[#FF9900] text-sm mt-2 hover:underline">Shop Now ›</p>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile Ad Banner - Moved to bottom */}
        <div className="lg:hidden w-full mt-8">
          <a 
            href="https://www.amazon.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-[90%] mx-auto h-[200px] overflow-hidden rounded-lg shadow-xl transition-transform hover:scale-[1.02] border border-gray-200 relative"
          >
            <div className="absolute top-0 left-0 bg-yellow-400 text-xs px-2 py-1 rounded-br-lg text-black font-medium z-10">
              Ad
            </div>
            <img
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
              alt="Special Offer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-lg font-bold">Special Offer</p>
              <p className="text-white/80 text-sm">Limited Time Deal</p>
              <p className="text-[#FF9900] text-sm mt-2 hover:underline">Shop Now ›</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;