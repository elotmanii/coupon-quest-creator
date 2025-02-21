
import { ShoppingCart, Facebook, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
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
        {/* Telegram Button/Icon */}
        <Button
          variant="outline"
          className="bg-[#0088cc] text-white hover:bg-[#0088cc]/90 border-none md:flex hidden"
          onClick={() => window.open('https://t.me/your-group', '_blank')}
        >
          <Send className="mr-2 h-4 w-4" />
          Unirse a Telegram
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-[#0088cc] text-white hover:bg-[#0088cc]/90 border-none md:hidden flex animate-bounce hover:animate-none"
          onClick={() => window.open('https://t.me/your-group', '_blank')}
        >
          <Send className="h-5 w-5" />
        </Button>

        {/* Facebook Button/Icon */}
        <Button
          variant="outline"
          className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-none md:flex hidden"
          onClick={() => window.open('https://facebook.com/groups/your-group', '_blank')}
        >
          <Facebook className="mr-2 h-4 w-4" />
          Unirse a Facebook
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-none md:hidden flex animate-bounce hover:animate-none"
          onClick={() => window.open('https://facebook.com/groups/your-group', '_blank')}
        >
          <Facebook className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
