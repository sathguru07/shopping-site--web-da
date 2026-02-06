import { useParams, Link } from 'react-router';
import { useApp } from '../context/AppContext';
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Bell,
  Users,
  Leaf,
  Package,
  Camera
} from 'lucide-react';
import { useState } from 'react';
import { mockReviews } from '../data/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ProductDetailPage() {
  const { id } = useParams();
  const {
    getProductById,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addPriceAlert,
    products
  } = useApp();

  const product = getProductById(id!);
  const [quantity, setQuantity] = useState(1);
  const [showPriceAlert, setShowPriceAlert] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const productReviews = mockReviews.filter(r => r.productId === product.id);

  // Intelligent Kits - suggest related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handlePriceAlert = () => {
    if (targetPrice) {
      addPriceAlert(product.id, parseFloat(targetPrice));
      setShowPriceAlert(false);
      setTargetPrice('');
      alert('Price alert set! We\'ll notify you when the price drops.');
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 flex items-center justify-between">
          <ol className="flex items-center gap-2 text-muted-foreground">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li>/</li>
            <li><Link to="/" className="hover:text-blue-400">{product.category}</Link></li>
            <li>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
          <Link
            to="/"
            className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            ← Back to Shopping
          </Link>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted/20 rounded-xl overflow-hidden border border-border">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Virtual Preview Button */}
            {(product.category === 'Fashion' || product.category === 'Home') && (
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-900/20">
                <Camera className="size-5" />
                <span>Try Virtual Preview (AR)</span>
              </button>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-card/50 backdrop-blur-md rounded-xl p-6 lg:p-8 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-blue-400 font-semibold mb-2">{product.brand}</div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                </div>
                <button
                  onClick={handleWishlistToggle}
                  className="p-3 hover:bg-black/40 rounded-full transition-colors backdrop-blur-md border border-white/10"
                >
                  <Heart
                    className={`size-6 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                  />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`size-5 ${star <= Math.round(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground/30'
                        }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-foreground">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm font-semibold border border-red-500/20">
                        Save {discountPercent}%
                      </span>
                    </>
                  )}
                </div>

                {/* Price Alert */}
                <button
                  onClick={() => setShowPriceAlert(!showPriceAlert)}
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Bell className="size-4" />
                  <span>Watch for price drops</span>
                </button>

                {showPriceAlert && (
                  <div className="mt-3 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <p className="text-sm mb-3 text-blue-200">Get notified when price drops below:</p>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(e.target.value)}
                        placeholder="Target price"
                        className="flex-1 px-3 py-2 bg-black/40 border border-blue-500/30 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={handlePriceAlert}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Set Alert
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Eco Score */}
              {product.ecoScore && (
                <div className="mb-6 p-4 bg-green-900/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf className="size-5 text-green-400" />
                    <span className="font-semibold text-green-100">Eco-Impact Score</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {product.ecoScore.plasticFree && (
                      <div className="flex items-center gap-2 text-green-300">
                        <span>✓</span>
                        <span>Plastic-free packaging</span>
                      </div>
                    )}
                    {product.ecoScore.carbonNeutral && (
                      <div className="flex items-center gap-2 text-green-300">
                        <span>✓</span>
                        <span>Carbon-neutral shipping</span>
                      </div>
                    )}
                    {product.ecoScore.sustainable && (
                      <div className="flex items-center gap-2 text-green-300">
                        <span>✓</span>
                        <span>Sustainable manufacturing</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Group Buying */}
              {product.groupBuyingActive && (
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/20 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="size-5 text-purple-400" />
                    <span className="font-semibold text-purple-100">Team Up & Save!</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2 text-purple-200">
                      <span>{product.groupBuyingCurrent} joined</span>
                      <span className="font-semibold">{product.groupBuyingTarget} target</span>
                    </div>
                    <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                        style={{
                          width: `${(product.groupBuyingCurrent! / product.groupBuyingTarget!) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-purple-200">
                    When {product.groupBuyingTarget} people buy, everyone saves {product.groupBuyingDiscount}%!
                    <span className="font-semibold text-purple-100"> Only {product.groupBuyingTarget! - product.groupBuyingCurrent!} spots left.</span>
                  </p>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex gap-3 mb-6">
                <div className="flex items-center border border-border rounded-lg bg-secondary/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-accent transition-colors text-foreground"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x border-border bg-transparent text-foreground focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-accent transition-colors text-foreground"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
                >
                  <ShoppingCart className="size-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => {
                    handleAddToCart();
                    navigate('/checkout');
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-900/20"
                >
                  <CreditCard className="size-5" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="size-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">Free Shipping</div>
                </div>
                <div className="text-center">
                  <Shield className="size-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">Secure Payment</div>
                </div>
                <div className="text-center">
                  <RotateCcw className="size-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">30-Day Returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border p-6 lg:p-8 mb-12">
          <div className="border-b border-border mb-6">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-blue-500 font-semibold text-blue-400">
                Description
              </button>
              <button className="pb-4 text-muted-foreground hover:text-foreground transition-colors">
                Specifications
              </button>
              <button className="pb-4 text-muted-foreground hover:text-foreground transition-colors">
                Reviews ({productReviews.length})
              </button>
            </div>
          </div>

          <div className="prose max-w-none text-muted-foreground">
            <p className="mb-6">{product.description}</p>

            <h3 className="text-xl font-semibold mb-4 text-foreground">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews Section */}
        {productReviews.length > 0 && (
          <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border p-6 lg:p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Customer Reviews</h2>
            <div className="space-y-6">
              {productReviews.map(review => (
                <div key={review.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-foreground">{review.userName}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full border border-green-500/20">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`size-4 ${star <= review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground/30'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Intelligent Kits */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Package className="size-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-foreground">Complete Your Setup</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Customers who bought this also purchased these items at a special bundle price
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-card/50 backdrop-blur-md rounded-xl border border-border p-4 hover:shadow-lg transition-all hover:bg-card/80 group"
                >
                  <div className="aspect-square bg-muted/20 rounded-lg mb-3 overflow-hidden">
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-foreground group-hover:text-blue-400 transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <div className="text-lg font-bold text-blue-400">
                    ${relatedProduct.price.toFixed(2)}
                  </div>
                </Link>
              ))}
            </div>
            <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-900/20">
              Add All to Cart - Save 15%
            </button>
          </div>
        )}
      </div>
    </div>
  );
}