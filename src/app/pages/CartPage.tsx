import { Link, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp();
  const navigate = useNavigate();

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="size-24 text-muted-foreground mx-auto mb-6 opacity-20" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          <Link
            to="/"
            className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors hidden sm:inline-block"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item.product.id}
                className="bg-card/50 backdrop-blur-md rounded-xl border border-border p-4 sm:p-6"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-muted/20 rounded-lg overflow-hidden"
                  >
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4 mb-2">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-semibold text-foreground hover:text-blue-400 line-clamp-2 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 hover:bg-accent rounded-full transition-colors flex-shrink-0 text-muted-foreground hover:text-red-400"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>

                    <div className="text-sm text-muted-foreground mb-3">
                      {item.product.brand}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border rounded-lg w-fit bg-secondary/20">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-accent transition-colors text-foreground"
                        >
                          <Minus className="size-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.product.id, parseInt(e.target.value) || 1)
                          }
                          className="w-12 text-center border-x border-border bg-transparent text-foreground"
                          min="1"
                        />
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-accent transition-colors text-foreground"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-xl font-bold text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-sm text-muted-foreground">
                            ${item.product.price.toFixed(2)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-semibold text-foreground">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-semibold text-foreground">
                    {shipping === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {cartTotal < 50 && cartTotal > 0 && (
                  <div className="text-sm text-blue-300 bg-blue-900/40 p-3 rounded-lg border border-blue-500/20">
                    Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (estimated)</span>
                  <span className="font-semibold text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 px-4 py-2 bg-secondary/20 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground placeholder:text-muted-foreground"
                  />
                  <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors border border-border">
                    Apply
                  </button>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors mb-4 shadow-lg shadow-blue-900/20"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="size-5" />
              </button>

              <Link
                to="/"
                className="block text-center text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="size-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="size-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
