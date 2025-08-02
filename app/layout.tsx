import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { APP_DESCRIPTION, APP_NAME } from "@/constants";

const inter = Inter({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased pattern`}>{children}</body>
    </html>
  );
}
