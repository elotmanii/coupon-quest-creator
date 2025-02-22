
import { useState } from "react";
import Header from "@/components/Header";
import AdBanner from "@/components/AdBanner";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import MarketplaceFilter from "@/components/MarketplaceFilter";
import CouponGrid from "@/components/CouponGrid";
import type { MarketplaceType } from "@/types";

const CATEGORIES = ["Electrónica", "Moda", "Libros", "Hogar", "Belleza"];

const SUPPLIERS = [
  {
    id: "amazon" as const,
    name: "Amazon",
    primaryColor: "#FF9900",
    baseUrl: "https://www.amazon.com"
  },
  {
    id: "aliexpress" as const,
    name: "AliExpress",
    primaryColor: "#ff4747",
    baseUrl: "https://www.aliexpress.com"
  }
];

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
  const [showAdBanner, setShowAdBanner] = useState(true);

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
        <Header />

        {showAdBanner && (
          <AdBanner 
            onClose={() => setShowAdBanner(false)}
            image="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80"
            link="https://www.amazon.com/deals"
          />
        )}

        <div className="max-w-4xl mx-auto mb-12 space-y-8">
          <SearchBar onSearch={setSearchQuery} />

          <div className="flex flex-col items-center gap-6">
            <MarketplaceFilter
              selectedMarketplace={selectedMarketplace}
              onMarketplaceChange={setSelectedMarketplace}
              suppliers={SUPPLIERS}
            />

            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        <CouponGrid coupons={filteredCoupons} />
      </div>
    </div>
  );
};

export default Index;
