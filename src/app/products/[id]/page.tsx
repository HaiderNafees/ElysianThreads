
'use client';

import React, { useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Truck, ShieldCheck, Plus, Minus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const { data: user } = useUser();
  const firestore = useFirestore();

  const product = products.find(p => p.id === resolvedParams.id);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.images?.[0]?.imageUrl || '');

  if (!product) {
    notFound();
    return null;
  }

  const handleAddToCart = () => {
    if (!user || !firestore) {
      router.push('/login');
      return;
    }

    const cartItemRef = doc(firestore, `users/${user.uid}/cart`, product.id);
    const itemData = { productId: product.id, quantity };
    
    setDoc(cartItemRef, itemData, { merge: true })
      .then(() => {
        toast({
          title: "Added to Cart",
          description: `${product.name} has been added to your cart.`,
        });
      })
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: cartItemRef.path,
          operation: 'create',
          requestResourceData: itemData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-2 justify-center overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {product.images.map((image) => (
              <button
                key={image.id}
                className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                  activeImage === image.imageUrl ? 'border-primary' : 'border-transparent hover:border-muted-foreground/30'
                }`}
                onClick={() => setActiveImage(image.imageUrl)}
              >
                <img
                  src={image.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-secondary">
            <img
              src={activeImage || product.images[0].imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-light tracking-wide mb-2 uppercase">{product.name}</h1>
          <p className="text-2xl font-medium mb-4">${product.price.toFixed(2)}</p>
          
          <div className="flex items-center gap-2 text-sm mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>
          
          <Separator className="my-6" />

          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-widest font-medium mb-3">Color: {selectedColor}</h3>
            <RadioGroup
              value={selectedColor}
              onValueChange={setSelectedColor}
              className="flex gap-3"
            >
              {product.colors.map((color) => (
                <div key={color} className="flex items-center">
                  <RadioGroupItem
                    value={color}
                    id={`color-${color}`}
                    className="sr-only"
                  />
                  <label
                    htmlFor={`color-${color}`}
                    className={`h-10 w-10 rounded-full border-2 cursor-pointer transition-all ${
                      selectedColor === color ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                    style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                    title={color}
                  />
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 my-8">
            <div className="flex items-center border rounded-md h-12 bg-background">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-none h-full hover:bg-transparent"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-none h-full hover:bg-transparent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" className="w-full sm:flex-1 h-12 rounded-full uppercase tracking-widest text-xs" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
          
          <Separator className="my-8" />
          
          <Accordion type="single" collapsible defaultValue="description" className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-xs uppercase tracking-widest font-semibold">Description</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm">
                {product.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="details">
              <AccordionTrigger className="text-xs uppercase tracking-widest font-semibold">Product Details</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm">
                {product.details}
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="fabric">
              <AccordionTrigger className="text-xs uppercase tracking-widest font-semibold">Fabric & Care</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm">
                {product.fabric}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-8 space-y-4 text-xs text-muted-foreground bg-secondary/20 p-6 rounded-lg uppercase tracking-wider">
            <div className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
