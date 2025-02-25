import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AdBanner from "@/components/AdBanner";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import MarketplaceFilter from "@/components/MarketplaceFilter";
import CouponGrid from "@/components/CouponGrid";
import type { MarketplaceType, Supplier } from "@/types";

const CATEGORIES = ["Electrónica", "Moda", "Libros", "Hogar", "Belleza"];

const SUPPLIERS: Supplier[] = [
  { id: "amazon", name: "Amazon" },
  { id: "aliexpress", name: "AliExpress" },
  { id: "ebay", name: "eBay" }
];

const SAMPLE_COUPONS = [
  {
    id: 1,
    code: "VERANO2024",
    discount: "25% DESCUENTO",
    description: "Obtén 25% de descuento en todos los artículos de verano",
    category: "Moda",
    productImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80",
    amazonLink: "https://www.amazon.com/deals",
    marketplace: "amazon" as MarketplaceType,
    beforePrice: 299,
    afterPrice: 224
  },
  {
    id: 2,
    code: "TECH2024",
    discount: "€150 DESCUENTO",
    description: "Ahorra €150 en electrónica",
    category: "Electrónica",
    productImage: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
    amazonLink: "https://www.aliexpress.com/deals",
    marketplace: "aliexpress" as MarketplaceType,
    beforePrice: 499,
    afterPrice: 349
  },
  {
    id: 3,
    code: "LIBROS15",
    discount: "15% Descuento",
    description: "Ahorra en los libros más vendidos de todos los géneros en AliExpress",
    category: "Libros",
    productImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80",
    amazonLink: "https://www.aliexpress.com/books",
    marketplace: "aliexpress" as MarketplaceType,
    beforePrice: 99,
    afterPrice: 84
  },
  {
    id: 4,
    code: "HOGAR25",
    discount: "25% Descuento",
    description: "Descuento en artículos premium para el hogar de AliExpress",
    category: "Hogar",
    productImage: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80",
    amazonLink: "https://www.aliexpress.com/home",
    marketplace: "aliexpress" as MarketplaceType,
    beforePrice: 399,
    afterPrice: 299
  },
  {
    id: 5,
    code: "BELLEZA40",
    discount: "40% Descuento",
    description: "Ahorra en productos de belleza de lujo, incluyendo skincare, maquillaje y fragancias",
    category: "Belleza",
    productImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
    amazonLink: "https://www.amazon.com/beauty",
    marketplace: "amazon" as MarketplaceType,
    beforePrice: 599,
    afterPrice: 359
  },
  {
    id: 6,
    code: "EBAY2024",
    discount: "30% DESCUENTO",
    description: "Gran descuento en productos seleccionados de eBay",
    category: "Electrónica",
    productImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
    amazonLink: "https://www.ebay.com/deals",
    marketplace: "ebay" as MarketplaceType,
    beforePrice: 799,
    afterPrice: 559
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMarketplace, setSelectedMarketplace] = useState("all");
  const [showAdBanner, setShowAdBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAdBanner(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const filteredCoupons = SAMPLE_COUPONS.filter((coupon) => {
    const matchesSearch = coupon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || coupon.category === selectedCategory;
    const matchesMarketplace = selectedMarketplace === "all" || coupon.marketplace === selectedMarketplace;
    
    const isSupplierEnabled = SUPPLIERS.some(supplier => supplier.id === coupon.marketplace);
    
    return matchesSearch && matchesCategory && matchesMarketplace && isSupplierEnabled;
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

          <div className="flex flex-row items-center justify-center gap-4 flex-wrap md:flex-nowrap">
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
