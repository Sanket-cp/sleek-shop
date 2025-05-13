
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <div className="max-w-2xl mx-auto text-center bg-white border rounded-lg shadow-sm p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="font-medium">Order Reference</p>
            <p className="text-xl text-brand-purple">{orderId}</p>
          </div>
          
          <p className="text-gray-600 mb-8">
            A confirmation email has been sent to your email address with the order details.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/orders">Track Your Order</Link>
            </Button>
            <Button asChild className="bg-brand-purple hover:bg-opacity-90">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
