@echo off
echo Starting GCS Website with hot reloading on port 3001...
echo.

echo Building CSS in watch mode in a separate window...
start cmd /k "npx tailwindcss -i ./src/styles/globals.css -o ./public/styles.css --watch"

echo Copying background image CSS to public folder...
echo /* Direct CSS for background image */ > public\direct-bg.css
echo body { background-image: url('/assets/images/ui/gcs-website-bg.png') !important; background-attachment: fixed !important; background-size: cover !important; } >> public\direct-bg.css

echo.
echo Starting development server with hot reloading...
echo.
echo Your site will be available at:
echo http://localhost:3001
echo.
echo Changes to CSS or code will automatically refresh the browser!
echo.
start http://localhost:3001

npm run dev
