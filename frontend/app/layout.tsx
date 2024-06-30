import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pen.Live",
  description: "Search Pens and listed animals collections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
