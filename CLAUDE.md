# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChiCo is a property management automation platform built with TypeScript, React, and Express. It provides SMS-based lead automation, tenant communication tools, and visitor entry management for small landlords (1-10 properties).

## Key Commands

### Development
```bash
npm run dev                  # Start development server (Express + Vite HMR)
```

### Build & Production
```bash
npm run build               # Build client (Vite) and server (esbuild) for production
npm start                   # Run production server
```

### Database
```bash
npm run db:push            # Push schema changes to database (Drizzle Kit)
```

### Type Checking
```bash
npm run check              # Run TypeScript type checking
```

## Architecture Overview

### Full-Stack TypeScript Application
- **Client**: React SPA with Vite, located in `/client`
- **Server**: Express API server, located in `/server`
- **Shared**: Common types and schemas in `/shared`
- **Database**: PostgreSQL with Drizzle ORM

### Client Architecture (`/client/src`)
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui components in `/components/ui`
- **Pages**: Route components in `/pages` (home, dashboard, demo, not-found)
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom theme variables

### Server Architecture (`/server`)
- **Entry Point**: `index.ts` - Express server with Vite integration
- **Routes**: `routes.ts` - API route registration
- **Database**: `db.ts` - Drizzle ORM configuration
- **Services**: 
  - `openai.ts` - Lead categorization and response generation
  - `twilio.ts` - SMS messaging integration
- **Session Storage**: PostgreSQL-backed sessions

### Database Schema (`/shared/schema.ts`)
Core entities with relationships:
- **users**: Authentication and profile management
- **properties**: Property management with user ownership
- **tenants**: Tenant records linked to properties
- **leads**: Lead tracking with categorization and urgency scoring
- **communications**: Message history and interactions
- **visitorApprovals**: SMS-based visitor entry approval system

### Path Aliases
- `@/`: Maps to `/client/src/`
- `@shared`: Maps to `/shared/`
- `@assets`: Maps to `/attached_assets/`

## External Service Dependencies

- **Neon Database**: Serverless PostgreSQL (requires `DATABASE_URL`)
- **Twilio**: SMS messaging (requires Twilio credentials)
- **OpenAI**: GPT-4o for AI features (requires API key)

## Environment Variables Required

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 5000)
- Additional service credentials for Twilio and OpenAI integrations

## Development Notes

- The server runs on port specified by `PORT` env var (default 5000)
- In development, Vite middleware is integrated with Express for HMR
- In production, static files are served from `dist/public`
- Database migrations use Drizzle Kit with configuration in `drizzle.config.ts`
- Replit-specific tooling is conditionally loaded in development