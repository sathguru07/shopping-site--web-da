import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DashboardPage } from './pages/DashboardPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { LoginPage } from './pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage
      },
      {
        path: 'product/:id',
        Component: ProductDetailPage
      },
      {
        path: 'cart',
        Component: CartPage
      },
      {
        path: 'checkout',
        Component: CheckoutPage
      },
      {
        path: 'dashboard',
        Component: DashboardPage
      },
      {
        path: 'wishlist',
        Component: WishlistPage
      },
      {
        path: 'order/:id',
        Component: OrderTrackingPage
      }
    ]
  },
  {
    path: '/login',
    Component: LoginPage
  }
]);
