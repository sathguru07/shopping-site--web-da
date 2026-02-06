import { Link } from 'react-router';
import { Search, ShoppingCart, User, Heart, Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export function Header() {
  const { cart, searchQuery, setSearchQuery, wishlist, isAuthenticated, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-card/60 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ShopHub</div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-secondary/50 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-foreground placeholder:text-muted-foreground transition-colors"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-4">
            <Link
              to="/wishlist"
              className="hidden sm:flex relative p-2 hover:bg-accent rounded-full transition-colors text-foreground"
            >
              <Heart className="size-6 text-foreground" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2 hover:bg-accent rounded-full transition-colors text-foreground"
            >
              <ShoppingCart className="size-6 text-foreground" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full size-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <Link
                  to="/dashboard"
                  className="hidden sm:flex p-2 hover:bg-accent rounded-full transition-colors text-foreground"
                >
                  <User className="size-6 text-foreground" />
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 hidden group-hover:block">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-foreground hover:bg-accent">Dashboard</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-accent">
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors text-sm font-medium"
              >
                Log In
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent rounded-full transition-colors text-foreground"
            >
              <Menu className="size-6 text-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-secondary/50 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-2">
            <Link
              to="/wishlist"
              className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Heart className="size-5 text-foreground" />
              <span>Wishlist ({wishlist.length})</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="size-5 text-foreground" />
              <span>My Account</span>
            </Link>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="hidden md:flex bg-card/30 border-t border-border backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
            <span>Free Shipping Over $50</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Verified Sellers</span>
          </div>
        </div>
      </div>
    </header>
  );
}
