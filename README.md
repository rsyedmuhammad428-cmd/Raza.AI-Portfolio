# raza.ai portfolio

An interactive engineering portfolio for **Syed Muhammad Raza Zaidi**, built to present software projects, technical experience, system architecture, and AI work in one focused experience.

The site combines a polished instrument-panel visual language with useful exploration features: visitors can browse selected projects, inspect architecture diagrams, review the technology stack and experience timeline, see GitHub activity, and chat with **Raza AI**, a Gemini-powered assistant grounded in the portfolio content.

## Highlights

- Interactive hero section with system boot sequence and network visualization
- Project Lab with expandable project details and architecture previews
- Architecture Explorer for exploring systems and relationships
- Technology stack, experience, education, and contact sections
- Live GitHub repository and activity data with fallback states
- Raza AI chat assistant powered by Google Gemini
- Responsive layout with motion, accessible controls, and dark instrument-panel styling

## Built with

- Next.js 14 with the App Router
- TypeScript
- React 18
- Tailwind CSS
- Framer Motion
- Lucide React
- Google Gemini via `@google/genai`

## Getting started

### Prerequisites

- Node.js 18.17 or newer
- npm
- A Google Gemini API key for the Raza AI assistant

### Installation

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The first build may need internet access to download the Google Fonts used by the application.

### Environment variables

Add the following values to `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
# Optional: pin a specific Gemini model
GEMINI_MODEL=gemini-flash-latest
```

`GEMINI_API_KEY` is used only by the server-side `/api/raza-ai` route. Never commit `.env.local` or expose this key in client-side code.

## Available scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Serve the production build
npm run lint     # Run Next.js lint checks
```

## Project structure

```text
app/             # App Router entry points, API route, layout, and global styles
components/      # Reusable UI, chat, navigation, panels, and visual components
data/            # Portfolio content and structured site data
lib/              # Gemini, GitHub, RAG, rate limiting, and shared utilities
sections/        # Main portfolio sections rendered on the home page
types/            # Shared TypeScript types
docs/             # Build and feature notes for each project phase
public/           # Static assets
```

## Design direction

The interface uses a dark graphite foundation, brass accent color, structured spacing, and technical typography to create an editorial engineering dashboard rather than a generic portfolio template. Content is organized for scanning while animations and diagrams add depth without getting in the way of the work.

## Deployment

This is a standard Next.js application and can be deployed to Vercel or any Node.js-compatible hosting provider. Configure `GEMINI_API_KEY` in the deployment environment before using the Raza AI assistant.

## License

This project is a personal portfolio. The source is shared for reference and learning; portfolio content, branding, and personal assets remain the property of their respective owner.
