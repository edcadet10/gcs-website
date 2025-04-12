@echo off
echo Rebuilding CSS configuration for GCS Website...
echo.

echo Installing dependencies if needed...
call npm install

echo Building CSS...
call npm run build:css

echo Clearing Next.js cache...
rmdir /s /q .next

echo Starting development server on port 3001...
echo.
echo Open your browser at http://localhost:3001
start http://localhost:3001
echo.
npm run dev
