import type { ImagePlaceholder } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: 'new-arrivals' | 'luxury-formals' | 'everyday-comfort';
  images: ImagePlaceholder[];
  stock: number;
  description: string;
  details: string;
  fabric: string;
  colors: string[];
  rating: number;
  reviewCount: number;
};

export type Category = {
  id: 'new-arrivals' | 'luxury-formals' | 'everyday-comfort';
  name: string;
  description: string;
};

export type Testimonial = {
  id: string;
  name: string;
  handle: string;
  quote: string;
  avatar: ImagePlaceholder;
};
