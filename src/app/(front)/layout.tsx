import { FrontHeader } from "@/components/layout/front-header";
import { Footer } from "@/components/layout/footer";

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <FrontHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">{children}</main>

      <Footer />
    </div>
  );
}
