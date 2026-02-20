'use client';

import React from 'react';
import Link from 'next/link';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, Loader2, Heart } from 'lucide-react';
import { useMemo } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function CartPage() {
  const { data: user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const cartCollectionRef = useMemo(() => {
    if (!firestore || !user) return null;
    return collection(firestore, `users/${user.uid}/cart`);
  }, [firestore, user]);
  
  const { data: cartItems, loading: cartLoading } = useCollection(cartCollectionRef);

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (!firestore || !user || newQuantity < 1) return;
    const itemRef = doc(firestore, `users/${user.uid}/cart`, cartItemId);
    const itemData = { quantity: newQuantity };
    updateDoc(itemRef, itemData).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: itemRef.path,
        operation: 'update',
        requestResourceData: itemData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const handleRemoveItem = (cartItemId: string) => {
    if (!firestore || !user) return;
    const itemRef = doc(firestore, `users/${user.uid}/cart`, cartItemId);
    deleteDoc(itemRef).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: itemRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const cartDetails = React.useMemo(() => {
    if (!cartItems) return [];
    return cartItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        product,
      };
    }).filter(item => item.product); // Filter out items where product not found
  }, [cartItems]);

  const subtotal = React.useMemo(() => {
    return cartDetails.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);
  }, [cartDetails]);


  if (userLoading || cartLoading) {
    return <div className="flex justify-center items-center h-[calc(100vh-5rem)]"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Please log in to view your cart</h1>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  if (cartDetails.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-light tracking-wide text-center mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartDetails.map(item => (
            <Card key={item.id} className="p-4">
              <CardContent className="flex items-center gap-4 p-0">
                <div className="relative h-24 w-24 rounded-md overflow-hidden bg-secondary">
                  <img
                    src={item.product?.images[0].imageUrl || ''}
                    alt={item.product?.name || ''}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.product?.id}`} className="font-medium hover:underline">{item.product?.name}</Link>
                  <p className="text-muted-foreground text-sm">${item.product?.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                   <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                      className="w-16 h-9 text-center"
                    />
                </div>
                 <p className="font-medium w-20 text-right">${((item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                  <Trash2 className="h-5 w-5 text-muted-foreground" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-6" size="lg">Proceed to Checkout</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
