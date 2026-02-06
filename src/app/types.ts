export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  inStock: boolean;
  groupBuyingActive?: boolean;
  groupBuyingTarget?: number;
  groupBuyingCurrent?: number;
  groupBuyingDiscount?: number;
  ecoScore?: {
    plasticFree: boolean;
    carbonNeutral: boolean;
    sustainable: boolean;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  address: Address;
  trackingNumber?: string;
  estimatedDelivery?: string;
  currentLocation?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  images?: string[];
  verified: boolean;
}

export interface PriceAlert {
  id: string;
  productId: string;
  targetPrice: number;
  active: boolean;
}
