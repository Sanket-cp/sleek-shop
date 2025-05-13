
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/formatters";
import { Navigate, useNavigate } from "react-router-dom";
import { ShippingAddress } from "@/types";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// List of Indian states
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", 
  "Ladakh", "Lakshadweep", "Puducherry"
];

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }
  
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: "",
    address: "",
    city: "",
    state: "Maharashtra", // Default to a popular Indian state
    zipCode: "",
    country: "India" // Default to India
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStateChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      state: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      // Generate an order ID
      const orderId = `ORD-${Date.now().toString().slice(-7)}`;
      
      // Clear cart and navigate to order confirmation
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Street Address / Flat No. / Building
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Flat No., Building, Street Name, Landmark"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City / Town / Village
                      </label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State / Union Territory
                      </label>
                      <Select 
                        defaultValue={formData.state}
                        onValueChange={handleStateChange}
                      >
                        <SelectTrigger id="state" className="w-full">
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDIAN_STATES.map(state => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                        PIN Code
                      </label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="6-digit PIN code"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Format: 6-digit PIN code (e.g., 400001)</p>
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        readOnly
                        className="bg-gray-50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-brand-purple hover:bg-opacity-90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Place Order"}
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      Note: This is a demo. No payment will be processed.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-4">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between">
                    <div className="flex gap-2">
                      <span className="text-gray-600">
                        {item.quantity}x
                      </span>
                      <span className="truncate max-w-[150px]">
                        {item.product.name}
                      </span>
                    </div>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-medium mt-2">
                  <span>Total</span>
                  <span className="text-brand-purple">{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
