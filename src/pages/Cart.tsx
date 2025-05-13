
import { Layout } from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  
  const isCartEmpty = cartItems.length === 0;
  
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Shopping Cart</h1>
        
        {isCartEmpty ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products yet.</p>
            <Button asChild className="bg-brand-purple hover:bg-opacity-90">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Item(s) in Cart</h2>
                  <Button variant="ghost" onClick={clearCart} className="text-gray-500">
                    Clear Cart
                  </Button>
                </div>
                
                <div className="divide-y">
                  {cartItems.map(item => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-brand-purple">{formatPrice(cartTotal)}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Taxes calculated at checkout</p>
                </div>
                
                <Button asChild className="w-full mt-6 bg-brand-purple hover:bg-opacity-90">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                
                <div className="mt-4 text-center">
                  <Link to="/products" className="text-brand-purple text-sm hover:underline">
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
