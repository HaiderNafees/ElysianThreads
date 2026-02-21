
'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const [user, setUser] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Check for user in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      // Check if product is in wishlist
      const wishlistData = localStorage.getItem('wishlist');
      if (wishlistData) {
        const wishlist = JSON.parse(wishlistData);
        setIsFavorite(wishlist.some((item: any) => item.productId === product.id));
      }
    }
  }, [product.id]);


  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push('/login');
      return;
    }

    // Get current wishlist from localStorage
    const wishlistData = localStorage.getItem('wishlist');
    let wishlist = wishlistData ? JSON.parse(wishlistData) : [];
    
    if (isFavorite) {
      // Remove from wishlist
      wishlist = wishlist.filter((item: any) => item.productId !== product.id);
      setIsFavorite(false);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      // Add to wishlist
      wishlist.push({ productId: product.id });
      setIsFavorite(true);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
    
    // Save updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  return (
    <div className={cn("group relative", className)}>
      <Link href={`/products/${product.id}`}>
        <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-secondary">
          <img
            src={product.images[0].imageUrl}
            alt={product.name}
            data-ai-hint={product.images[0].imageHint}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-foreground">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.colors[0]}</p>
          </div>
          <p className="text-sm font-medium text-foreground">${product.price}</p>
        </div>
      </Link>
      <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <Button size="icon" variant="ghost" className="rounded-full bg-background/50 hover:bg-background" onClick={handleWishlistToggle}>
          <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-foreground")} />
        </Button>
      </div>
    </div>
  );
}
