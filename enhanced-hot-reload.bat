@echo off
echo Enhanced Hot Reload for GCS Website
echo =================================
echo.

echo Making sure node_modules are installed...
call npm install

echo.
echo Clearing previous Next.js cache...
if exist .next rmdir /s /q .next

echo.
echo Creating fresh CSS files...
call npx tailwindcss -i ./src/styles/globals.css -o ./public/styles.css

echo.
echo Creating direct background styling...
echo /* Force background image to always be visible */ > public\force-bg.css
echo body { >> public\force-bg.css
echo   background-image: url('/assets/images/ui/gcs-website-bg.png') !important; >> public\force-bg.css
echo   background-attachment: fixed !important; >> public\force-bg.css
echo   background-size: cover !important; >> public\force-bg.css
echo   background-position: center !important; >> public\force-bg.css
echo   background-repeat: no-repeat !important; >> public\force-bg.css
echo } >> public\force-bg.css

echo html, body { height: 100%%; width: 100%%; margin: 0; padding: 0; } >> public\force-bg.css

echo.
echo Starting CSS watch process in a separate window...
start cmd /k "echo Watching for CSS changes... && npx tailwindcss -i ./src/styles/globals.css -o ./public/styles.css --watch"

echo.
echo Starting development server on port 3001...
echo Your website will be available at http://localhost:3001
echo Browser will automatically update when you save changes!
echo.

start http://localhost:3001
npm run dev
