
import { useState } from "react";
import CouponCard from "@/components/CouponCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { ShoppingCart, Facebook, Send } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["Electrónica", "Moda", "Libros", "Hogar", "Belleza"];

// Define suppliers array for easy extension
const SUPPLIERS = [
  {
    id: "amazon",
    name: "Amazon",
    primaryColor: "#FF9900",
    baseUrl: "https://www.amazon.com"
  },
  {
    id: "aliexpress",
    name: "AliExpress",
    primaryColor: "#ff4747",
    baseUrl: "https://www.aliexpress.com"
  }
] as const;

type MarketplaceType = typeof SUPPLIERS[number]['id'];

const SAMPLE_COUPONS = [
  {
    id: 1,
    code: "VERANO2024",
    discount: "25% DESCUENTO",
    description: "Obtén 25% de descuento en todos los artículos de verano",
    expiryDate: "31/08/2024",
    category: "Moda",
    productImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80",
    amazonLink: "https://www.amazon.com/deals",
    marketplace: "amazon" as MarketplaceType
  },
  {
    id: 2,
    code: "TECH2024",
    discount: "₹1500 DESCUENTO",
    description: "Ahorra ₹1500 en electrónica",
    expiryDate: "15/07/2024",
    category: "Electrónica",
    productImage: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
    amazonLink: "https://www.aliexpress.com/deals",
    marketplace: "aliexpress" as MarketplaceType
  },
  {
    id: 3,
    code: "LIBROS15",
    discount: "15% Descuento",
    description: "Ahorra en los libros más vendidos de todos los géneros en AliExpress",
    expiryDate: "30/04/2024",
    category: "Libros",
    productImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80",
    amazonLink: "https://www.aliexpress.com/books",
    marketplace: "aliexpress" as MarketplaceType
  },
  {
    id: 4,
    code: "HOGAR25",
    discount: "25% Descuento",
    description: "Descuento en artículos premium para el hogar de AliExpress",
    expiryDate: "15/05/2024",
    category: "Hogar",
    productImage: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80",
    amazonLink: "https://www.aliexpress.com/home",
    marketplace: "aliexpress" as MarketplaceType
  },
  {
    id: 5,
    code: "BELLEZA40",
    discount: "40% Descuento",
    description: "Ahorra en productos de belleza de lujo, incluyendo skincare, maquillaje y fragancias",
    expiryDate: "20/04/2024",
    category: "Belleza",
    productImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
    amazonLink: "https://www.amazon.com/beauty",
    marketplace: "amazon" as MarketplaceType
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
            <span className="text-2xl font-bold">CuponQuest</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Ofertas Increíbles
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Descubre los mejores cupones y ahorra en tu próxima compra
          </p>

          {/* Social Media Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              className="bg-[#0088cc] text-white hover:bg-[#0088cc]/90 border-none"
              onClick={() => window.open('https://t.me/your-group', '_blank')}
            >
              <Send className="mr-2 h-4 w-4" />
              Unirse a Telegram
            </Button>
            <Button
              variant="outline"
              className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-none"
              onClick={() => window.open('https://facebook.com/groups/your-group', '_blank')}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Unirse a Facebook
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="max-w-4xl mx-auto mb-12 space-y-8">
          {/* Search Bar */}
          <SearchBar onSearch={setSearchQuery} />

          <div className="flex flex-col items-center gap-6">
            {/* Marketplace Toggle */}
            <div className="bg-white/10 p-1 rounded-lg w-full max-w-md overflow-x-auto">
              <ToggleGroup 
                type="single" 
                value={selectedMarketplace}
                onValueChange={(value) => {
                  if (value) setSelectedMarketplace(value);
                  if (!value) setSelectedMarketplace("all");
                }}
                className="flex gap-1 min-w-fit"
              >
                <ToggleGroupItem 
                  value="all" 
                  className="px-4 py-2 rounded-md data-[state=on]:bg-[#FF9900] data-[state=on]:text-white text-white whitespace-nowrap"
                >
                  Todos
                </ToggleGroupItem>
                {SUPPLIERS.map((supplier) => (
                  <ToggleGroupItem 
                    key={supplier.id}
                    value={supplier.id} 
                    className={`px-4 py-2 rounded-md data-[state=on]:bg-[${supplier.primaryColor}] data-[state=on]:text-white text-white whitespace-nowrap`}
                  >
                    {supplier.name}
                  </ToggleGroupItem>
                ))}
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
