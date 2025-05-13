
import { Layout } from "@/components/Layout";
import { OrderStatus } from "@/components/OrderStatus";
import { sampleOrders } from "@/data/products";
import { formatDate, formatPrice } from "@/lib/formatters";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const Orders = () => {
  // For demo purposes, we'll use the sample orders
  const orders = sampleOrders;
  
  const hasOrders = orders.length > 0;
  
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Orders</h1>
        
        {!hasOrders ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-medium mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
            <Button asChild className="bg-brand-purple hover:bg-opacity-90">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Latest order with full status */}
            {orders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-4">Latest Order</h2>
                <OrderStatus order={orders[0]} />
              </div>
            )}
            
            {/* Order history list */}
            {orders.length > 1 && (
              <div>
                <h2 className="text-xl font-medium mb-4">Order History</h2>
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.slice(1).map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                              ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                              ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                              ${order.status === 'pending' ? 'bg-gray-100 text-gray-800' : ''}
                            `}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatPrice(order.total)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Link 
                              to={`/order/${order.id}`} 
                              className="text-brand-purple hover:text-brand-purple/80"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
