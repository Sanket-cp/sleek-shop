
import { Product, Category, Order } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Modern Minimalist Lamp",
    description: "Elegant lamp with minimalist design, perfect for any modern home or office setup.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "home-decor",
    inventory: 15,
    onSale: true,
    salePrice: 69.99
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    description: "Comfortable ergonomic chair designed for long hours of sitting, with adjustable height and lumbar support.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "furniture",
    inventory: 8,
    onSale: false,
    salePrice: null
  },
  {
    id: "3",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and exceptional sound quality.",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "electronics",
    inventory: 20,
    onSale: true,
    salePrice: 149.99
  },
  {
    id: "4",
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic mugs, perfect for your morning coffee or tea.",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "kitchenware",
    inventory: 25,
    onSale: false,
    salePrice: null
  },
  {
    id: "5",
    name: "Smartphone Stand",
    description: "Adjustable aluminum stand for smartphones and tablets, with non-slip base.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1583932692597-8d403765bf97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "electronics",
    inventory: 30,
    onSale: false,
    salePrice: null
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 20-hour battery life and water resistance.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "electronics",
    inventory: 12,
    onSale: true,
    salePrice: 54.99
  },
  {
    id: "7",
    name: "Cotton Throw Blanket",
    description: "Soft, 100% cotton throw blanket in a modern pattern, perfect for cooler evenings.",
    price: 58.99,
    image: "https://images.unsplash.com/photo-1584346133934-7a7118dca685?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "home-decor",
    inventory: 18,
    onSale: false,
    salePrice: null
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    description: "Vacuum insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "kitchenware",
    inventory: 40,
    onSale: true,
    salePrice: 27.99
  },
  {
    id: "9",
    name: "Smart Watch",
    description: "Feature-packed smartwatch with health tracking, notifications, and customizable watch faces.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "electronics",
    inventory: 10,
    onSale: true,
    salePrice: 249.99
  },
  {
    id: "10",
    name: "Yoga Mat",
    description: "Eco-friendly, non-slip yoga mat perfect for all types of yoga and exercise routines.",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1599447292412-5c11371d1d51?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "fitness",
    inventory: 22,
    onSale: false,
    salePrice: null
  },
  {
    id: "11",
    name: "Handcrafted Wooden Cutting Board",
    description: "Beautiful acacia wood cutting board, perfect for food preparation and serving.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "kitchenware",
    inventory: 7,
    onSale: false,
    salePrice: null
  },
  {
    id: "12",
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots, ID window, and bill compartment.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "accessories",
    inventory: 15,
    onSale: true,
    salePrice: 49.99
  }
];

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "furniture",
    name: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "home-decor",
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "kitchenware",
    name: "Kitchenware",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "fitness",
    name: "Fitness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

export const sampleOrders: Order[] = [
  {
    id: "ORD-2023-001",
    items: [
      {
        product: products[0], // Lamp
        quantity: 1
      },
      {
        product: products[3], // Coffee Mug Set
        quantity: 2
      }
    ],
    status: "shipped",
    shippingAddress: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA"
    },
    date: "2023-04-15",
    total: 175.97
  },
  {
    id: "ORD-2023-002",
    items: [
      {
        product: products[2], // Headphones
        quantity: 1
      }
    ],
    status: "processing",
    shippingAddress: {
      fullName: "Jane Smith",
      address: "456 Oak Ave",
      city: "Somewhere",
      state: "NY",
      zipCode: "67890",
      country: "USA"
    },
    date: "2023-04-16",
    total: 179.99
  }
];
