
import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, User } from "lucide-react";

const Account = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium">{user?.name}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{user?.email}</div>
                  </div>
                </div>
                
                <Button className="bg-brand-purple hover:bg-opacity-90 w-full sm:w-auto mt-4">
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <div className="flex flex-col space-y-2">
                <Link to="/orders" className="py-2 px-3 hover:bg-gray-50 rounded-md transition-colors">
                  My Orders
                </Link>
                <Link to="/wishlist" className="py-2 px-3 hover:bg-gray-50 rounded-md transition-colors">
                  Wishlist
                </Link>
                <Link to="/address" className="py-2 px-3 hover:bg-gray-50 rounded-md transition-colors">
                  Address Book
                </Link>
                <Link to="/settings" className="py-2 px-3 hover:bg-gray-50 rounded-md transition-colors">
                  Account Settings
                </Link>
              </div>
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="col-span-1 md:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              <div className="text-center py-8 text-gray-500">
                <p>You haven't placed any orders yet.</p>
                <Link to="/products">
                  <Button className="mt-4 bg-brand-purple hover:bg-opacity-90">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
