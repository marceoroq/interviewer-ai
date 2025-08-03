import { Header } from "@/components/shared/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      {children}
    </main>
  );
}
