'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories as allCategories } from '@/lib/data';
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
import { ChevronDown, Filter } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Get unique values for filters from product data
const uniqueColors = Array.from(new Set(products.flatMap(p => p.colors)));
const uniqueFabrics = Array.from(new Set(products.map(p => p.fabric)));
const maxPrice = Math.max(...products.map(p => p.price));

interface ShopContentProps {
  initialCategory?: string;
}

export function ShopContent({ initialCategory = 'all' }: ShopContentProps) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    category: initialCategory,
    color: 'all',
    fabric: 'all',
    price: [0, maxPrice],
  });
  const [sort, setSort] = useState('newest');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Filter by color
    if (filters.color !== 'all') {
      filtered = filtered.filter(p => p.colors.includes(filters.color));
    }
    
    // Filter by fabric
    if (filters.fabric !== 'all') {
        filtered = filtered.filter(p => p.fabric === filters.fabric);
    }

    // Filter by price
    filtered = filtered.filter(p => p.price >= filters.price[0] && p.price <= filters.price[1]);

    // Sorting logic
    filtered.sort((a, b) => {
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

    return filtered;
  }, [filters, sort]);

  const handleFilterChange = (filterName: string, value: string | number[]) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({
        category: 'all',
        color: 'all',
        fabric: 'all',
        price: [0, maxPrice],
    });
  };

  const shopCategories = [{ id: 'all', name: 'All Products', description: 'Explore our entire collection.' }, ...allCategories];
  const currentCategory = shopCategories.find(c => c.id === filters.category);

  const FilterSidebarContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Category</h3>
        <div className="space-y-2">
          {shopCategories.map(cat => (
            <Button
              key={cat.id}
              variant={filters.category === cat.id ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleFilterChange('category', cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      <Separator />
      
      <div>
          <h3 className="text-lg font-medium mb-4">Filter By</h3>
          <div className="space-y-4">
              {/* Color Filter */}
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                          Color: {filters.color} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                      <DropdownMenuRadioGroup value={filters.color} onValueChange={(v) => handleFilterChange('color', v)}>
                          <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                          {uniqueColors.map(color => (
                              <DropdownMenuRadioItem key={color} value={color}>{color}</DropdownMenuRadioItem>
                          ))}
                      </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
              </DropdownMenu>

               {/* Fabric Filter */}
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                          Fabric: {filters.fabric} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                      <DropdownMenuRadioGroup value={filters.fabric} onValueChange={(v) => handleFilterChange('fabric', v)}>
                          <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                          {uniqueFabrics.map(fabric => (
                              <DropdownMenuRadioItem key={fabric} value={fabric}>{fabric}</DropdownMenuRadioItem>
                          ))}
                      </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={filters.price}
          onValueChange={(value) => handleFilterChange('price', value)}
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>${filters.price[0]}</span>
          <span>${filters.price[1]}</span>
        </div>
      </div>

      <Separator />

      <Button variant="outline" className="w-full" onClick={clearFilters}>Clear All Filters</Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light tracking-wide">{currentCategory?.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{currentCategory?.description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden lg:block lg:col-span-1">
          <FilterSidebarContent />
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
           <div className="flex items-center justify-between mb-8">
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-3/4 sm:w-1/2">
                      <div className="p-4 overflow-y-auto h-full">
                        <FilterSidebarContent />
                      </div>
                  </SheetContent>
                </Sheet>
              </div>
              <p className="text-sm text-muted-foreground hidden sm:block">{filteredProducts.length} products</p>
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

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
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
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
