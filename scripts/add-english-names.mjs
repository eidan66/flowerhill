/**
 * Fetches English/Latin names from flowerhill product pages and adds them to catalog.json.
 * Run: node scripts/add-english-names.mjs
 * Optional: LIMIT=20 node scripts/add-english-names.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = "https://www.flowerhill.co.il";

function extractLatinName(html) {
  const match = html.match(/שם לועזי:[\s\S]*?<td[^>]*class="normal"[^>]*>([A-Za-z][^<]*)<\/td>/);
  return match ? match[1].trim() : null;
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
  const catalogPath = path.join(rootDir, "app", "data", "catalog.json");

  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));
  const limit = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : catalog.products.length;

  let updated = 0;
  for (let i = 0; i < Math.min(catalog.products.length, limit); i++) {
    const p = catalog.products[i];
    process.stdout.write(`[${i + 1}/${limit}] ${p.name}... `);

    try {
      const url = `${BASE}/product?c0=${p.c0}`;
      const html = await fetchWithRetry(url);
      const nameEn = extractLatinName(html);
      if (nameEn) {
        p.nameEn = nameEn;
        updated++;
        console.log(nameEn);
      } else {
        p.nameEn = p.name;
        console.log("(using Hebrew)");
      }
    } catch (e) {
      p.nameEn = p.name;
      console.log(`Failed: ${e.message}`);
    }

    await new Promise((r) => setTimeout(r, 80));
  }

  catalog.updatedAt = new Date().toISOString();
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), "utf-8");
  console.log(`\nDone. Added ${updated} English names to catalog.json`);
}

main().catch(console.error);
