
import { Category } from "@/types";
import { Link } from "react-router-dom";

interface CategoryGridProps {
  categories: Category[];
}

export const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          to={`/categories/${category.id}`} 
          className="group relative block bg-gray-100 rounded-lg overflow-hidden aspect-square hover:shadow-md transition-shadow"
        >
          <img 
            src={category.image || "/placeholder.svg"} 
            alt={category.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <h3 className="p-4 text-white text-xl font-medium w-full">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};
