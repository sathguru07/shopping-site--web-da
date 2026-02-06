import { Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingCart, X, TrendingDown } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, priceAlerts } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Heart className="size-24 text-muted-foreground mx-auto mb-6 opacity-20" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8">
            Save items you love so you can find them easily later
          </p>
          <Link
            to="/"
            className="inline-flex bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
            <p className="text-muted-foreground mt-2">{wishlist.length} items saved</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors hidden sm:inline-block"
            >
              Continue Shopping
            </Link>
            <button className="text-blue-600 hover:text-blue-500 font-semibold transition-colors">
              Share Wishlist
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => {
            const hasAlert = priceAlerts.some(
              alert => alert.productId === product.id && alert.active
            );

            return (
              <div
                key={product.id}
                className="bg-card/50 backdrop-blur-md rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative">
                  <Link to={`/product/${product.id}`} className="block aspect-square bg-muted/20">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full shadow-md hover:bg-black/60 transition-colors border border-white/10"
                  >
                    <X className="size-5 text-white" />
                  </button>
                  {hasAlert && (
                    <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-blue-400/20">
                      <TrendingDown className="size-3" />
                      <span>Price Alert On</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
                  <Link
                    to={`/product/${product.id}`}
                    className="font-semibold text-foreground hover:text-blue-400 line-clamp-2 min-h-[3rem] block mb-3 transition-colors"
                  >
                    {product.name}
                  </Link>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviewCount})
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
                  >
                    <ShoppingCart className="size-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Price Drop Info */}
        <div className="mt-12 bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <TrendingDown className="size-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-100 mb-2">
                Never Miss a Deal
              </h3>
              <p className="text-sm text-blue-200/80">
                Set price alerts on your wishlist items and we'll notify you when prices drop.
                Click on any product to set your target price!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
