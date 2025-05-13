
import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { OrderStatus } from "@/components/OrderStatus";
import { sampleOrders } from "@/data/products";
import { formatDate, formatPrice } from "@/lib/formatters";
import { NotFound } from "@/pages/NotFound";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the order (for demo, using sampleOrders)
  const order = sampleOrders.find(order => order.id === id);
  
  // If order not found
  if (!order) {
    return <NotFound />;
  }
  
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Order Details - {order.id}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Order Status */}
            <OrderStatus order={order} />
            
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm border mt-6 p-6">
              <h2 className="text-lg font-medium mb-4">Order Items</h2>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.product.id} className="py-4 flex gap-4">
                    <div className="h-20 w-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                      <p className="font-medium text-brand-purple">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="mb-4">
                <p className="flex justify-between mb-1">
                  <span className="text-gray-600">Order Date:</span>
                  <span>{formatDate(order.date)}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span>{order.id}</span>
                </p>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-medium mt-2">
                  <span>Total</span>
                  <span className="text-brand-purple">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
