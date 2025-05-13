
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { NotFound } from "@/pages/NotFound";
import { ProductGrid } from "@/components/ProductGrid";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product
  const product = products.find(product => product.id === id);
  
  // If product not found
  if (!product) {
    return <NotFound />;
  }
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const incrementQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Mock product images (in a real app these would come from the product data)
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1634643836960-c345b3c3e998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  ];
  
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <div className="mb-4">
          <Link to="/products" className="text-gray-500 hover:text-brand-purple">
            ← Back to Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Carousel */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <Carousel className="w-full">
              <CarouselContent>
                {productImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <AspectRatio ratio={1/1}>
                      <img
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center my-2">
                <CarouselPrevious className="relative left-0 translate-y-0 top-0" />
                <CarouselNext className="relative right-0 translate-y-0 top-0" />
              </div>
            </Carousel>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl font-semibold text-brand-purple mb-4">
              {formatPrice(product.price)}
            </p>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Availability</h3>
              {product.inventory > 0 ? (
                <p className="text-green-600">In Stock ({product.inventory} available)</p>
              ) : (
                <p className="text-red-600">Out of Stock</p>
              )}
            </div>
            
            {product.inventory > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 w-10 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.inventory}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            <Button
              onClick={handleAddToCart}
              disabled={product.inventory <= 0}
              className="w-full mb-4 bg-brand-purple hover:bg-opacity-90"
              size="lg"
            >
              {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
