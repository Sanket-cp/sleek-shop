
import { Order } from "@/types";
import { formatDate, formatPrice } from "@/lib/formatters";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderStatusProps {
  order: Order;
}

export const OrderStatus = ({ order }: OrderStatusProps) => {
  const steps = [
    { id: "pending", label: "Order Placed", icon: Clock },
    { id: "processing", label: "Processing", icon: CheckCircle },
    { id: "shipped", label: "Shipped", icon: Package },
    { id: "delivered", label: "Delivered", icon: Truck }
  ];
  
  // Find the current step index
  const currentStepIndex = steps.findIndex(step => step.id === order.status);
  
  // Estimated delivery time based on status (India-specific)
  const getDeliveryEstimate = () => {
    switch(order.status) {
      case "pending":
        return "Expected delivery in 3-5 days";
      case "processing":
        return "Expected delivery in 2-4 days";
      case "shipped":
        return "Expected delivery in 1-2 days";
      case "delivered":
        return "Delivered";
      default:
        return "";
    }
  };
  
  return (
    <div className="border rounded-lg p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-medium text-lg">Order #{order.id}</h3>
          <p className="text-gray-500">{formatDate(order.date)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-semibold text-brand-purple">{formatPrice(order.total)}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center z-10",
                    index <= currentStepIndex
                      ? "bg-brand-purple text-white" 
                      : "bg-gray-100 text-gray-400"
                  )}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <p 
                  className={cn(
                    "mt-2 text-sm text-center",
                    index <= currentStepIndex ? "font-medium" : "text-gray-500"
                  )}
                >
                  {step.label}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "absolute top-5 left-1/2 w-full h-0.5",
                    index < currentStepIndex ? "bg-brand-purple" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-2">
          {order.status === "pending" && "Your order has been received. We'll process it soon!"}
          {order.status === "processing" && "We're processing your order and preparing it for shipment."}
          {order.status === "shipped" && "Your order is on its way! Track your shipment using India Post or our courier partners."}
          {order.status === "delivered" && "Your order has been delivered. Enjoy your purchase!"}
        </p>
        
        <p className="text-center text-sm font-medium text-brand-purple mt-2">
          {getDeliveryEstimate()}
        </p>
      </div>
      
      <div>
        <h4 className="font-medium mb-3">Shipping address</h4>
        <address className="not-italic text-gray-600">
          {order.shippingAddress.fullName}<br />
          {order.shippingAddress.address}<br />
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
          {order.shippingAddress.country || "India"}
        </address>
      </div>
    </div>
  );
};
