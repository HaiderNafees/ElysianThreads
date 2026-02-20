'use client';

import React from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const aboutHeroImage = PlaceHolderImages.find(img => img.id === 'about-hero');
  const ourStoryImage = PlaceHolderImages.find(img => img.id === 'ig-2');
  const designerImage = PlaceHolderImages.find(img => img.id === 'about-designer');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full bg-secondary">
        {aboutHeroImage && (
          <img
            src={aboutHeroImage.imageUrl}
            alt={aboutHeroImage.description}
            className="absolute inset-0 h-full w-full object-cover object-center"
            data-ai-hint={aboutHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white">
          <h1 className="text-4xl font-light tracking-wider md:text-6xl">Our Story</h1>
          <p className="mt-4 max-w-2xl text-lg">Weaving tradition with contemporary elegance.</p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-light tracking-wide text-foreground">Our Mission</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              At Elysian Threads, our mission is to celebrate the rich heritage of Pakistani craftsmanship through designs that are both timeless and modern. We believe in elegance simplified, creating pieces that empower women to feel beautiful and confident in their everyday lives and most cherished moments.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-card py-16 sm:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full aspect-[4/5]">
              {ourStoryImage && (
                <img
                  src={ourStoryImage.imageUrl}
                  alt={ourStoryImage.description}
                  className="absolute inset-0 h-full w-full object-cover rounded-lg"
                  data-ai-hint={ourStoryImage.imageHint}
                />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-light tracking-wide mb-4">From A Dream to a Reality</h3>
              <p className="text-muted-foreground mb-4">
                Founded from a passion for the intricate artistry of Pakistani textiles, Elysian Threads began as a small boutique with a big dream: to bring the beauty of our culture to the global stage. We traveled through bustling markets and quiet villages, connecting with artisans who have honed their skills over generations.
              </p>
              <p className="text-muted-foreground">
                Each collection tells a story of these journeys, blending traditional techniques with contemporary silhouettes to create something truly unique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Designer Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="md:order-2 relative w-full aspect-[4/5]">
              {designerImage && (
                <img
                  src={designerImage.imageUrl}
                  alt={designerImage.description}
                  className="absolute inset-0 h-full w-full object-cover rounded-lg"
                  data-ai-hint={designerImage.imageHint}
                />
              )}
            </div>
            <div className="md:order-1">
              <h3 className="text-2xl font-light tracking-wide mb-4">Meet the Designer</h3>
              <p className="text-muted-foreground mb-4">
                Our creative visionary, Aleena Khan, blends her love for heritage with a modern design sensibility. With an eye for detail and a passion for craftsmanship, she brings each collection to life, ensuring every piece is a work of art.
              </p>
              <p className="text-muted-foreground">
                "I believe fashion is a form of self-expression. My goal is to create clothes that not only look beautiful but also make you feel connected to a rich story of artistry."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-card py-16 sm:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-light tracking-wide">What Our Customers Say</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 bg-transparent shadow-none text-center">
                <CardContent className="flex flex-col items-center p-0">
                  <Avatar className="h-16 w-16 mb-4">
                    <AvatarImage src={testimonial.avatar.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.avatar.imageHint} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <blockquote className="text-muted-foreground">"{testimonial.quote}"</blockquote>
                  <div className="mt-4 font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.handle}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
