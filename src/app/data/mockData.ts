import { Product, Order, Address, PaymentMethod, Review } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'UltraBook Pro 15',
    price: 1299.99,
    originalPrice: 1499.99,
    image: 'https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NzAyNzM1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Electronics',
    brand: 'TechPro',
    rating: 4.8,
    reviewCount: 2847,
    description: 'Powerful laptop with stunning display and all-day battery life. Perfect for professionals and creators.',
    features: [
      '15.6" 4K OLED Display',
      'Intel Core i7 13th Gen',
      '16GB RAM, 512GB SSD',
      '12-hour battery life',
      'Thunderbolt 4 ports'
    ],
    inStock: true,
    groupBuyingActive: true,
    groupBuyingTarget: 50,
    groupBuyingCurrent: 38,
    groupBuyingDiscount: 15,
    ecoScore: {
      plasticFree: false,
      carbonNeutral: true,
      sustainable: true
    }
  },
  {
    id: '2',
    name: 'AirWave Pro Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzcwMjY4MTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Electronics',
    brand: 'SoundWave',
    rating: 4.6,
    reviewCount: 1523,
    description: 'Premium wireless headphones with active noise cancellation and exceptional sound quality.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium audio drivers',
      'Comfortable memory foam',
      'Bluetooth 5.3'
    ],
    inStock: true,
    ecoScore: {
      plasticFree: false,
      carbonNeutral: false,
      sustainable: true
    }
  },
  {
    id: '3',
    name: 'FitTrack Smart Watch',
    price: 249.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNofGVufDF8fHx8MTc3MDI3MDM1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Electronics',
    brand: 'FitTrack',
    rating: 4.5,
    reviewCount: 987,
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and sleep analysis.',
    features: [
      'Heart rate & SpO2 monitoring',
      'Built-in GPS',
      '7-day battery life',
      'Water resistant 5ATM',
      '100+ workout modes'
    ],
    inStock: true,
    groupBuyingActive: true,
    groupBuyingTarget: 30,
    groupBuyingCurrent: 22,
    groupBuyingDiscount: 10
  },
  {
    id: '4',
    name: 'Elite Aviator Sunglasses',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1722842529941-825976fc14f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHN1bmdsYXNzZXN8ZW58MXx8fHwxNzcwMjU5MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fashion',
    brand: 'LuxVision',
    rating: 4.7,
    reviewCount: 654,
    description: 'Premium designer sunglasses with UV400 protection and polarized lenses.',
    features: [
      'UV400 protection',
      'Polarized lenses',
      'Lightweight titanium frame',
      'Anti-reflective coating',
      'Includes premium case'
    ],
    inStock: true,
    ecoScore: {
      plasticFree: true,
      carbonNeutral: true,
      sustainable: true
    }
  },
  {
    id: '5',
    name: 'CloudRunner Sport Shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzcwMjU1MDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fashion',
    brand: 'SportLine',
    rating: 4.4,
    reviewCount: 2134,
    description: 'Lightweight running shoes with superior cushioning and breathable mesh.',
    features: [
      'Responsive cushioning',
      'Breathable mesh upper',
      'Durable rubber outsole',
      'Lightweight design',
      'Arch support'
    ],
    inStock: true
  },
  {
    id: '6',
    name: 'BrewMaster Coffee Maker',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1565452344518-47faca79dc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlcnxlbnwxfHx8fDE3NzAyMjM1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Home',
    brand: 'BrewTech',
    rating: 4.6,
    reviewCount: 876,
    description: 'Programmable coffee maker with thermal carafe and built-in grinder.',
    features: [
      'Built-in burr grinder',
      'Thermal carafe keeps hot',
      'Programmable timer',
      '12-cup capacity',
      'Auto shut-off'
    ],
    inStock: true,
    ecoScore: {
      plasticFree: false,
      carbonNeutral: false,
      sustainable: true
    }
  },
  {
    id: '7',
    name: 'Urban Explorer Backpack',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549943872-f7ff0b2b51be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwYmFja3BhY2t8ZW58MXx8fHwxNzcwMzA2OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fashion',
    brand: 'UrbanGear',
    rating: 4.5,
    reviewCount: 432,
    description: 'Stylish leather backpack with laptop compartment and multiple pockets.',
    features: [
      'Genuine leather',
      'Padded laptop sleeve',
      'Water-resistant',
      'Multiple compartments',
      'Comfortable straps'
    ],
    inStock: true,
    ecoScore: {
      plasticFree: true,
      carbonNeutral: false,
      sustainable: true
    }
  },
  {
    id: '8',
    name: 'ProShot DSLR Camera',
    price: 899.99,
    originalPrice: 1099.99,
    image: 'https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzAzMDQ0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Electronics',
    brand: 'PhotoPro',
    rating: 4.9,
    reviewCount: 1245,
    description: 'Professional DSLR camera with 24.2MP sensor and 4K video recording.',
    features: [
      '24.2MP APS-C sensor',
      '4K video recording',
      'Fast autofocus system',
      'Wi-Fi & Bluetooth',
      'Weather-sealed body'
    ],
    inStock: true,
    groupBuyingActive: true,
    groupBuyingTarget: 20,
    groupBuyingCurrent: 17,
    groupBuyingDiscount: 20
  },
  {
    id: '9',
    name: 'ZenFlow Yoga Mat',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1646239646963-b0b9be56d6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0fGVufDF8fHx8MTc3MDMwNjkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sports',
    brand: 'ZenFit',
    rating: 4.7,
    reviewCount: 1876,
    description: 'Premium yoga mat with excellent grip and cushioning for all practice levels.',
    features: [
      'Non-slip surface',
      'Extra thick 6mm',
      'Eco-friendly TPE',
      'Moisture resistant',
      'Includes carry strap'
    ],
    inStock: true,
    ecoScore: {
      plasticFree: true,
      carbonNeutral: true,
      sustainable: true
    }
  },
  {
    id: '10',
    name: 'Organic Superfood Bundle',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1598217475213-268e8ec0126e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZ3JvY2VyaWVzfGVufDF8fHx8MTc3MDMwNjkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Groceries',
    brand: 'PureLife',
    rating: 4.8,
    reviewCount: 3421,
    description: 'Curated selection of organic superfoods including quinoa, chia seeds, and more.',
    features: [
      'USDA Organic certified',
      'Non-GMO',
      'Gluten-free options',
      '100% natural',
      'Resealable packaging'
    ],
    inStock: true,
    ecoScore: {
      plasticFree: true,
      carbonNeutral: true,
      sustainable: true
    }
  },
  {
    id: '11',
    name: 'Harmony Lounge Chair',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzcwMjgyNDQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Home',
    brand: 'ModernLiving',
    rating: 4.6,
    reviewCount: 234,
    description: 'Contemporary lounge chair with premium upholstery and ergonomic design.',
    features: [
      'Premium fabric upholstery',
      'Ergonomic design',
      'Solid wood frame',
      'Easy assembly',
      'Modern aesthetic'
    ],
    inStock: true,
    ecoScore: {
      plasticFree: false,
      carbonNeutral: false,
      sustainable: true
    }
  },
  {
    id: '12',
    name: 'Acoustic Guitar Starter Kit',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMGd1aXRhcnxlbnwxfHx8fDE3NzAzMDY5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Music',
    brand: 'SoundCraft',
    rating: 4.5,
    reviewCount: 567,
    description: 'Complete acoustic guitar kit perfect for beginners, includes all accessories.',
    features: [
      'Full-size dreadnought',
      'Spruce top',
      'Includes gig bag',
      'Extra strings & picks',
      'Digital tuner included'
    ],
    inStock: true
  }
];

export const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'Home',
    street: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    isDefault: true
  },
  {
    id: '2',
    name: 'Work',
    street: '456 Market Street, Suite 200',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    isDefault: false
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    isDefault: true
  },
  {
    id: '2',
    type: 'card',
    last4: '5555',
    brand: 'Mastercard',
    isDefault: false
  },
  {
    id: '3',
    type: 'paypal',
    isDefault: false
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2026-001',
    date: '2026-02-01',
    total: 1299.99,
    status: 'shipped',
    items: [
      {
        product: mockProducts[0],
        quantity: 1
      }
    ],
    address: mockAddresses[0],
    trackingNumber: 'TRK1234567890',
    estimatedDelivery: '2026-02-07',
    currentLocation: 'Distribution Center - Oakland, CA'
  },
  {
    id: 'ORD-2026-002',
    date: '2026-01-28',
    total: 349.98,
    status: 'delivered',
    items: [
      {
        product: mockProducts[1],
        quantity: 1
      },
      {
        product: mockProducts[8],
        quantity: 1
      }
    ],
    address: mockAddresses[0],
    trackingNumber: 'TRK0987654321',
    estimatedDelivery: '2026-02-03'
  },
  {
    id: 'ORD-2026-003',
    date: '2026-01-15',
    total: 129.99,
    status: 'delivered',
    items: [
      {
        product: mockProducts[4],
        quantity: 1
      }
    ],
    address: mockAddresses[1],
    trackingNumber: 'TRK5678901234'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userName: 'Sarah M.',
    rating: 5,
    date: '2026-01-20',
    comment: 'Absolutely love this laptop! The display is stunning and battery life is even better than advertised. Perfect for my design work.',
    images: [],
    verified: true
  },
  {
    id: '2',
    productId: '1',
    userName: 'James K.',
    rating: 4,
    date: '2026-01-15',
    comment: 'Great performance and build quality. Only downside is it runs a bit warm under heavy load. Still highly recommend!',
    verified: true
  },
  {
    id: '3',
    productId: '2',
    userName: 'Emily R.',
    rating: 5,
    date: '2026-01-25',
    comment: 'Best headphones I\'ve ever owned. The noise cancellation is incredible for my daily commute.',
    verified: true
  },
  {
    id: '4',
    productId: '2',
    userName: 'Michael T.',
    rating: 5,
    date: '2026-01-18',
    comment: 'Sound quality is phenomenal. Comfortable for long listening sessions.',
    verified: true
  }
];
