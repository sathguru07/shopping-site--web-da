import { useParams, useLocation, Link } from 'react-router';
import { useApp } from '../context/AppContext';
import {
  Package,
  MapPin,
  Truck,
  Home,
  CheckCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function OrderTrackingPage() {
  const { id } = useParams();
  const location = useLocation();
  const { orders } = useApp();
  
  const isNewOrder = location.state?.newOrder;
  const order = orders.find(o => o.id === id);

  // Mock tracking timeline
  const getTrackingSteps = (status: string) => {
    const steps = [
      {
        id: 1,
        label: 'Order Placed',
        description: 'We have received your order',
        icon: CheckCircle,
        completed: true,
        date: order?.date
      },
      {
        id: 2,
        label: 'Processing',
        description: 'Your order is being prepared',
        icon: Package,
        completed: status !== 'processing',
        active: status === 'processing',
        date: status !== 'processing' ? '2026-02-02' : undefined
      },
      {
        id: 3,
        label: 'Shipped',
        description: 'Your order is on its way',
        icon: Truck,
        completed: status === 'delivered',
        active: status === 'shipped',
        date: status === 'shipped' || status === 'delivered' ? '2026-02-03' : undefined
      },
      {
        id: 4,
        label: 'Delivered',
        description: 'Order delivered successfully',
        icon: Home,
        completed: status === 'delivered',
        active: false,
        date: status === 'delivered' ? '2026-02-05' : undefined
      }
    ];
    return steps;
  };

  if (!order && !isNewOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="size-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-700">
            View all orders
          </Link>
        </div>
      </div>
    );
  }

  // For new orders, show confirmation
  if (isNewOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl border p-8 text-center">
            <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="size-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your purchase
            </p>
            <p className="text-gray-600 mb-8">
              Order #{id}
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-blue-900 mb-2">
                We've sent a confirmation email with your order details.
              </p>
              <p className="text-sm text-blue-800">
                You can track your order status anytime from your dashboard.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Order Details
              </Link>
              <Link
                to="/"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const trackingSteps = getTrackingSteps(order.status);
  const currentStepIndex = trackingSteps.findIndex(step => step.active);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2 text-gray-600">
            <li><Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
            <li>/</li>
            <li className="text-gray-900">Order {order.id}</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Tracking</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tracking Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Tracking Status */}
            <div className="bg-white rounded-xl border p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {order.status === 'delivered' ? 'Delivered' : 'In Transit'}
                  </h2>
                  {order.estimatedDelivery && order.status !== 'delivered' && (
                    <p className="text-gray-600">
                      Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </div>
                {order.trackingNumber && (
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Tracking #</div>
                    <div className="font-mono font-semibold">{order.trackingNumber}</div>
                  </div>
                )}
              </div>

              {/* Progress Timeline */}
              <div className="relative">
                {trackingSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isLast = index === trackingSteps.length - 1;

                  return (
                    <div key={step.id} className="relative">
                      <div className="flex gap-4 pb-8">
                        {/* Icon */}
                        <div className="relative flex-shrink-0">
                          <div
                            className={`size-12 rounded-full flex items-center justify-center transition-all ${
                              step.completed
                                ? 'bg-green-600 text-white'
                                : step.active
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            <Icon className="size-6" />
                          </div>
                          {!isLast && (
                            <div
                              className={`absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-full transition-all ${
                                step.completed ? 'bg-green-600' : 'bg-gray-200'
                              }`}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-2">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-semibold text-lg">{step.label}</h3>
                            {step.date && (
                              <span className="text-sm text-gray-500">
                                {new Date(step.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">{step.description}</p>
                          {step.active && order.currentLocation && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                              <MapPin className="size-4" />
                              <span>{order.currentLocation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            {order.status === 'shipped' && (
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="size-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-gray-600">Live tracking map</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Your package is at: {order.currentLocation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold text-lg mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="size-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 mb-1 block"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border p-6 sticky top-24 space-y-6">
              <div>
                <h3 className="font-bold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-semibold">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span className="font-semibold">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold mb-4">Shipping Address</h3>
                <div className="text-sm text-gray-600">
                  <div className="font-semibold text-gray-900 mb-1">
                    {order.address.name}
                  </div>
                  <div>{order.address.street}</div>
                  <div>
                    {order.address.city}, {order.address.state} {order.address.zip}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors">
                  Contact Support
                </button>
                {order.status !== 'cancelled' && order.status !== 'delivered' && (
                  <button className="w-full border border-red-600 text-red-600 hover:bg-red-50 py-2.5 rounded-lg font-semibold transition-colors">
                    Cancel Order
                  </button>
                )}
                {order.status === 'delivered' && (
                  <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 rounded-lg font-semibold transition-colors">
                    Return Items
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
