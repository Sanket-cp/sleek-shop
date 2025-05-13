
import { CartItem as CartItemType } from "@/types";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 py-4 border-b">
      <Link to={`/products/${product.id}`} className="flex-shrink-0">
        <div className="h-24 w-24 bg-gray-100 rounded-md overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col flex-grow md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex-grow">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-medium text-gray-900 hover:text-brand-purple">{product.name}</h3>
          </Link>
          <p className="text-brand-purple font-medium">{formatPrice(product.price)}</p>
        </div>
        <div className="flex justify-between items-center md:gap-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="mx-2 w-8 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={quantity >= product.inventory}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center gap-2 md:ml-4">
            <p className="font-medium text-right w-20">{formatPrice(product.price * quantity)}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-red-500"
              onClick={() => removeFromCart(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
