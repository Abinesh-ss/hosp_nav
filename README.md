# HospiNav Pro - Hospital Indoor Navigation SaaS

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Stripe account (for payments)
- Cloudinary account (for image storage)

### Setup Instructions

1. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma generate
npx prisma db push
npm run dev
```

2. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local
npm run dev
```

3. **Mobile App Setup**
```bash
cd mobile
npm install
npx expo start
```

## Architecture

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes with Prisma ORM
- **Mobile**: React Native with Expo
- **Database**: PostgreSQL
- **Storage**: Cloudinary
- **Payments**: Stripe

## Key Features

- Visual map builder with drag-and-drop
- A* pathfinding algorithm
- Real-time sensor-based navigation
- Multi-floor routing
- Stripe subscription management
- Usage-based credits system

## Deployment

- Frontend/Backend: Vercel
- Database: Railway/Render PostgreSQL
- Mobile: Expo EAS Build
