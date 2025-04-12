@echo off
echo Restarting GCS Website with Background Image
echo =========================================
echo.

echo 1. Stopping any running Next.js servers...
taskkill /f /im node.exe >nul 2>&1

echo 2. Copying background images to multiple locations...
mkdir public\images\ui 2>nul
mkdir public\img 2>nul
copy "public\assets\images\ui\gcs-website-bg.png" "public\" /Y
copy "public\assets\images\ui\gcs-loader-image.png" "public\" /Y

echo 3. Creating direct background reference CSS file...
echo body { > public\background.css
echo   background-image: url('/assets/images/ui/gcs-website-bg.png') !important; >> public\background.css
echo   background-attachment: fixed !important; >> public\background.css
echo   background-size: cover !important; >> public\background.css
echo   background-position: center !important; >> public\background.css
echo } >> public\background.css

echo 4. Clearing Next.js cache...
rmdir /s /q .next 2>nul

echo 5. Starting Next.js server on port 3001...
echo.
echo Visit http://localhost:3001/test-bg.html to test background images
echo Visit http://localhost:3001 for the main site
echo.
start http://localhost:3001/test-bg.html
npm run dev
