# ElysianThreads - Modern eCommerce Frontend

A sophisticated, responsive eCommerce frontend built with Next.js 15, featuring a clean design and optimized user experience. This project serves as a modern frontend template ready for backend integration.

## 🚀 Live Demo

[**View Live Site**](https://elysianthreads.vercel.app)

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Package Manager**: npm
- **Optional Backend**: Ready for Supabase integration

## ✨ Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **SEO Optimized**: Static generation with proper meta tags and structured data
- **Product Catalog**: Dynamic product listing with filtering and sorting
- **Shopping Cart**: Local storage-based cart functionality
- **Wishlist**: User wishlist management with localStorage
- **Authentication**: Mock authentication system (ready for backend integration)
- **Modern UI**: Clean, minimalist design with smooth animations
- **Performance**: Optimized images and lazy loading
- **Accessibility**: ARIA labels and semantic HTML
- **TypeScript**: Full type safety throughout the application

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HaiderNafees/ElysianThreads.git
   cd ElysianThreads
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Environment Variables (Optional)

For backend integration with Supabase, create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

*Note: The project currently uses localStorage for data persistence and can run without any environment variables.*

## 📁 Project Structure

```
ElysianThreads/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (pages)/           # Route groups
│   │   ├── api/               # API routes (when needed)
│   │   ├── cart/              # Shopping cart page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── login/             # Login page
│   │   ├── new-arrivals/      # New arrivals page
│   │   ├── page.tsx           # Home page
│   │   ├── products/          # Product detail pages
│   │   ├── shop/              # Shop page with filters
│   │   ├── signup/            # Signup page
│   │   └── wishlist/          # Wishlist page
│   ├── components/            # Reusable components
│   │   ├── layout/            # Layout components
│   │   ├── product-card.tsx   # Product card component
│   │   ├── theme-provider.tsx # Theme context
│   │   └── ui/               # UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and data
│   │   ├── data.ts            # Product data
│   │   ├── types.ts           # TypeScript types
│   │   └── utils.ts           # Utility functions
│   └── styles/                # Additional styles
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🚀 Deployment

This project is optimized for Vercel deployment:

1. **Connect to Vercel**
   - Push your code to GitHub
   - Import the repository in [Vercel Dashboard](https://vercel.com/dashboard)
   - Connect your GitHub account

2. **Automatic Deployment**
   - Vercel will automatically detect Next.js
   - Build settings are pre-configured
   - Deploy on every push to main branch

3. **Custom Domain** (Optional)
   - Add your custom domain in Vercel dashboard
   - Configure DNS settings as provided

## 🎯 Key Pages

- **Home**: Landing page with featured products
- **Shop**: Product catalog with filters and sorting
- **Product Details**: Individual product pages with add to cart
- **Cart**: Shopping cart management
- **Wishlist**: Saved items management
- **Login/Signup**: User authentication (mock implementation)

## 🔮 Backend Integration

This frontend is designed to be backend-agnostic and ready for integration:

- **Authentication**: Mock system ready for Firebase, Supabase, or custom auth
- **Data Management**: localStorage implementation (easily replaceable with API calls)
- **State Management**: React hooks (can be extended with Redux/Zustand)
- **API Ready**: Structured for easy API integration

## 📱 Responsive Design

- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## 🤝 Contributing

This project is maintained as a frontend template. Feel free to:
- Report issues
- Suggest improvements
- Submit pull requests
- Use as a template for your projects

## 📞 Contact

**Developer**: Nafees Haider

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Note**: This is a frontend-only template project. All data is currently managed through localStorage for demonstration purposes. The project is structured to easily integrate with any backend service of your choice.