import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    products
  } = useApp();

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 2000]);
    setMinRating(0);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-card/50 backdrop-blur-md border-r border-border lg:border-r-0 lg:border-none overflow-y-auto z-50 lg:z-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className="p-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-xl font-bold text-foreground">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-full text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold hidden lg:block text-foreground">Filters</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Reset All
            </button>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3 text-foreground">Category</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label
                  key={category}
                  className="flex items-center gap-3 cursor-pointer hover:bg-accent p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={category === 'All' ? !selectedCategory : selectedCategory === category}
                    onChange={() => setSelectedCategory(category === 'All' ? '' : category)}
                    className="size-4 text-blue-500 accent-blue-500"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3 text-foreground">Price Range</h3>
            <div className="space-y-4">
              <div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>$0</span>
                  <span className="font-semibold text-foreground">${priceRange[1]}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[100, 250, 500, 1000].map(price => (
                  <button
                    key={price}
                    onClick={() => setPriceRange([0, price])}
                    className={`px-3 py-2 text-sm border rounded-lg hover:border-blue-500 transition-colors ${priceRange[1] === price
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-border text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    Under ${price}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3 text-foreground">Minimum Rating</h3>
            <div className="space-y-2">
              {[4.5, 4, 3.5, 3].map(rating => (
                <label
                  key={rating}
                  className="flex items-center gap-3 cursor-pointer hover:bg-accent p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rating}
                    onChange={() => setMinRating(rating)}
                    className="size-4 text-blue-500 accent-blue-500"
                  />
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span>{rating}</span>
                    <span className="text-muted-foreground">& up</span>
                  </div>
                </label>
              ))}
              <label className="flex items-center gap-3 cursor-pointer hover:bg-accent p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 0}
                  onChange={() => setMinRating(0)}
                  className="size-4 text-blue-500 accent-blue-500"
                />
                <span className="text-sm">All Ratings</span>
              </label>
            </div>
          </div>

          {/* Eco-Friendly */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3 text-foreground">Sustainability</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer hover:bg-accent p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                <input type="checkbox" className="size-4 text-blue-500 accent-blue-500 rounded" />
                <span className="text-sm">Plastic-Free Packaging</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-accent p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                <input type="checkbox" className="size-4 text-blue-500 accent-blue-500 rounded" />
                <span className="text-sm">Carbon Neutral Shipping</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-accent p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                <input type="checkbox" className="size-4 text-blue-500 accent-blue-500 rounded" />
                <span className="text-sm">Sustainable Materials</span>
              </label>
            </div>
          </div>

          {/* Top Brands */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3 text-foreground">Top Brands</h3>
            <div className="space-y-2">
              {brands.slice(0, 6).map(brand => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer hover:bg-accent p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <input type="checkbox" className="size-4 text-blue-500 accent-blue-500 rounded" />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
