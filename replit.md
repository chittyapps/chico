# Overview

ChiCo is a property management automation platform designed for small landlords managing 1-10 properties. The application provides SMS-based lead automation, tenant communication tools, and visitor entry management. The system automatically categorizes incoming inquiries, generates appropriate responses, and tracks conversion metrics to help landlords respond faster and lease units more efficiently.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React SPA**: Built with React 18+ using TypeScript and Vite for development/building
- **Routing**: Uses Wouter for lightweight client-side routing
- **UI Framework**: Implements shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming and brand colors
- **State Management**: TanStack Query for server state management and API caching
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

## Backend Architecture
- **Express.js Server**: RESTful API server with TypeScript
- **Database Layer**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: connect-pg-simple for PostgreSQL-backed session storage
- **Route Organization**: Centralized route registration with structured API endpoints

## Database Design
- **Users**: Core user authentication and profile management
- **Properties**: Property information with user ownership relationships
- **Tenants**: Tenant management linked to specific properties
- **Leads**: Lead tracking with categorization, urgency scoring, and status management
- **Communications**: Message history and interaction logging
- **Visitor Approvals**: SMS-based visitor entry approval system

## Development Environment
- **Full-stack TypeScript**: Shared types and schemas between client/server
- **Development Server**: Vite with HMR and Express middleware integration
- **Build Process**: Separate client (Vite) and server (esbuild) build pipelines
- **Database Migrations**: Drizzle Kit for schema management and migrations

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Connection Pooling**: WebSocket-based connections for serverless compatibility

## Communication Services
- **Twilio**: SMS messaging platform for lead notifications and visitor approvals
- **OpenAI**: GPT-4o for intelligent lead categorization and response generation

## Development Tools
- **Replit Integration**: Cartographer plugin and runtime error overlay for Replit environment
- **shadcn/ui**: Component system with Radix UI primitives for accessible UI components

## Monitoring and Analytics
- **Lead Categorization**: AI-powered classification of rental inquiries, maintenance requests, viewing requests, and visitor entries
- **Response Time Tracking**: Performance metrics for lead response optimization
- **Conversion Analytics**: Lead-to-lease tracking for ROI measurement