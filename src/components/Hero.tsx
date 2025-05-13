
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-100 to-white py-12 md:py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-orange-700">
            Discover Modern Essentials
          </h1>
          <p className="text-lg mb-6 text-gray-600 max-w-md">
            Shop our curated collection of premium products for your home and lifestyle.
          </p>
          
          <div className="w-full max-w-3xl mb-10">
            <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Featured products collection" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-yellow-500 text-white">
              <Link to="/products">
                Shop Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-orange-400 text-orange-600 hover:bg-orange-100">
              <Link to="/categories">
                Browse Categories
              </Link>
            </Button>
          </div>
          
          <div className="mt-6 bg-white p-3 rounded-lg shadow-sm border border-yellow-200 max-w-xs">
            <div className="text-sm font-medium text-orange-500 mb-1">Sale Alert</div>
            <div className="text-gray-700 text-xs">Save up to 30% on selected items this week!</div>
          </div>
        </div>
      </div>
    </div>
  );
};
