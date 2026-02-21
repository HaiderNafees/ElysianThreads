'use client';

import React, { useState, useMemo } from 'react';
import { products, categories } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import type { Product } from '@/lib/types';
import Link from 'next/link';

export function NewArrivalsContent() {
  const [sort, setSort] = useState('newest');
  
  const filteredProducts = useMemo(() => {
    let newArrivals = products.filter(p => p.category === 'new-arrivals');

    // Sorting logic
    newArrivals.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
        default:
          return parseInt(b.id) - parseInt(a.id);
      }
    });

    return newArrivals;
  }, [sort]);

  const pageCategory = categories.find(c => c.id === 'new-arrivals');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light tracking-wide">{pageCategory?.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{pageCategory?.description}</p>
      </div>

      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-muted-foreground">{filteredProducts.length} products</p>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort by: {sort.replace('-', ' ')} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      {filteredProducts.length === 0 && (
          <div className="text-center col-span-full py-16">
            <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
            <p className="text-muted-foreground mb-6">
              Your filters did not match any products. Try clearing them.
            </p>
            <Button asChild variant="outline">
              <Link href="/new-arrivals">Clear Filters</Link>
            </Button>
          </div>
      )}
    </div>
  );
}
