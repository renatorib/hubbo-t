import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Hubbo",
  description: "You blog, instantly. Powered by github issues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${sans.className}`}>{children}</body>
    </html>
  );
}
