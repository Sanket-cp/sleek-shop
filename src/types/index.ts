
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inventory: number;
  onSale?: boolean;
  salePrice?: number | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: ShippingAddress;
  date: string;
  total: number;
  paymentMethod?: PaymentMethod;
}

export interface PaymentMethod {
  cardType: string;
  lastFourDigits: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  landmark?: string; // Optional landmark for easier delivery in India
  alternatePhone?: string; // Optional alternate phone number
}

export interface Category {
  id: string;
  name: string;
  image?: string;
}
