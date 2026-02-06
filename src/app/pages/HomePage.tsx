import { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { useApp } from '../context/AppContext';
import { SlidersHorizontal, TrendingUp, Sparkles } from 'lucide-react';

export function HomePage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    products,
    searchQuery,
    selectedCategory,
    priceRange,
    minRating
  } = useApp();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (product.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, priceRange, minRating]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-8 text-blue-400" />
              <span className="text-sm font-semibold uppercase tracking-wide text-blue-200">Welcome to ShopHub</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
              Discover Everything You Need, All in One Place
            </h1>
            <p className="text-xl text-blue-100/80 mb-8">
              Shop thousands of products with exclusive deals, team discounts, and eco-friendly options.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                🚚 Free Shipping on Orders Over $50
              </div>
              <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                🌱 Sustainable Shopping Options
              </div>
              <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                👥 Group Buying Discounts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar isOpen={true} onClose={() => { }} />
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedCategory || 'All Products'}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent text-foreground"
                >
                  <SlidersHorizontal className="size-5" />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <select className="px-4 py-2 border border-border rounded-lg bg-card text-foreground hover:bg-accent cursor-pointer outline-none focus:ring-2 focus:ring-ring">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {/* Group Buying Spotlight */}
            {filteredProducts.some(p => p.groupBuyingActive) && (
              <div className="mb-8 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="size-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-purple-100">
                    Active Group Buying Deals
                  </h3>
                </div>
                <p className="text-purple-200/80">
                  Join others and unlock special discounts! These deals get better when more people buy together.
                </p>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <div className="lg:hidden">
        <FilterSidebar isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      </div>
    </div>
  );
}
