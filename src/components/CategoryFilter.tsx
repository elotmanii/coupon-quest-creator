
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === "all" ? "default" : "ghost"}
        onClick={() => onSelectCategory("all")}
        className={`rounded-full ${
          selectedCategory === "all"
            ? "bg-[#FF9900] hover:bg-[#FF9900]/80"
            : "text-white hover:bg-white/10"
        }`}
      >
        Todos
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "ghost"}
          onClick={() => onSelectCategory(category)}
          className={`rounded-full ${
            selectedCategory === category
              ? "bg-[#FF9900] hover:bg-[#FF9900]/80"
              : "text-white hover:bg-white/10"
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
