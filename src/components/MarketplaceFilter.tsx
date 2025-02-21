
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
    <div className="bg-[#2D3541] p-4 rounded-lg w-full max-w-md">
      <RadioGroup
        value={selectedMarketplace}
        onValueChange={onMarketplaceChange}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="all" 
            id="all"
            className="text-[#FF9900] border-white/50 data-[state=checked]:border-[#FF9900] data-[state=checked]:text-[#FF9900]"
          />
          <label 
            htmlFor="all" 
            className="text-sm font-medium leading-none text-white cursor-pointer"
          >
            Todos
          </label>
        </div>
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={supplier.id} 
              id={supplier.id}
              className="text-[#FF9900] border-white/50 data-[state=checked]:border-[#FF9900] data-[state=checked]:text-[#FF9900]"
            />
            <label 
              htmlFor={supplier.id} 
              className="text-sm font-medium leading-none text-white cursor-pointer"
            >
              {supplier.name}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default MarketplaceFilter;
