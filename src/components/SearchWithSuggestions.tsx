
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { useOnClickOutside } from "@/hooks/use-mobile";

interface SearchProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export const SearchWithSuggestions = ({ isMobile = false, onClose }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useOnClickOutside(searchRef, () => setShowSuggestions(false));

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filteredProducts = products.filter((product) => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      
      setSuggestions(filteredProducts);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);
  
  const handleProductSelect = (productId: string) => {
    navigate(`/products/${productId}`);
    setShowSuggestions(false);
    setSearchTerm("");
    if (onClose) onClose();
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
      if (onClose) onClose();
    }
  };

  return (
    <div className={`relative w-full ${isMobile ? "" : "max-w-md"}`} ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-50 rounded-md px-3">
        <Search className="h-4 w-4 text-gray-400" />
        <Input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products in India..."
          className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
          autoFocus={isMobile}
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchTerm("")}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-auto">
          <div className="py-1">
            {suggestions.map((product) => (
              <div 
                key={product.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleProductSelect(product.id)}
              >
                <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-50 border">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="ml-3">
                  <div className="font-medium text-sm">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.onSale ? 'On Sale' : 'Regular Price'}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t px-4 py-2">
            <Button 
              variant="link" 
              size="sm" 
              className="w-full text-center text-brand-purple"
              onClick={handleSearchSubmit}
            >
              See all results for "{searchTerm}"
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
