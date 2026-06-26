export default function ProductParallelLayout({
  children,
  sponsored,
  similar,
}: {
  children: React.ReactNode;
  sponsored: React.ReactNode;
  similar: React.ReactNode;
}) {
  return (
    <div className="space-y-10">
      {children}
      {sponsored}
      {similar}
    </div>
  );
}
