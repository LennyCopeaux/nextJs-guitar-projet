/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const root = path.join(__dirname, "..");
const generatedClient = path.join(root, "node_modules", ".prisma", "client");

if (!fs.existsSync(generatedClient)) {
  console.warn("[prisma-link] node_modules/.prisma/client not found — run prisma generate first");
  process.exit(1);
}

// Symlink dans le path de @prisma/client hoisted (si présent)
const hoistedClient = path.join(root, "node_modules", "@prisma", "client");
if (fs.existsSync(hoistedClient)) {
  const linkPath = path.join(hoistedClient, ".prisma");
  if (!fs.existsSync(linkPath)) {
    const rel = path.relative(hoistedClient, path.join(root, "node_modules", ".prisma"));
    fs.symlinkSync(rel, linkPath, "dir");
    console.log("[prisma-link] Linked node_modules/@prisma/client/.prisma");
  }
}

// Symlink dans le path pnpm store (c'est là que le code s'exécute vraiment)
const pnpmStore = path.join(root, "node_modules", ".pnpm");
if (fs.existsSync(pnpmStore)) {
  for (const dir of fs.readdirSync(pnpmStore)) {
    if (!dir.startsWith("@prisma+client@")) continue;
    const pkgClient = path.join(pnpmStore, dir, "node_modules", "@prisma", "client");
    if (!fs.existsSync(pkgClient)) continue;
    const linkPath = path.join(pkgClient, ".prisma");
    if (fs.existsSync(linkPath)) {
      console.log(`[prisma-link] Already linked: ${dir}`);
      continue;
    }
    const rel = path.relative(pkgClient, path.join(root, "node_modules", ".prisma"));
    fs.symlinkSync(rel, linkPath, "dir");
    console.log(`[prisma-link] Linked pnpm store: ${dir}`);
  }
}

console.log("[prisma-link] Done");
