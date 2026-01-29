/**
 * Build Script
 * Copies and processes files from src to dist directory for deployment
 *
 * Usage: node build.js
 * Or: npm run build
 */

import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  SRC_DIR: "./src",
  PUBLIC_DIR: "./public",
  DIST_DIR: "./dist",
  ASSETS_DIR: "assets",
  CSS_DIR: "css",
  JS_DIR: "js",
};

/**
 * Create directory if it doesn't exist
 * @param {string} dirPath - Directory path
 */
function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

/**
 * Copy file or directory recursively
 * @param {string} src - Source path
 * @param {string} dest - Destination path
 */
async function copyFileOrDir(src, dest) {
  try {
    const stat = await fsPromises.stat(src);

    if (stat.isDirectory()) {
      // Create destination directory
      createDirectory(dest);

      // Read directory contents
      const entries = await fsPromises.readdir(src, { withFileTypes: true });

      // Copy each entry
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        await copyFileOrDir(srcPath, destPath);
      }
    } else {
      // Copy file
      await fsPromises.copyFile(src, dest);
    }
  } catch (error) {
    console.error(`❌ Error copying ${src}:`, error.message);
    throw error;
  }
}

/**
 * Clean dist directory
 */
function cleanDist() {
  console.log("\n🧹 Cleaning dist directory...");

  if (fs.existsSync(CONFIG.DIST_DIR)) {
    fs.rmSync(CONFIG.DIST_DIR, { recursive: true, force: true });
    console.log("✅ Cleaned dist directory");
  }

  createDirectory(CONFIG.DIST_DIR);
}

/**
 * Copy public files (HTML, manifest, icons, etc.)
 */
async function copyPublicFiles() {
  console.log("\n📋 Copying public files...");

  const publicFiles = [
    "index.html",
    "manifest.json",
    "service-worker.js",
    "icon-192.svg",
    "icon-512.svg",
    "screenshot-1.svg",
  ];

  for (const file of publicFiles) {
    const srcPath = path.join(CONFIG.PUBLIC_DIR, file);
    const destPath = path.join(CONFIG.DIST_DIR, file);

    if (fs.existsSync(srcPath)) {
      await fsPromises.copyFile(srcPath, destPath);
      console.log(`  ✅ ${file}`);
    }
  }
}

/**
 * Copy assets (icons, images, etc.)
 */
async function copyAssets() {
  console.log("\n🖼️  Copying assets...");

  const srcAssets = path.join(CONFIG.SRC_DIR, CONFIG.ASSETS_DIR);
  const destAssets = path.join(CONFIG.DIST_DIR, CONFIG.ASSETS_DIR);

  if (fs.existsSync(srcAssets)) {
    await copyFileOrDir(srcAssets, destAssets);
    console.log("✅ Assets copied");
  }
}

/**
 * Copy CSS files
 */
async function copyCSS() {
  console.log("\n🎨 Copying CSS files...");

  const srcCSS = path.join(CONFIG.SRC_DIR, CONFIG.CSS_DIR);
  const destCSS = path.join(CONFIG.DIST_DIR, CONFIG.CSS_DIR);

  if (fs.existsSync(srcCSS)) {
    await copyFileOrDir(srcCSS, destCSS);
    console.log("✅ CSS files copied");
  }
}

/**
 * Copy JavaScript files
 */
async function copyJS() {
  console.log("\n⚙️  Copying JavaScript files...");

  const srcJS = path.join(CONFIG.SRC_DIR, CONFIG.JS_DIR);
  const destJS = path.join(CONFIG.DIST_DIR, CONFIG.JS_DIR);

  if (fs.existsSync(srcJS)) {
    await copyFileOrDir(srcJS, destJS);
    console.log("✅ JavaScript files copied");
  }
}

/**
 * Create version file with build information
 */
async function createVersionFile() {
  console.log("\n🔖 Creating version file...");

  try {
    const packageJson = JSON.parse(
      await fsPromises.readFile("./package.json", "utf8"),
    );

    const versionInfo = {
      version: packageJson.version,
      name: packageJson.name,
      description: packageJson.description,
      author: packageJson.author.name,
      buildDate: new Date().toISOString(),
      buildTimestamp: Date.now(),
      dependencies: packageJson.devDependencies || {},
    };

    const versionPath = path.join(CONFIG.DIST_DIR, "version.json");
    await fsPromises.writeFile(
      versionPath,
      JSON.stringify(versionInfo, null, 2),
      "utf8",
    );

    console.log("✅ Version file created");
  } catch (error) {
    console.error("❌ Error creating version file:", error.message);
  }
}

/**
 * Generate build report
 */
function generateBuildReport() {
  console.log("\n📊 Build Report");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const distStats = fs.statSync(CONFIG.DIST_DIR);
  const distSize = fs.readdirSync(CONFIG.DIST_DIR, { recursive: true }).length;

  console.log(`📦 Output Directory: ${CONFIG.DIST_DIR}`);
  console.log(`📁 Total Files: ${distSize}`);
  console.log(`📅 Build Date: ${new Date().toLocaleString()}`);
  console.log(`🔗 GitHub: https://github.com/farid-teymouri/todo-list`);

  console.log("\n✅ Build completed successfully!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

/**
 * Main build function
 */
async function build() {
  console.log("\n🚀 Starting build process...\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  try {
    // Clean dist directory
    cleanDist();

    // Copy files in parallel for better performance
    await Promise.all([copyPublicFiles(), copyAssets(), copyCSS(), copyJS()]);

    // Create version file
    await createVersionFile();

    // Generate build report
    generateBuildReport();

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Build failed:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run build if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  build();
}

// Export for testing or programmatic use
export default build;
