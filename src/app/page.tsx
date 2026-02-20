
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, products, testimonials } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ProductCard } from '@/components/product-card';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

type HeroContent = {
  image: (typeof PlaceHolderImages)[0];
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

export default function Home() {
  const heroContent: HeroContent[] = [
    {
      image: PlaceHolderImages.find(img => img.id === 'hero-1')!,
      title: "Elegance. Simplified.",
      subtitle: "Timeless fashion, effortlessly beautiful. Discover our new collection.",
      buttonText: "Shop New Arrivals",
      buttonLink: "/shop?category=new-arrivals"
    },
    {
      image: PlaceHolderImages.find(img => img.id === 'hero-2')!,
      title: "Luxury Redefined",
      subtitle: "Exquisite designs for your most cherished moments.",
      buttonText: "Explore Formals",
      buttonLink: "/shop?category=luxury-formals"
    },
    {
      image: PlaceHolderImages.find(img => img.id === 'hero-3')!,
      title: "Comfort in Style",
      subtitle: "Where everyday comfort meets sophisticated design.",
      buttonText: "Discover Everyday Wear",
      buttonLink: "/shop?category=everyday-comfort"
    },
    {
      image: PlaceHolderImages.find(img => img.id === 'hero-4')!,
      title: "A Touch of Tradition",
      subtitle: "Celebrating heritage with stunning, modern craftsmanship.",
      buttonText: "View Collection",
      buttonLink: "/shop"
    },
    {
      image: PlaceHolderImages.find(img => img.id === 'hero-5')!,
      title: "Modern Heritage",
      subtitle: "Contemporary designs inspired by classic elegance.",
      buttonText: "Explore Now",
      buttonLink: "/shop"
    }
  ];

  const newArrivals = products.filter(p => p.category === 'new-arrivals').slice(0, 4);
  const instagramImages = PlaceHolderImages.filter(img => img.id.startsWith('ig-')).slice(0, 5);

  const categoryNewArrivals = categories.find(c => c.id === 'new-arrivals');
  const categoryLuxuryFormals = categories.find(c => c.id === 'luxury-formals');
  const categoryEverydayComfort = categories.find(c => c.id === 'everyday-comfort');

  const getCategoryImage = (categoryId: string) => {
    return PlaceHolderImages.find(img => img.id === `category-${categoryId}`) || PlaceHolderImages[0];
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[110vh] w-full">
         <Carousel
          className="w-full h-full"
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          opts={{ loop: true }}
        >
          <CarouselContent className="h-full">
            {heroContent.map((content) => (
              <CarouselItem key={content.image.id} className="h-full">
                <div className="relative h-full w-full">
                  <img
                    src={content.image.imageUrl}
                    alt={content.image.description}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    data-ai-hint={content.image.imageHint}
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                   <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white animate-in fade-in duration-1000">
                      <h1 className="text-4xl font-extralight tracking-wider md:text-6xl lg:text-7xl">{content.title}</h1>
                      <p className="mt-4 max-w-2xl text-lg md:text-xl">{content.subtitle}</p>
                      <Button asChild size="lg" className="mt-8 bg-white/90 text-black hover:bg-white rounded-full transition-transform hover:scale-105">
                        <Link href={content.buttonLink}>{content.buttonText} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-wide uppercase">Shop By Category</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">Explore our curated collections for every aspect of your life.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[categoryNewArrivals, categoryLuxuryFormals, categoryEverydayComfort].map((category) => category && (
              <Link
                key={category.id}
                href={`/shop?category=${category.id}`}
                className={`group relative block overflow-hidden rounded-lg`}
              >
                <div className="relative w-full aspect-[4/5]">
                  <img
                    src={getCategoryImage(category.id).imageUrl}
                    alt={category.description}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={getCategoryImage(category.id).imageHint}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                  <h3 className="text-2xl font-medium">{category.name}</h3>
                  <p className="mt-1 text-sm opacity-90">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="bg-card py-16 sm:py-24 animate-in fade-in slide-in-from-bottom-12 duration-700">
        <div className="container mx-auto px-4 md:px-6 text-center flex flex-col items-center">
          <div className="mb-12">
            <h2 className="text-3xl font-light tracking-wide text-foreground uppercase">New Arrivals</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">The latest styles to elevate your wardrobe.</p>
            <Link href="/shop?category=new-arrivals" className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary/80 group">
              Shop the collection <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1"> &rarr;</span>
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 text-left w-full">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 animate-in fade-in slide-in-from-bottom-16 duration-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-light tracking-wide uppercase">What Our Customers Say</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 bg-transparent shadow-none text-center">
                <CardContent className="flex flex-col items-center p-0">
                  <Avatar className="h-16 w-16 mb-4 border-2 border-accent">
                    <AvatarImage src={testimonial.avatar.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.avatar.imageHint} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <blockquote className="text-muted-foreground italic font-light">"{testimonial.quote}"</blockquote>
                  <div className="mt-4 font-semibold tracking-tight">{testimonial.name}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{testimonial.handle}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="bg-card py-16 sm:py-24 animate-in fade-in slide-in-from-bottom-20 duration-700">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-light tracking-wide uppercase">Follow Our Journey</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">@elysianthreads</p>
          <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {instagramImages.map((image) => (
              <Link key={image.id} href="#" className="group block overflow-hidden aspect-square relative">
                <img
                  src={image.imageUrl}
                  alt={image.description}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint={image.imageHint}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
