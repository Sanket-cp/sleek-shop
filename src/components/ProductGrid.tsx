
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductGrid = ({ products, isLoading = false }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="product-grid">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div 
              key={index} 
              className="bg-gray-100 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center py-10 text-gray-500">No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
