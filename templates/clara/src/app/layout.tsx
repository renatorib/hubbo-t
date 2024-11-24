import { AntiFOUCScript } from "@hubbo/react/server";
import { DarkModeSelector } from "@hubbo/react";
import { FeedIcon } from "@hubbo/react/icons";
import { Inter } from "next/font/google";
import { config } from "~/hubbo";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin-ext"],
});

export const metadata = {
  title: config.site.name,
  description: config.site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <AntiFOUCScript />
      </head>
      <body className={`${sans.variable} ${sans.className} bg-white dark:bg-zinc-950`}>
        <header className="border-b border-zinc-100 dark:border-zinc-800">
          <div className="mx-auto max-w-2xl h-14 px-2 flex items-center justify-between">
            <a
              href="/"
              className="font-bold text-lg text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white"
            >
              Clara
            </a>

            <div className="flex items-center gap-1">
              <DarkModeSelector className="h-8 w-8 rounded dark:hover:bg-zinc-800 focus-within:ring" />
              <a
                className="h-8 w-8 rounded flex items-center justify-center dark:hover:bg-zinc-800 focus-within:ring"
                href="/feed.xml"
                target="_blank"
                title="RSS"
              >
                <FeedIcon />
              </a>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-6xl mx-auto pt-6 px-2 flex flex-col gap-2">
            <div className="max-w-[calc(100vw-16px)]">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
