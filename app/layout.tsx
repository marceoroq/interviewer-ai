import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

import { APP_DESCRIPTION, APP_NAME } from "@/constants";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
