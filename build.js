/**
 * VIHARI Matrimony Registration Portal - Single HTML Build Script
 * Bundles HTML, CSS, JavaScript, and Base64 Logo into a 100% self-contained
 * single HTML deployment file.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const DIST_DIR = path.join(ROOT_DIR, 'dist');

console.log('⚡ Starting VIHARI Single HTML Build...');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Read Source Files
const htmlSource = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const cssSource = fs.readFileSync(path.join(ROOT_DIR, 'css', 'styles.css'), 'utf8');
const configSource = fs.readFileSync(path.join(ROOT_DIR, 'js', 'config.js'), 'utf8');
const appSource = fs.readFileSync(path.join(ROOT_DIR, 'js', 'app.js'), 'utf8');

// Read Logo & Convert to Base64 Data URI
const logoBuffer = fs.readFileSync(path.join(ROOT_DIR, 'images', 'vihari-logo.png'));
const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

console.log(`📦 Embedded Logo: ${Math.round(logoBuffer.length / 1024)} KB encoded to Base64`);

// Build Single File HTML
let bundledHtml = htmlSource;

// Replace stylesheet link with inlined <style>
const styleTag = `  <!-- Inlined Stylesheet for Single HTML Deployment -->\n  <style>\n${cssSource}\n  </style>`;
bundledHtml = bundledHtml.replace(/<link rel="stylesheet" href="css\/styles\.css(?:\?[^"]*)?">/, styleTag);

// Replace script tags with inlined scripts
const scriptTags = `  <!-- Inlined Application Logic for Single HTML Deployment -->\n  <script>\n${configSource}\n  </script>\n  <script>\n${appSource}\n  </script>`;
bundledHtml = bundledHtml.replace(/<script src="js\/config\.js(?:\?[^"]*)?"><\/script>\s*<script src="js\/app\.js(?:\?[^"]*)?"><\/script>/, scriptTags);

// Replace all occurrences of images/vihari-logo.png (including query params) with Base64 data URI
bundledHtml = bundledHtml.replace(/images\/vihari-logo\.png(?:\?[^"'\s\)]*)?/g, logoBase64);

// Write output files
const distIndexPath = path.join(DIST_DIR, 'index.html');
const standalonePath = path.join(ROOT_DIR, 'matrimony-registration-single-build.html');

fs.writeFileSync(distIndexPath, bundledHtml, 'utf8');
fs.writeFileSync(standalonePath, bundledHtml, 'utf8');

const distStats = fs.statSync(distIndexPath);
console.log(`✅ Build Complete!`);
console.log(`   - Output 1: dist/index.html (${Math.round(distStats.size / 1024)} KB) [Ready for Web Host / GitHub Pages / Netlify / Vercel]`);
console.log(`   - Output 2: matrimony-registration-single-build.html (${Math.round(distStats.size / 1024)} KB) [Self-contained Standalone]`);
