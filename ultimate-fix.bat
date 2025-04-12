@echo off
echo ========================================
echo GCS Website Ultimate Solution with Hot Reload
echo ========================================
echo.

echo Step 1: Installing required packages...
call npm install -g browser-sync
call npm install

echo.
echo Step 2: Creating critical CSS files...
mkdir public\critical 2>nul

echo /* CRITICAL BACKGROUND IMAGE CSS - DO NOT MODIFY */ > public\critical\bg.css
echo body, html { >> public\critical\bg.css
echo   margin: 0; >> public\critical\bg.css
echo   padding: 0; >> public\critical\bg.css
echo   width: 100%%; >> public\critical\bg.css
echo   height: 100%%; >> public\critical\bg.css
echo   background-image: url('/assets/images/ui/gcs-website-bg.png') !important; >> public\critical\bg.css
echo   background-attachment: fixed !important; >> public\critical\bg.css
echo   background-size: cover !important; >> public\critical\bg.css
echo   background-position: center !important; >> public\critical\bg.css
echo   background-repeat: no-repeat !important; >> public\critical\bg.css
echo } >> public\critical\bg.css

echo /* Special loader style */ > public\critical\loader.css
echo .gcs-loader { >> public\critical\loader.css
echo   background-image: url('/assets/images/ui/gcs-loader-image.png') !important; >> public\critical\loader.css
echo   background-size: contain !important; >> public\critical\loader.css
echo   background-position: center !important; >> public\critical\loader.css
echo   background-repeat: no-repeat !important; >> public\critical\loader.css
echo   width: 64px; >> public\critical\loader.css
echo   height: 64px; >> public\critical\loader.css
echo   animation: spin 1.5s linear infinite; >> public\critical\loader.css
echo } >> public\critical\loader.css
echo @keyframes spin { >> public\critical\loader.css
echo   from { transform: rotate(0deg); } >> public\critical\loader.css
echo   to { transform: rotate(360deg); } >> public\critical\loader.css
echo } >> public\critical\loader.css

echo.
echo Step 3: Generating Tailwind CSS...
call npx tailwindcss -i ./src/styles/globals.css -o ./public/styles.css

echo.
echo Step 4: Clearing Next.js cache...
rmdir /s /q .next 2>nul

echo.
echo Step 5: Starting Next.js in one window...
start cmd /k "echo Next.js server running on port 3001... && npm run dev"

echo.
echo Step 6: Starting CSS watcher in another window...
start cmd /k "echo Watching CSS files... && npx tailwindcss -i ./src/styles/globals.css -o ./public/styles.css --watch"

echo.
echo Step 7: Starting auto-reload proxy on port 3002...
echo This will automatically refresh your browser when files change.
echo.
echo Your website is available at:
echo http://localhost:3002
echo.
echo Press Ctrl+C to stop the auto-reload server when you're done.
echo.
browser-sync start --proxy "localhost:3001" --files "src/**/*.js,src/**/*.jsx,src/**/*.css,public/**/*.css" --port 3002 --no-open
