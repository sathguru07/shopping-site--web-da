import { useState } from 'react';
import { Link } from 'react-router';
import { useApp } from '../context/AppContext';
import {
  Package,
  MapPin,
  CreditCard,
  Heart,
  Bell,
  User,
  ChevronRight,
  Settings,
  LogOut
} from 'lucide-react';

import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function DashboardPage() {
  const { orders, addresses, paymentMethods, wishlist, priceAlerts, logout } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payment' | 'alerts'>('orders');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-500/10 border border-green-500/20';
      case 'shipped':
        return 'text-blue-400 bg-blue-500/10 border border-blue-500/20';
      case 'processing':
        return 'text-yellow-500 bg-yellow-500/10 border border-yellow-500/20';
      case 'cancelled':
        return 'text-red-400 bg-red-500/10 border border-red-500/20';
      default:
        return 'text-muted-foreground bg-muted/10 border border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your orders, addresses, and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border p-4 sticky top-24">
              {/* Profile Section */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
                <div className="size-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/20">
                  S
                </div>
                <div>
                  <div className="font-semibold text-foreground">Sathguru</div>
                  <div className="text-sm text-muted-foreground">sathguru@example.com</div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders'
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                >
                  <Package className="size-5" />
                  <span className="font-medium">Orders</span>
                  <ChevronRight className="size-4 ml-auto" />
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'addresses'
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                >
                  <MapPin className="size-5" />
                  <span className="font-medium">Addresses</span>
                  <ChevronRight className="size-4 ml-auto" />
                </button>

                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'payment'
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                >
                  <CreditCard className="size-5" />
                  <span className="font-medium">Payment</span>
                  <ChevronRight className="size-4 ml-auto" />
                </button>

                <button
                  onClick={() => setActiveTab('alerts')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'alerts'
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                >
                  <Bell className="size-5" />
                  <span className="font-medium">Price Alerts</span>
                  <span className="ml-auto bg-blue-600 text-white text-xs size-5 rounded-full flex items-center justify-center shadow-sm">
                    {priceAlerts.filter(a => a.active).length}
                  </span>
                </button>

                <Link
                  to="/wishlist"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <Heart className="size-5" />
                  <span className="font-medium">Wishlist</span>
                  <span className="ml-auto text-sm text-muted-foreground">{wishlist.length}</span>
                </Link>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                  <Settings className="size-5" />
                  <span className="font-medium">Settings</span>
                  <ChevronRight className="size-4 ml-auto" />
                </button>

                <div className="pt-4 mt-4 border-t border-border">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="size-5" />
                    <span className="font-medium">Log Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders */}
            {activeTab === 'orders' && (
              <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border">
                <div className="p-6 border-b border-border">
                  <h2 className="text-2xl font-bold text-foreground">Order History</h2>
                  <p className="text-muted-foreground mt-1">
                    Track and manage your orders
                  </p>
                </div>

                <div className="divide-y divide-border">
                  {orders.map(order => (
                    <div key={order.id} className="p-6 hover:bg-card/80 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="font-semibold text-lg mb-1 text-foreground">Order {order.id}</div>
                          <div className="text-sm text-muted-foreground">
                            Placed on {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <Link
                            to={`/order/${order.id}`}
                            className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center gap-1 transition-colors"
                          >
                            View Details
                            <ChevronRight className="size-4" />
                          </Link>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="size-16 bg-muted/20 rounded-lg overflow-hidden border border-border">
                            <ImageWithFallback
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="text-sm text-muted-foreground">
                            +{order.items.length - 3} more
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </div>
                        <div className="font-bold text-lg text-foreground">
                          ${order.total.toFixed(2)}
                        </div>
                      </div>

                      {order.status === 'shipped' && order.trackingNumber && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Tracking: {order.trackingNumber}</span>
                            <span className="text-muted-foreground">
                              Est. Delivery: {new Date(order.estimatedDelivery!).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Saved Addresses</h2>
                    <p className="text-muted-foreground mt-1">
                      Manage your shipping addresses
                    </p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-900/20">
                    Add Address
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {addresses.map(address => (
                    <div
                      key={address.id}
                      className="p-4 border-2 border-border rounded-lg hover:border-blue-500/50 transition-colors bg-card/30"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-5 text-muted-foreground" />
                          <span className="font-semibold text-foreground">{address.name}</span>
                        </div>
                        {address.isDefault && (
                          <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="ml-7 text-muted-foreground">
                        <div>{address.street}</div>
                        <div>{address.city}, {address.state} {address.zip}</div>
                      </div>
                      <div className="ml-7 mt-3 flex gap-3">
                        <button className="text-sm text-blue-400 hover:text-blue-300">
                          Edit
                        </button>
                        <button className="text-sm text-red-400 hover:text-red-300">
                          Remove
                        </button>
                        {!address.isDefault && (
                          <button className="text-sm text-muted-foreground hover:text-foreground">
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {activeTab === 'payment' && (
              <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Payment Methods</h2>
                    <p className="text-muted-foreground mt-1">
                      Manage your saved payment options
                    </p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-900/20">
                    Add Payment
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {paymentMethods.map(method => (
                    <div
                      key={method.id}
                      className="p-4 border-2 border-border rounded-lg hover:border-blue-500/50 transition-colors bg-card/30"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          {method.type === 'card' ? (
                            <>
                              <CreditCard className="size-5 text-muted-foreground" />
                              <div>
                                <div className="font-semibold text-foreground">
                                  {method.brand} •••• {method.last4}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="size-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
                                PP
                              </div>
                              <div className="font-semibold text-foreground">PayPal</div>
                            </>
                          )}
                        </div>
                        {method.isDefault && (
                          <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button className="text-sm text-blue-400 hover:text-blue-300">
                          Edit
                        </button>
                        <button className="text-sm text-red-400 hover:text-red-300">
                          Remove
                        </button>
                        {!method.isDefault && (
                          <button className="text-sm text-muted-foreground hover:text-foreground">
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Alerts */}
            {activeTab === 'alerts' && (
              <div className="bg-card/50 backdrop-blur-md rounded-xl border border-border">
                <div className="p-6 border-b border-border">
                  <h2 className="text-2xl font-bold text-foreground">Price Alerts</h2>
                  <p className="text-muted-foreground mt-1">
                    Get notified when prices drop on items you're watching
                  </p>
                </div>

                {priceAlerts.length > 0 ? (
                  <div className="divide-y divide-border">
                    {priceAlerts.map(alert => {
                      const product = wishlist.find(p => p.id === alert.productId);
                      if (!product) return null;

                      return (
                        <div key={alert.id} className="p-6 hover:bg-card/80 transition-colors">
                          <div className="flex gap-4">
                            <Link to={`/product/${product.id}`} className="flex-shrink-0">
                              <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="size-20 object-cover rounded-lg"
                              />
                            </Link>
                            <div className="flex-1">
                              <Link
                                to={`/product/${product.id}`}
                                className="font-semibold text-foreground hover:text-blue-400 line-clamp-2 mb-2 block transition-colors"
                              >
                                {product.name}
                              </Link>
                              <div className="flex items-center gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Current: </span>
                                  <span className="font-semibold text-foreground">${product.price.toFixed(2)}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Alert at: </span>
                                  <span className="font-semibold text-blue-400">
                                    ${alert.targetPrice.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Bell className="size-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No active price alerts
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Set alerts on products to get notified when prices drop
                    </p>
                    <Link
                      to="/"
                      className="inline-flex bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20"
                    >
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
