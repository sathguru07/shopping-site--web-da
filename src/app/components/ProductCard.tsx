import { Link } from 'react-router';
import { Heart, ShoppingCart, Users, Leaf } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const hasEcoScore = product.ecoScore && (
    product.ecoScore.plasticFree ||
    product.ecoScore.carbonNeutral ||
    product.ecoScore.sustainable
  );

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-card/50 backdrop-blur-md rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:bg-card/80"
    >
      <div className="relative aspect-square overflow-hidden bg-muted/20">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPercent > 0 && (
            <span className="bg-red-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-red-500/20">
              {discountPercent}% OFF
            </span>
          )}
          {hasEcoScore && (
            <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-green-500/20">
              <Leaf className="size-3" />
              Eco
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full text-foreground hover:bg-black/60 transition-colors border border-white/10"
        >
          <Heart
            className={`size-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-white'}`}
          />
        </button>

        {/* Group Buying Badge */}
        {product.groupBuyingActive && (
          <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg border border-white/20">
            <div className="flex items-center gap-2 mb-1">
              <Users className="size-4" />
              <span className="font-semibold">Team Up & Save {product.groupBuyingDiscount}%!</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>{product.groupBuyingCurrent}/{product.groupBuyingTarget} joined</span>
              <span className="bg-white/20 px-2 py-0.5 rounded">
                {product.groupBuyingTarget! - product.groupBuyingCurrent!} needed
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold text-sm text-foreground">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
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

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
        >
          <ShoppingCart className="size-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </Link>
  );
}
