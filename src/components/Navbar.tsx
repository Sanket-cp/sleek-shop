import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, Search, User, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SearchWithSuggestions } from "@/components/SearchWithSuggestions";
import { Dialog, DialogContent } from "@/components/ui/dialog";
export const Navbar = () => {
  const {
    cartCount
  } = useCart();
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const handleLogout = () => {
    logout();
  };
  return <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-red-300 font-extrabold text-xl">SleekShop</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className="text-gray-600 hover:text-brand-orange transition-colors">
              Products
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-brand-orange transition-colors">
              Categories
            </Link>
          </nav>
          
          {/* Search Input (Desktop) */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchWithSuggestions />
          </div>
          
          {/* Auth, Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <Button variant="ghost" size="icon" className="md:hidden rounded-full" onClick={() => setIsSearchDialogOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
            
            {isAuthenticated ? <div className="hidden md:flex items-center space-x-4">
                <Link to="/account" className="flex items-center text-sm text-gray-600 hover:text-brand-purple">
                  <User className="h-4 w-4 mr-1" />
                  <span className="truncate max-w-[100px]">{user?.name}</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600">
                  <LogOut className="h-4 w-4 mr-1" />
                  <span>Logout</span>
                </Button>
              </div> : <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="hover:bg-opacity-90 bg-gray-500 hover:bg-gray-400">Sign Up</Button>
                </Link>
              </div>}
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-brand-purple text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>}
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={cn("md:hidden", isMobileMenuOpen ? "block" : "hidden")}>
          <div className="py-2 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-purple" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-purple" onClick={() => setIsMobileMenuOpen(false)}>
              Products
            </Link>
            <Link to="/categories" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-purple" onClick={() => setIsMobileMenuOpen(false)}>
              Categories
            </Link>
            
            {/* Auth Mobile */}
            {isAuthenticated ? <>
                <Link to="/account" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-purple" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    My Account
                  </div>
                </Link>
                <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-purple" onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}>
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </div>
                </button>
              </> : <>
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-purple" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-purple" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </>}
          </div>
        </div>
      </div>
      
      {/* Mobile Search Dialog */}
      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="top-[15%] p-0 max-w-lg">
          <div className="p-4">
            <SearchWithSuggestions isMobile={true} onClose={() => setIsSearchDialogOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </header>;
};