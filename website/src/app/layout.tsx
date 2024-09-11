import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hubbo",
  description: "You blog instantly. Powered by github issues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
