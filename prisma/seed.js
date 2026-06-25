/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const { PrismaClient } = require("@prisma/client");

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const filePath = path.join(
    process.cwd(),
    "src/features/catalog/infrastructure/mock-products.json",
  );
  const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const slugs = products.map((product) => product.slug);

  await prisma.product.deleteMany({
    where: { slug: { notIn: slugs } },
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        shortDescription: product.shortDescription,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        specs: product.specs,
      },
      create: {
        slug: product.slug,
        name: product.name,
        shortDescription: product.shortDescription,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        specs: product.specs,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
