@echo off
echo Generating Tailwind CSS output file...
echo.

echo Running Tailwind CLI to generate CSS...
npx tailwindcss -i ./src/styles/globals.css -o ./public/styles.css

echo Adding reference to styles.css in Document...
cd public
echo.
echo CSS file generated successfully at public/styles.css
echo.
echo Open your browser at http://localhost:3001/css-test.html with the link tag below:
echo.
echo ^<link rel="stylesheet" href="/styles.css"^>
echo.
pause
