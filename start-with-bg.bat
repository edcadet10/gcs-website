@echo off
echo Starting GCS Website with custom background...
echo.

echo Generating Tailwind CSS...
call npx tailwindcss -i ./src/styles/globals.css -o ./public/styles.css

echo.
echo Starting development server on port 3001...
echo Opening browser at http://localhost:3001
start http://localhost:3001
echo.
npm run dev
