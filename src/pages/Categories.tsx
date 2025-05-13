
import { Layout } from "@/components/Layout";
import { CategoryGrid } from "@/components/CategoryGrid";
import { categories } from "@/data/products";

const Categories = () => {
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Categories</h1>
        <CategoryGrid categories={categories} />
      </div>
    </Layout>
  );
};

export default Categories;
