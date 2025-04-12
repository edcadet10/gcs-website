@echo off
echo GCS Website - Complete Fix Script
echo ==============================
echo.

echo Step 1: Installing dependencies...
call npm install --no-audit --no-fund

echo.
echo Step 2: Clearing Next.js cache...
rmdir /s /q .next

echo.
echo Step 3: Fixing path aliases in files...
node scripts/fix-paths.js

echo.
echo Step 4: Generating Tailwind CSS...
call npm run css

echo.
echo Step 5: Starting development server...
echo Opening browser at http://localhost:3001
start http://localhost:3001
echo.
npm run dev
