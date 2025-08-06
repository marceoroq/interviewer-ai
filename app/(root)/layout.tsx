import { Header } from "@/components/shared/header";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <main className="flex flex-col h-screen">
      <Header />
      {children}
    </main>
  );
}
