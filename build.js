/**
 * Build Script - Production Ready
 * Fixes all path references for deployment
 */

import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  SRC_DIR: './src',
  PUBLIC_DIR: './public',
  DIST_DIR: './dist',
};

function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function copyDir(src, dest) {
  await fsPromises.mkdir(dest, { recursive: true });
  const entries = await fsPromises.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fsPromises.copyFile(srcPath, destPath);
    }
  }
}

async function fixHtmlPaths(htmlContent) {
  // Replace ALL development paths with production paths
  return (
    htmlContent
      // Fix CSS paths (all variations)
      .replace(/href="\.\/\.\/src\/css\//g, 'href="./css/')
      .replace(/href="\.\.\/src\/css\//g, 'href="./css/')
      .replace(/href="\/src\/css\//g, 'href="./css/')

      // Fix JS paths (all variations)
      .replace(/src="\.\/\.\/src\/js\//g, 'src="./js/')
      .replace(/src="\.\.\/src\/js\//g, 'src="./js/')
      .replace(/src="\/src\/js\//g, 'src="./js/')

      // Fix asset paths (all variations)
      .replace(/src="\.\/\.\/src\/assets\//g, 'src="./assets/')
      .replace(/src="\.\.\/src\/assets\//g, 'src="./assets/')
      .replace(/src="\/src\/assets\//g, 'src="./assets/')
      .replace(/href="\.\/\.\/src\/assets\//g, 'href="./assets/')
      .replace(/href="\.\.\/src\/assets\//g, 'href="./assets/')
      .replace(/href="\/src\/assets\//g, 'href="./assets/')

      // Fix service worker registration
      .replace(
        /navigator\.serviceWorker\.register\(['"]\/service-worker\.js['"]\)/g,
        "navigator.serviceWorker.register('./service-worker.js')"
      )
      .replace(
        /navigator\.serviceWorker\.register\(['"]\.\/service-worker\.js['"]\)/g,
        "navigator.serviceWorker.register('./service-worker.js')"
      )
  );
}

async function build() {
  console.log('\n🚀 Building production bundle...\n');

  // Clean dist
  if (fs.existsSync(CONFIG.DIST_DIR)) {
    fs.rmSync(CONFIG.DIST_DIR, { recursive: true, force: true });
  }
  createDirectory(CONFIG.DIST_DIR);

  // Copy public files
  await copyDir(CONFIG.PUBLIC_DIR, CONFIG.DIST_DIR);

  // Fix index.html paths
  const indexPath = path.join(CONFIG.DIST_DIR, 'index.html');
  let htmlContent = await fsPromises.readFile(indexPath, 'utf8');
  htmlContent = await fixHtmlPaths(htmlContent);
  await fsPromises.writeFile(indexPath, htmlContent, 'utf8');
  console.log('✅ Fixed paths in index.html');

  // Copy src directories to root of dist
  await copyDir(path.join(CONFIG.SRC_DIR, 'css'), path.join(CONFIG.DIST_DIR, 'css'));
  await copyDir(path.join(CONFIG.SRC_DIR, 'js'), path.join(CONFIG.DIST_DIR, 'js'));
  await copyDir(path.join(CONFIG.SRC_DIR, 'assets'), path.join(CONFIG.DIST_DIR, 'assets'));

  // Create version file
  const pkg = JSON.parse(await fsPromises.readFile('./package.json', 'utf8'));
  await fsPromises.writeFile(
    path.join(CONFIG.DIST_DIR, 'version.json'),
    JSON.stringify(
      {
        version: pkg.version,
        buildDate: new Date().toISOString(),
      },
      null,
      2
    )
  );

  console.log('\n✅ Build completed successfully!');
  console.log(`📦 Output: ${CONFIG.DIST_DIR}/`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  build().catch(console.error);
}
