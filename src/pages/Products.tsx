
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { products, categories } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X, Tag, CreditCard } from "lucide-react";
import { useLocation } from "react-router-dom";
import { PaymentMethodSection } from "@/components/PaymentMethodSection";
import { SearchWithSuggestions } from "@/components/SearchWithSuggestions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiscountBanner } from "@/components/DiscountBanner";

const Products = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showSaleOnly, setShowSaleOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  
  // Parse search param from URL if any
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);
  
  // Filter products based on search term, category and sale status
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm.length < 2 || 
                         product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSale = showSaleOnly ? product.onSale : true;
    return matchesSearch && matchesCategory && matchesSale;
  });

  // Count products on sale
  const onSaleCount = products.filter(p => p.onSale).length;

  const handleSaleButtonClick = () => {
    setShowSaleOnly(true);
  };
  
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            {/* Discount Banner */}
            <DiscountBanner 
              title="Mega Sale Weekend!" 
              description="Up to 50% off on premium products - Limited time only!"
              discountPercentage={50}
              onAction={handleSaleButtonClick}
            />
          
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>
              
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden md:inline">Filters</span>
                </Button>
              </div>
            </div>
            
            {showFilters && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className={selectedCategory === null ? "bg-brand-purple" : ""}
                      >
                        All
                      </Button>
                      {categories.map(category => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className={selectedCategory === category.id ? "bg-brand-purple" : ""}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      variant={showSaleOnly ? "default" : "outline"}
                      onClick={() => setShowSaleOnly(!showSaleOnly)}
                      className={`flex items-center gap-2 ${showSaleOnly ? "bg-red-500 hover:bg-red-600" : ""}`}
                      size="sm"
                    >
                      <Tag className="h-4 w-4" />
                      Sale Items ({onSaleCount})
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Enhanced Sale Banner */}
            {showSaleOnly && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 border border-red-100 rounded-lg p-4 mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <Tag className="h-6 w-6 text-white mr-3" />
                    <div>
                      <h3 className="font-bold text-xl text-white">Sale Items</h3>
                      <p className="text-white/90">Special discounts on selected products</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white bg-white/20 px-4 py-2 rounded-lg">
                    Save up to 50% OFF
                  </div>
                </div>
              </div>
            )}
            
            {filteredProducts.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products found matching "{searchTerm}"</p>
                <Button onClick={() => setSearchTerm("")} variant="outline">
                  Clear Search
                </Button>
              </div>
            )}
            
            {filteredProducts.length > 0 && (
              <ProductGrid products={filteredProducts} />
            )}
          </TabsContent>
          
          <TabsContent value="payment">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Payment Methods</h1>
              <p className="text-gray-600">Manage your saved payment options or add a new card.</p>
            </div>
            
            <PaymentMethodSection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Products;
