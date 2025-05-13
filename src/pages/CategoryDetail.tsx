
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { products, categories } from "@/data/products";
import { NotFound } from "@/pages/NotFound";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the category
  const category = categories.find(category => category.id === id);
  
  // Filter products by category
  const categoryProducts = products.filter(product => product.category === id);
  
  // If category not found
  if (!category) {
    return <NotFound />;
  }
  
  // Get a hero image for the category
  const heroImage = category.image;
  
  // Fallback image if the category image fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  };
  
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <div className="mb-4">
          <Link to="/categories" className="text-gray-500 hover:text-orange-500">
            ← Back to Categories
          </Link>
        </div>
        
        <div className="mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 lg:w-1/4 overflow-hidden rounded-lg shadow-md">
            <AspectRatio ratio={1}>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                onError={handleImageError}
              />
            </AspectRatio>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-gray-600">
              Browse our selection of {category.name.toLowerCase()} products, designed to enhance your living space.
            </p>
          </div>
        </div>
        
        {/* Hero banner for the category */}
        {heroImage && (
          <div className="mb-8 relative rounded-lg overflow-hidden shadow-lg">
            <div className="h-[200px] md:h-[300px]">
              <img 
                src={heroImage} 
                alt={`${category.name} Collection`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="p-6 md:p-10 text-white max-w-md">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">{category.name} Collection</h2>
                  <p className="opacity-90">Find the perfect pieces to transform your space.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {categoryProducts.length > 0 ? (
          <div>
            <h2 className="text-xl font-medium mb-4">
              {categoryProducts.length} Products in {category.name}
            </h2>
            <ProductGrid products={categoryProducts} />
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No products found in this category yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryDetail;
