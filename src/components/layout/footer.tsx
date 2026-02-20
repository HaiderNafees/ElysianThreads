'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
             <div className="mb-4">
                <Logo className="h-8 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">Elegance. Simplified.</p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="text-muted-foreground hover:text-foreground">All</Link></li>
              <li><Link href="/new-arrivals" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
              <li><Link href="/luxury-formals" className="text-muted-foreground hover:text-foreground">Luxury Formals</Link></li>
              <li><Link href="/everyday-comfort" className="text-muted-foreground hover:text-foreground">Everyday Comfort</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">Our Story</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-4 font-semibold">Join Our Newsletter</h4>
            <p className="mb-4 text-sm text-muted-foreground">Receive updates on new arrivals and special offers.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email address" className="flex-1" name="email" />
              <Button type="submit" variant="default">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {year ?? ''} Elysian Threads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
