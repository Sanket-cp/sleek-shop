
import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiscountBannerProps {
  title?: string;
  description?: string;
  discountPercentage?: number;
  actionLabel?: string;
  onAction?: () => void;
}

export const DiscountBanner = ({
  title = "Special Sale",
  description = "Limited time offer on selected products",
  discountPercentage = 30,
  actionLabel = "Shop Now",
  onAction,
}: DiscountBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-lg p-4 mb-6 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Tag className="h-8 w-8 mr-4" />
          <div>
            <h3 className="font-bold text-xl">{title}</h3>
            <p className="text-white/90">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4 text-center">
            <span className="text-3xl font-bold">{discountPercentage}%</span>
            <p className="text-white/90 text-sm">OFF</p>
          </div>
          <Button 
            onClick={onAction} 
            variant="outline" 
            className="bg-orange-500 text-white hover:bg-yellow-500 hover:text-white border-none"
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
