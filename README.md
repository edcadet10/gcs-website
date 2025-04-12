# Geolink Consulting and Services (GCS) Website

A modern, multilingual website for Geolink Consulting and Services built with Next.js, Tailwind CSS, and Supabase, deployed on Netlify.

## Project Overview

This website serves as the online presence for Geolink Consulting and Services, a geospatial services company based in Haiti. The site features:

- Multilingual support (French and Haitian Creole)
- Service portfolio showcase
- Workshop registration system
- Resources download center
- Contact form and client management

## Technology Stack

### Frontend
- **Framework**: Next.js (React-based with SSR capabilities)
- **Styling**: Tailwind CSS with custom theme
- **State Management**: React Query
- **Maps Integration**: Leaflet with OpenStreetMap
- **Internationalization**: next-i18next

### Backend
- **Serverless Functions**: Netlify Functions
- **Database**: Supabase (PostgreSQL with PostGIS)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Form Handling**: Netlify Forms

## Getting Started

### Prerequisites
- Node.js (v14.x or later)
- npm or yarn
- Supabase account (for database and authentication)
- Netlify account (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/edcadet10/gcs_website.git
   cd gcs_website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file based on `.env.example` and fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or use the batch file
   start-dev.bat
   ```

5. Open [http://localhost:3001](http://localhost:3001) in your browser to see the site.

## Project Structure

```
gcs-website/
├── .github/                     # GitHub workflows for CI/CD
├── public/                      # Public static assets
├── src/
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Next.js pages (file-based routing)
│   ├── styles/                  # CSS & Tailwind styles
│   ├── hooks/                   # Custom React hooks
│   ├── queries/                 # React Query hooks
│   ├── lib/                     # Utilities and helpers
│   ├── context/                 # React context providers
│   └── data/                    # Static initial data
├── functions/                   # Netlify serverless functions
├── locales/                     # Translation files
└── ...                          # Config files
```

## Features

### Internationalization (i18n)
The website supports both French and Haitian Creole languages through the `next-i18next` integration. Translation files are stored in the `/locales` directory.

### Authentication System
User authentication is handled through Supabase Auth, allowing for secure login, registration, and profile management. Protected routes ensure only authenticated users can access certain content.

### Maps Integration
The site incorporates Leaflet with OpenStreetMap for interactive maps, showcasing office locations and service areas.

### Workshop Registration
A complete workshop management system enables users to browse available workshops, register, and process payments through secure Netlify Functions.

### Resource Library
The resource management system delivers both public sample resources and protected premium content through Supabase Storage, with download tracking capabilities.

## Development Workflow

### Running the Development Server
```bash
# Standard development server
npm run dev

# With CSS watching
npm run css
```

### Building for Production
```bash
npm run build
npm run start
```

### Deployment
The site is configured for automatic deployment through Netlify. Any push to the main branch will trigger a new deployment.

## Netlify Configuration

The `netlify.toml` file includes configurations for:
- Build commands and directories
- Serverless functions
- Redirect rules
- Environment variables

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Current Status

- **Project Structure:** 100% complete
- **UI Components:** 100% complete
- **Core Pages:** 75% complete (Home, About, Services, Contact implemented)
- **Authentication:** 50% complete (context and APIs done, pages pending)
- **Internationalization:** 70% complete (core translations done, additional pages pending)
- **API Functions:** 70% complete (core functions implemented)
- **Overall Progress:** ~70% complete

## License

This project is licensed under the MIT License - see the LICENSE file for details.
