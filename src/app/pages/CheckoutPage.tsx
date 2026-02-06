import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { CreditCard, MapPin, Gift, Check } from 'lucide-react';

export function CheckoutPage() {
  const { cart, cartTotal, addresses, paymentMethods, clearCart } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [selectedAddress, setSelectedAddress] = useState(addresses.find(a => a.isDefault)?.id || '');
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods.find(p => p.isDefault)?.id || '');
  const [guestEmail, setGuestEmail] = useState('');
  const [useGuestCheckout, setUseGuestCheckout] = useState(false);

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handlePlaceOrder = () => {
    // Simulate order placement
    const orderId = 'ORD-' + Date.now();
    clearCart();
    navigate(`/order/${orderId}`, { state: { newOrder: true } });
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-blue-600' : 'text-green-600'}`}>
              <div className={`size-8 rounded-full flex items-center justify-center ${
                step === 'shipping' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
              }`}>
                {step !== 'shipping' ? <Check className="size-5" /> : '1'}
              </div>
              <span className="hidden sm:inline font-semibold">Shipping</span>
            </div>
            <div className="h-0.5 w-12 sm:w-24 bg-gray-300" />
            <div className={`flex items-center gap-2 ${
              step === 'payment' ? 'text-blue-600' : step === 'review' ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`size-8 rounded-full flex items-center justify-center ${
                step === 'payment' ? 'bg-blue-600 text-white' : step === 'review' ? 'bg-green-600 text-white' : 'bg-gray-300 text-white'
              }`}>
                {step === 'review' ? <Check className="size-5" /> : '2'}
              </div>
              <span className="hidden sm:inline font-semibold">Payment</span>
            </div>
            <div className="h-0.5 w-12 sm:w-24 bg-gray-300" />
            <div className={`flex items-center gap-2 ${step === 'review' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`size-8 rounded-full flex items-center justify-center ${
                step === 'review' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-white'
              }`}>
                3
              </div>
              <span className="hidden sm:inline font-semibold">Review</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Guest Checkout Option */}
            {step === 'shipping' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-blue-900 mb-3">Express Guest Lane</h3>
                <p className="text-sm text-blue-800 mb-4">
                  Shop faster without creating an account. We'll only ask for the essentials.
                </p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useGuestCheckout}
                    onChange={(e) => setUseGuestCheckout(e.target.checked)}
                    className="size-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium">Continue as guest</span>
                </label>
                {useGuestCheckout && (
                  <input
                    type="email"
                    placeholder="Email for order updates"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            )}

            {/* Shipping Address */}
            {step === 'shipping' && (
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="size-6 text-blue-600" />
                  <h2 className="text-xl font-bold">Shipping Address</h2>
                </div>

                <div className="space-y-4 mb-6">
                  {addresses.map(address => (
                    <label
                      key={address.id}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedAddress === address.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{address.name}</span>
                        {address.isDefault && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{address.street}</div>
                        <div>{address.city}, {address.state} {address.zip}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-6">
                  + Add new address
                </button>

                <button
                  onClick={() => setStep('payment')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment Method */}
            {step === 'payment' && (
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="size-6 text-blue-600" />
                  <h2 className="text-xl font-bold">Payment Method</h2>
                </div>

                <div className="space-y-4 mb-6">
                  {paymentMethods.map(method => (
                    <label
                      key={method.id}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {method.type === 'card' ? (
                            <>
                              <CreditCard className="size-5 text-gray-600" />
                              <div>
                                <div className="font-semibold">
                                  {method.brand} •••• {method.last4}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="size-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                PP
                              </div>
                              <div className="font-semibold">PayPal</div>
                            </>
                          )}
                        </div>
                        {method.isDefault && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-6">
                  + Add new payment method
                </button>

                {/* Rewards & Gift Cards */}
                <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="size-5 text-purple-600" />
                    <span className="font-semibold text-purple-900">Apply Rewards or Gift Card</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('shipping')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('review')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Review Order */}
            {step === 'review' && (
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-6">Review Your Order</h2>

                {/* Items */}
                <div className="space-y-4 mb-6 pb-6 border-b">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="size-16 bg-gray-100 rounded-lg flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{item.product.name}</div>
                        <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Address */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-semibold mb-3">Shipping to</h3>
                  {addresses.find(a => a.id === selectedAddress) && (
                    <div className="text-sm text-gray-600">
                      <div className="font-semibold text-gray-900">
                        {addresses.find(a => a.id === selectedAddress)?.name}
                      </div>
                      <div>{addresses.find(a => a.id === selectedAddress)?.street}</div>
                      <div>
                        {addresses.find(a => a.id === selectedAddress)?.city}, {addresses.find(a => a.id === selectedAddress)?.state} {addresses.find(a => a.id === selectedAddress)?.zip}
                      </div>
                    </div>
                  )}
                </div>

                {/* Selected Payment */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Payment method</h3>
                  {paymentMethods.find(p => p.id === selectedPayment) && (
                    <div className="text-sm">
                      {paymentMethods.find(p => p.id === selectedPayment)?.type === 'card' ? (
                        <span>
                          {paymentMethods.find(p => p.id === selectedPayment)?.brand} •••• {paymentMethods.find(p => p.id === selectedPayment)?.last4}
                        </span>
                      ) : (
                        <span>PayPal</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('payment')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="size-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
