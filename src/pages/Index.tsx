
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { Layout } from "@/components/Layout";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DiscountBanner } from "@/components/DiscountBanner";

const Index = () => {
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);
  return <Layout>
      <Hero />
      
      <section className="py-12">
        <div className="container px-4 mx-auto text-center">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Shop by Category</h2>
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-100" asChild>
              <Link to="/categories">View All</Link>
            </Button>
          </div>
          <CategoryGrid categories={categories} />
        </div>
      </section>
      
      <section className="py-12 bg-yellow-50">
        <div className="container px-4 mx-auto text-center">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Featured Products</h2>
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-100" asChild>
              <Link to="/products">View All</Link>
            </Button>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 mx-auto">
          <DiscountBanner 
            title="Special Offer" 
            description="Enjoy free shipping on all orders over ₹1000" 
            discountPercentage={30}
            actionLabel="Shop Now"
            onAction={() => window.location.href = '/products'}
          />
        </div>
      </section>
      
      <section className="py-12">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-orange-600">Join Our Indian Community</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Stay updated with our latest products, exclusive offers, and special promotions across India by subscribing to our newsletter.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 flex-grow" />
            <Button className="bg-orange-500 hover:bg-yellow-500 text-white">Subscribe</Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Receive offers and updates for deliveries across India
          </p>
        </div>
      </section>
    </Layout>;
};
export default Index;
