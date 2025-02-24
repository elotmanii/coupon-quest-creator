
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="w-full max-w-md">
      <Select value={selectedMarketplace} onValueChange={onMarketplaceChange}>
        <SelectTrigger className="w-full bg-[#2D3541] text-white border-white/20 focus:ring-[#FF9900] focus:ring-opacity-50">
          <SelectValue placeholder="Seleccionar Marketplace" />
        </SelectTrigger>
        <SelectContent className="bg-[#2D3541] text-white border-white/20">
          <SelectItem value="all" className="focus:bg-[#FF9900]/20 focus:text-white">
            Todos
          </SelectItem>
          {suppliers.map((supplier) => (
            <SelectItem 
              key={supplier.id} 
              value={supplier.id}
              className="focus:bg-[#FF9900]/20 focus:text-white"
            >
              {supplier.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MarketplaceFilter;
