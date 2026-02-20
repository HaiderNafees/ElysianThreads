
'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { data: user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!user || !firestore) {
      setIsFavorite(false);
      return;
    };
    const wishlistItemRef = doc(firestore, `users/${user.uid}/wishlist`, product.id);
    getDoc(wishlistItemRef).then((docSnap) => {
      setIsFavorite(docSnap.exists());
    });
  }, [user, firestore, product.id]);


  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user || !firestore) {
      router.push('/login');
      return;
    }

    const wishlistItemRef = doc(firestore, `users/${user.uid}/wishlist`, product.id);
    
    if (isFavorite) {
        setIsFavorite(false);
        deleteDoc(wishlistItemRef).then(() => {
            toast({
              title: "Removed from Wishlist",
              description: `${product.name} has been removed from your wishlist.`,
            });
        }).catch(async (serverError) => {
            setIsFavorite(true); // Revert optimistic update
            const permissionError = new FirestorePermissionError({
                path: wishlistItemRef.path,
                operation: 'delete',
            });
            errorEmitter.emit('permission-error', permissionError);
        });
    } else {
        setIsFavorite(true);
        const itemData = { productId: product.id };
        setDoc(wishlistItemRef, itemData).then(() => {
            toast({
              title: "Added to Wishlist",
              description: `${product.name} has been added to your wishlist.`,
            });
        }).catch(async (serverError) => {
           setIsFavorite(false); // Revert optimistic update
           const permissionError = new FirestorePermissionError({
            path: wishlistItemRef.path,
            operation: 'create',
            requestResourceData: itemData,
           });
           errorEmitter.emit('permission-error', permissionError);
        });
    }
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
