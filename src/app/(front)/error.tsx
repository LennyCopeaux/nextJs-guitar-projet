"use client";

export default function FrontError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-line bg-white p-6">
      <h2 className="text-xl font-semibold text-foreground">Oups, une erreur est survenue</h2>
      <p className="mt-2 text-sm text-muted">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="btn-primary mt-5"
      >
        Reessayer
      </button>
    </div>
  );
}
