
import { Suspense } from 'react';
import { products } from '@/lib/data';
import { ShopContent } from './shop-content';

// Get unique values for filters from product data (server-side)
const uniqueColors = Array.from(new Set(products.flatMap(p => p.colors)));
const uniqueFabrics = Array.from(new Set(products.map(p => p.fabric)));
const maxPrice = Math.max(...products.map(p => p.price));

export default function ShopPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const initialCategory = searchParams?.category || 'all';

  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-wide">Loading Shop...</h1>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-secondary mb-4"></div>
              <div className="h-4 bg-secondary rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-secondary rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    }>
      <ShopContent initialCategory={initialCategory} />
    </Suspense>
  );
}
