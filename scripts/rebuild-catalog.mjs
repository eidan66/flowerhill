/**
 * Rebuilds catalog.json from downloaded images by fetching product names.
 * Run: node scripts/rebuild-catalog.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = "https://www.flowerhill.co.il";

function extractProductName(html) {
  // Product name is in pathTitlePage: <span><h1>אירוס</h1></span>
  const match = html.match(/pathTitlePage_xsl[^>]*>[\s\S]*?<h1[^>]*>([^<]+)</);
  if (match) return match[1].trim();
  const m2 = html.match(/<h1[^>]*>([^<]+)</);
  if (m2) return m2[1].trim();
  return null;
}

async function fetchWithRetry(url, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; FlowerHillBot/1.0)" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error("Failed");
}

async function main() {
  const rootDir = path.join(__dirname, "..");
  const catalogDir = path.join(rootDir, "public", "catalog");
  const dataDir = path.join(rootDir, "app", "data");

  let imageFiles = fs
    .readdirSync(catalogDir)
    .filter((f) => /\.(jpg|jpeg|png|JPG|JPEG|PNG|gif|GIF)$/.test(f));

  const limit = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : imageFiles.length;
  imageFiles = imageFiles.slice(0, limit);

  const results = [];
  const total = imageFiles.length;

  for (let i = 0; i < total; i++) {
    const f = imageFiles[i];
    const c0 = path.basename(f, path.extname(f));
    const image = `/catalog/${f}`;

    process.stdout.write(`[${i + 1}/${total}] ${c0}... `);

    try {
      const url = `${BASE}/product?c0=${c0}`;
      const html = await fetchWithRetry(url);
      const name = extractProductName(html);
      const slug = (name || c0).replace(/[/\s]+/g, "-").replace(/[^\w-\u0590-\u05FF]/g, "") || c0;
      results.push({ name: name || c0, c0, image, slug });
      console.log(name || c0);
    } catch (e) {
      console.log("(using c0 as name)");
      results.push({ name: c0, c0, image, slug: c0 });
    }

    await new Promise((r) => setTimeout(r, 80));
  }

  const catalogData = { products: results, fetchedAt: new Date().toISOString() };
  fs.writeFileSync(path.join(dataDir, "catalog.json"), JSON.stringify(catalogData, null, 2), "utf-8");
  console.log(`\nDone. Saved ${results.length} products to app/data/catalog.json`);
}

main().catch(console.error);
