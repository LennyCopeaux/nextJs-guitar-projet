type TestPageProps = {
  searchParams: Promise<{ fail?: string }>;
};

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function TestPage({ searchParams }: TestPageProps) {
  const { fail } = await searchParams;

  await sleep(1200);

  if (fail === "1") {
    throw new Error("Erreur de test volontaire depuis /test?fail=1");
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-white p-7">
      <h1 className="text-2xl font-semibold">Page de test loading/error</h1>
      <p className="mt-2 text-muted">
        Cette page attend 1.2 seconde pour afficher le loader de segment.
      </p>
      <p className="mt-1 text-muted">
        Ajoute <strong>?fail=1</strong> a l&apos;URL pour tester error.tsx.
      </p>
    </div>
  );
}
