import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem, Address, PaymentMethod, Order, PriceAlert } from '../types';
import { mockProducts, mockAddresses, mockPaymentMethods, mockOrders } from '../data/mockData';

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User data
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  orders: Order[];
  addAddress: (address: Address) => void;

  // Price alerts
  priceAlerts: PriceAlert[];
  addPriceAlert: (productId: string, targetPrice: number) => void;
  removePriceAlert: (alertId: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Filters
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;

  // Products
  products: Product[];
  getProductById: (id: string) => Product | undefined;

  // Auth
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [addresses] = useState<Address[]>(mockAddresses);
  const [paymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [orders] = useState<Order[]>(mockOrders);
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [minRating, setMinRating] = useState(0);
  const [products] = useState<Product[]>(mockProducts);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    // Clear any sensitive data if needed
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const addAddress = (address: Address) => {
    // Mock implementation
    console.log('Address added:', address);
  };

  const addPriceAlert = (productId: string, targetPrice: number) => {
    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      productId,
      targetPrice,
      active: true
    };
    setPriceAlerts(prev => [...prev, newAlert]);
  };

  const removePriceAlert = (alertId: string) => {
    setPriceAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addresses,
        paymentMethods,
        orders,
        addAddress,
        priceAlerts,
        addPriceAlert,
        removePriceAlert,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        minRating,
        setMinRating,
        products,
        getProductById,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
