# AI/ML Portfolio

A modern, responsive portfolio website showcasing AI/ML expertise and professional development journey. Built with Next.js 15, TypeScript, and Tailwind CSS with comprehensive dark theme support and accessibility features.

## ✨ Features

- 🎨 **Responsive Dark Theme** - WCAG 2.1 AA compliant with system preference detection
- 📱 **Mobile-First Design** - Optimized for all device sizes (320px+)
- ♿ **Accessibility** - Screen reader support, keyboard navigation, reduced motion
- 🚀 **Performance** - Core Web Vitals optimized, lazy loading, efficient animations
- 🔧 **Modern Stack** - Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- 🧪 **Comprehensive Testing** - Unit, integration, and E2E tests with 90%+ coverage
- 📊 **Analytics Ready** - Vercel Analytics integration
- 🛡️ **Type Safe** - Strict TypeScript with comprehensive type definitions

## 🛠️ Tech Stack

| Category          | Technology          | Purpose                    |
| ----------------- | ------------------- | -------------------------- |
| **Frontend**      | Next.js 15          | Full-stack React framework |
| **Language**      | TypeScript          | Type-safe development      |
| **Styling**       | Tailwind CSS        | Utility-first CSS          |
| **UI Components** | shadcn/ui           | Accessible UI primitives   |
| **Animation**     | Framer Motion       | Smooth animations          |
| **Testing**       | Vitest + Playwright | Unit + E2E testing         |
| **Deployment**    | Vercel              | Hosting + CDN              |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-ml-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components (Header, Navigation)
│   ├── sections/          # Page sections (Hero, About, Skills)
│   └── common/            # Shared components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── types/            # TypeScript definitions
│   ├── utils/            # Helper functions
│   └── constants/        # App constants
├── styles/               # Style files
│   ├── themes/          # Theme definitions
│   └── globals/         # Global styles
└── data/                # Static data and content
```

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run E2E tests
npm run test:coverage # Generate coverage report

# Quality Checks
npm run quality-check # Run all quality checks
```

### Theme System

The project includes a comprehensive theme system with:

- **Dark/Light Mode** - Automatic system preference detection
- **WCAG Compliance** - 4.5:1 contrast ratios for AA standards
- **Responsive Design** - Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Reduced Motion** - Respects user accessibility preferences
- **Custom Properties** - CSS variables for consistent theming

### Testing Strategy

- **Unit Tests** - Component and utility testing with Vitest
- **Integration Tests** - Cross-component functionality
- **E2E Tests** - Full user journey testing with Playwright
- **Accessibility Tests** - Color contrast and keyboard navigation
- **Performance Tests** - Core Web Vitals validation

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment variables** (if needed):
   ```bash
   NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
   ```

### Manual Deployment

```bash
npm run build
npm run start
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: Optimized with code splitting
- **Accessibility**: WCAG 2.1 AA compliant

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Vercel](https://vercel.com/) - Deployment platform
