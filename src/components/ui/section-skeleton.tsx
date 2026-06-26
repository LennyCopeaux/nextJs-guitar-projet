type SectionSkeletonProps = {
  title: string;
  lines?: number;
};

export function SectionSkeleton({ title, lines = 2 }: SectionSkeletonProps) {
  return (
    <section className="animate-pulse space-y-4 rounded-2xl border border-line bg-white p-6">
      <p className="text-sm font-semibold text-muted">{title}</p>
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="h-4 rounded bg-[#eceae6]"
            style={{ width: `${90 - index * 15}%` }}
          />
        ))}
      </div>
    </section>
  );
}
