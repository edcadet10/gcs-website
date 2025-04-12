const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Function to get all JS/JSX files in a directory recursively
async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.flat().filter(file => 
    (file.endsWith('.js') || file.endsWith('.jsx')) && 
    !file.includes('node_modules') && 
    !file.includes('.next'));
}

// Function to process a file
async function processFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    
    // Look for '@/' imports
    if (content.includes('@/')) {
      console.log(`Processing ${filePath}`);
      
      // Get the relative path from the file to the src directory
      let relativePath = path.relative(path.dirname(filePath), path.resolve('src'));
      if (!relativePath) relativePath = '.';
      if (!relativePath.endsWith('/') && !relativePath.endsWith('\\')) {
        relativePath += '/';
      }
      
      // Replace @/ with the relative path
      const newContent = content.replace(/@\//g, `${relativePath}`);
      
      // Write the file only if there were changes
      if (content !== newContent) {
        await writeFile(filePath, newContent, 'utf8');
        console.log(`Updated ${filePath}`);
        return 1;
      }
    }
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return 0;
  }
}

// Main function
async function main() {
  try {
    const files = await getFiles('src');
    let updatedCount = 0;
    
    for (const file of files) {
      updatedCount += await processFile(file);
    }
    
    console.log(`Done! Updated ${updatedCount} files.`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the script
main();
