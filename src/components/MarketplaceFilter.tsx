
interface MarketplaceFilterProps {
  selectedMarketplace: string;
  onMarketplaceChange: (value: string) => void;
  suppliers: Array<{
    id: string;
    name: string;
  }>;
}

const MarketplaceFilter = ({ selectedMarketplace, onMarketplaceChange, suppliers }: MarketplaceFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onMarketplaceChange("all")}
        className={`px-4 py-2 rounded-full transition-colors ${
          selectedMarketplace === "all"
            ? "bg-[#FF9900] text-white"
            : "text-white hover:bg-white/10"
        }`}
      >
        Todos
      </button>
      {suppliers.map((supplier) => (
        <button
          key={supplier.id}
          onClick={() => onMarketplaceChange(supplier.id)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedMarketplace === supplier.id
              ? "bg-[#FF9900] text-white"
              : "text-white hover:bg-white/10"
          }`}
        >
          {supplier.name}
        </button>
      ))}
    </div>
  );
};

export default MarketplaceFilter;
