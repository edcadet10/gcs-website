const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

// Source and destination paths
const srcCssPath = path.join(__dirname, 'src', 'styles', 'globals.css');
const destCssPath = path.join(__dirname, 'public', 'build.css');

// Read the CSS file
const css = fs.readFileSync(srcCssPath, 'utf8');

// Process the CSS with PostCSS
async function processCss() {
  try {
    const result = await postcss([
      tailwindcss,
      autoprefixer,
    ]).process(css, {
      from: srcCssPath,
      to: destCssPath,
    });

    // Write the processed CSS to the destination
    fs.writeFileSync(destCssPath, result.css);
    console.log('CSS processed successfully!');
  } catch (error) {
    console.error('Error processing CSS:', error);
  }
}

processCss();
