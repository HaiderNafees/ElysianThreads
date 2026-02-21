'use client';

import React from 'react';
import Link from 'next/link';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { Loader2, Heart } from 'lucide-react';
import { useMemo } from 'react';

export default function WishlistPage() {
  const [user, setUser] = React.useState<any>(null);
  const [wishlistItems, setWishlistItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check for user in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      // Load wishlist from localStorage
      const wishlistData = localStorage.getItem('wishlist');
      if (wishlistData) {
        setWishlistItems(JSON.parse(wishlistData));
      }
    }
    setLoading(false);
  }, []);

  const favoriteProducts = React.useMemo(() => {
    if (!wishlistItems) return [];
    return products.filter(product => 
      wishlistItems.some(item => item.productId === product.id)
    );
  }, [wishlistItems]);


  if (loading) {
    return <div className="flex justify-center items-center h-[calc(100vh-5rem)]"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Please log in to view your wishlist</h1>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">Explore our collections and save your favorite items.</p>
        <Button asChild>
          <Link href="/shop">Discover Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-light tracking-wide text-center mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
