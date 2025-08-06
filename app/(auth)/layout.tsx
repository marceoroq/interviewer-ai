import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect("/");

  return <section className="flex justify-center items-center h-screen">{children}</section>;
}
