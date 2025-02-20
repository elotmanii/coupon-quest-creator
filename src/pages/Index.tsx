
import { useState } from "react";
import CouponCard from "@/components/CouponCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { ShoppingCart, Facebook, Send } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["Electronics", "Fashion", "Books", "Home", "Beauty"];

const SAMPLE_COUPONS = [
  {
    id: 1,
    code: "SUMMER2024",
    discount: "25% OFF",
    description: "Get 25% off on all summer essentials",
    expiryDate: "2024-08-31",
    category: "Fashion",
    productImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80",
    amazonLink: "https://www.amazon.com/deals",
    marketplace: "amazon" as const
  },
  {
    id: 2,
    code: "TECH2024",
    discount: "₹1500 OFF",
    description: "Save ₹1500 on electronics",
    expiryDate: "2024-07-15",
    category: "Electronics",
    productImage: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
    amazonLink: "https://www.aliexpress.com/deals",
    marketplace: "aliexpress" as const
  },
  {
    id: 3,
    code: "ALIBOOKS15",
    discount: "15% Off",
    description: "Save on bestselling Books across all genres on AliExpress",
    expiryDate: "2024-04-30",
    category: "Books",
    productImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80",
    amazonLink: "https://www.aliexpress.com/books",
    marketplace: "aliexpress" as const
  },
  {
    id: 4,
    code: "ALIHOME25",
    discount: "25% Off",
    description: "Discount on premium Home items from AliExpress",
    expiryDate: "2024-05-15",
    category: "Home",
    productImage: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80",
    amazonLink: "https://www.aliexpress.com/home",
    marketplace: "aliexpress" as const
  },
  {
    id: 5,
    code: "BEAUTY40",
    discount: "40% Off",
    description: "Save big on luxury Beauty products including skincare, makeup, and fragrances",
    expiryDate: "2024-04-20",
    category: "Beauty",
    productImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
    amazonLink: "https://www.amazon.com/beauty",
    marketplace: "amazon" as const
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMarketplace, setSelectedMarketplace] = useState("all");

  const filteredCoupons = SAMPLE_COUPONS.filter((coupon) => {
    const matchesSearch = coupon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || coupon.category === selectedCategory;
    const matchesMarketplace = selectedMarketplace === "all" || coupon.marketplace === selectedMarketplace;
    return matchesSearch && matchesCategory && matchesMarketplace;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232F3E] to-[#131921] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="flex items-center gap-2 text-[#FF9900] mb-6">
            <ShoppingCart className="h-8 w-8" />
            <span className="text-2xl font-bold">CouponQuest</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Amazing Deals
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Discover the best coupons and save on your next purchase
          </p>

          {/* Social Media Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="bg-[#0088cc] text-white hover:bg-[#0088cc]/90 border-none"
              onClick={() => window.open('https://t.me/your-group', '_blank')}
            >
              <Send className="mr-2 h-4 w-4" />
              Join Telegram
            </Button>
            <Button
              variant="outline"
              className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-none"
              onClick={() => window.open('https://facebook.com/groups/your-group', '_blank')}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Join Facebook Group
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="max-w-4xl mx-auto mb-12 space-y-8">
          {/* Search Bar */}
          <SearchBar onSearch={setSearchQuery} />

          <div className="flex flex-col items-center gap-6">
            {/* Marketplace Toggle */}
            <div className="bg-white/10 p-1 rounded-lg">
              <ToggleGroup 
                type="single" 
                value={selectedMarketplace}
                onValueChange={(value) => {
                  if (value) setSelectedMarketplace(value);
                  if (!value) setSelectedMarketplace("all");
                }}
                className="flex gap-1"
              >
                <ToggleGroupItem 
                  value="all" 
                  className="px-4 py-2 rounded-md data-[state=on]:bg-[#FF9900] data-[state=on]:text-white text-white"
                >
                  All
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="amazon" 
                  className="px-4 py-2 rounded-md data-[state=on]:bg-[#FF9900] data-[state=on]:text-white text-white"
                >
                  Amazon
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="aliexpress" 
                  className="px-4 py-2 rounded-md data-[state=on]:bg-[#FF9900] data-[state=on]:text-white text-white"
                >
                  AliExpress
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Category Filter */}
            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => (
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
      </div>
    </div>
  );
};

export default Index;
