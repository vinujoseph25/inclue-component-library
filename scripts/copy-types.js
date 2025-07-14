const fs = require('fs');
const path = require('path');

// Function to copy file
function copyFile(source, target) {
  const targetDir = path.dirname(target);
  
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Copy file
  fs.copyFileSync(source, target);
}

// Function to recursively copy directory
function copyDirectory(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      copyFile(sourcePath, targetPath);
    }
  });
}

// Main function
function main() {
  const typesDir = path.join(__dirname, '..', 'dist', 'types');
  const distDir = path.join(__dirname, '..', 'dist');
  
  if (!fs.existsSync(typesDir)) {
    console.error('Types directory not found. Make sure to run build:types first.');
    process.exit(1);
  }
  
  try {
    // Copy main index.d.ts file
    const mainIndexPath = path.join(typesDir, 'index.d.ts');
    if (fs.existsSync(mainIndexPath)) {
      copyFile(mainIndexPath, path.join(distDir, 'index.d.ts'));
      console.log('✓ Copied main index.d.ts');
    }
    
    // Copy all type files to maintain structure
    const typeFiles = fs.readdirSync(typesDir);
    typeFiles.forEach(file => {
      const sourcePath = path.join(typesDir, file);
      const targetPath = path.join(distDir, 'types', file);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        copyDirectory(sourcePath, targetPath);
      } else if (file.endsWith('.d.ts') || file.endsWith('.d.ts.map')) {
        copyFile(sourcePath, targetPath);
      }
    });
    
    console.log('✓ All type declarations copied successfully');
    
    // Create a simple package.json for the types directory
    const typesPackageJson = {
      types: './index.d.ts'
    };
    
    fs.writeFileSync(
      path.join(distDir, 'types', 'package.json'),
      JSON.stringify(typesPackageJson, null, 2)
    );
    
    console.log('✓ Created types package.json');
    
  } catch (error) {
    console.error('Error copying type declarations:', error);
    process.exit(1);
  }
}

main();