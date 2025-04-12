# Geolink Consulting and Services Website

This repository contains the code for the Geolink Consulting and Services (GCS) website, a geospatial services company based in Haiti.

## Technology Stack

- **Frontend**: Next.js with React
- **Styling**: Tailwind CSS
- **Deployment**: Netlify
- **Database**: Supabase (PostgreSQL with PostGIS)
- **Maps**: Leaflet with OpenStreetMap
- **Internationalization**: i18next (French and Haitian Creole)

## Features

- Responsive design for all devices
- Multilingual support (French and Haitian Creole)
- Interactive map integration for project showcase
- User authentication for resource downloads
- Workshop registration system
- Blog and resources section
- Contact form with automated routing

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in your environment variables
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The site is automatically deployed to Netlify when changes are pushed to the main branch.

- **Staging**: Deployed from the `develop` branch
- **Production**: Deployed from the `main` branch

## Directory Structure

See the [directory structure document](docs/directory-structure.md) for a complete overview of the project organization.

## License

All rights reserved - Geolink Consulting and Services