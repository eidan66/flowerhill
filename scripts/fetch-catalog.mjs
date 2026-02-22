/**
 * Fetches catalog from flowerhill.co.il: extracts image+name from each product,
 * downloads images to public/catalog/, and saves mapping to app/data/catalog.json.
 *
 * Uses curl for fetching (page returns full HTML with curl).
 * Run: node scripts/fetch-catalog.mjs
 * Optional: LIMIT=20 node scripts/fetch-catalog.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = "https://www.flowerhill.co.il";
const CATALOG_URL = `${BASE}/page_13277`;

/**
 * Extract products from catalog page HTML.
 * Each catch block has: img (id=c0, src=Media/Uploads/...) and name in anchor.
 */
function extractProducts(html) {
  const products = [];
  const catchRegex = /<div class="catch">\s*<div[^>]*>[\s\S]*?<a href="[^"]*product\?c0=(\d+)[^"]*"[^>]*>\s*<img[^>]*id="\d+"[^>]*src="(Media\/Uploads\/[^"]+)"[\s\S]*?<a[^>]*href="[^"]*product\?c0=\d+[^"]*"[^>]*>([^<]+)<\/a>/g;

  let m;
  while ((m = catchRegex.exec(html)) !== null) {
    const c0 = m[1];
    const imgPath = m[2];
    const name = m[3].trim();
    if (name && imgPath) {
      products.push({ c0, imgPath, name });
    }
  }
  return products;
}

function slugify(name, c0) {
  return c0; // c0 is unique and URL-safe
}

async function main() {
  const rootDir = path.join(__dirname, "..");
  const outDir = path.join(rootDir, "public", "catalog");
  const dataDir = path.join(rootDir, "app", "data");

  console.log("Fetching catalog page...");
  const html = execSync(
    `curl -sL "${CATALOG_URL}" -A "Mozilla/5.0"`,
    { encoding: "utf-8", maxBuffer: 10 * 1024 * 1024 }
  );

  const products = extractProducts(html);
  console.log(`Found ${products.length} products with images`);

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(dataDir, { recursive: true });

  const limit = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : products.length;
  const results = [];

  for (let i = 0; i < Math.min(products.length, limit); i++) {
    const p = products[i];
    const ext = path.extname(p.imgPath) || ".jpg";
    const filename = `${p.c0}${ext}`;
    const destPath = path.join(outDir, filename);
    const imgUrl = `${BASE}/${p.imgPath}`;

    process.stdout.write(`[${i + 1}/${limit}] ${p.name}... `);

    try {
      const imgRes = await fetch(imgUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; FlowerHillBot/1.0)" },
      });
      if (imgRes.ok) {
        const buf = Buffer.from(await imgRes.arrayBuffer());
        fs.writeFileSync(destPath, buf);
        results.push({
          name: p.name,
          c0: p.c0,
          image: `/catalog/${filename}`,
          slug: slugify(p.name, p.c0),
        });
        console.log("✓");
      } else {
        console.log(`HTTP ${imgRes.status}`);
      }
    } catch (e) {
      console.log(`Failed: ${e.message}`);
    }

    await new Promise((r) => setTimeout(r, 80));
  }

  const catalogData = {
    products: results,
    fetchedAt: new Date().toISOString(),
  };
  fs.writeFileSync(
    path.join(dataDir, "catalog.json"),
    JSON.stringify(catalogData, null, 2),
    "utf-8"
  );
  console.log(`\nDone. ${results.length} images in public/catalog/, mapping in app/data/catalog.json`);
}

main().catch(console.error);
