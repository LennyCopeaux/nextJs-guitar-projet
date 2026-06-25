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

const similarBySlug = {
  "stratocaster-vintage-sunburst": ["telecaster-deluxe-black", "jazzmaster-classic-cream"],
  "telecaster-deluxe-black": ["stratocaster-vintage-sunburst", "duo-sonic-seafoam-green"],
  "jazzmaster-classic-cream": ["jaguar-surf-green", "mustang-competition-red"],
  "jaguar-surf-green": ["jazzmaster-classic-cream", "mustang-competition-red"],
  "mustang-competition-red": ["duo-sonic-seafoam-green", "jaguar-surf-green"],
  "duo-sonic-seafoam-green": ["mustang-competition-red", "telecaster-deluxe-black"],
};

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

  const dbProducts = await prisma.product.findMany();
  const productsBySlug = Object.fromEntries(dbProducts.map((product) => [product.slug, product]));

  await prisma.similarProduct.deleteMany();

  for (const [slug, similarSlugs] of Object.entries(similarBySlug)) {
    const product = productsBySlug[slug];

    if (!product) continue;

    for (const similarSlug of similarSlugs) {
      const similar = productsBySlug[similarSlug];

      if (!similar) continue;

      await prisma.similarProduct.upsert({
        where: {
          productId_similarId: {
            productId: product.id,
            similarId: similar.id,
          },
        },
        update: {},
        create: {
          productId: product.id,
          similarId: similar.id,
        },
      });
    }
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
