import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
interface ProductCardProps {
  product: Product;
}
export const ProductCard = ({
  product
}: ProductCardProps) => {
  const {
    addToCart
  } = useCart();

  // Determine if product is made in India (for demonstration - every 3rd product)
  const isMadeInIndia = parseInt(product.id) % 3 === 0;
  return <div className="group bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-100 relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          
          {/* Sales badge */}
          {product.onSale && <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              <span>{Math.round((product.price - (product.salePrice || 0)) / product.price * 100)}% OFF</span>
            </div>}
          
          {isMadeInIndia && <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              Made in India
            </div>}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-medium mb-1 truncate text-orange-500">{product.name}</h3>
          <p className="font-semibold mb-2 text-gray-800 flex items-center">
            {product.onSale ? <>
                <span className="text-orange-500">{formatPrice(product.salePrice || 0)}</span>
                <span className="text-gray-400 text-sm line-through ml-2">{formatPrice(product.price)}</span>
              </> : formatPrice(product.price)}
          </p>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-sm text-yellow-600">
            {product.inventory > 0 ? `${product.inventory} in stock` : "Out of stock"}
          </span>
          <Button variant="ghost" size="icon" onClick={() => addToCart(product)} disabled={product.inventory <= 0} className="hover:bg-yellow-100 text-orange-500">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>;
};