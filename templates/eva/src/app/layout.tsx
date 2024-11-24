import { AntiFOUCScript } from "@hubbo/react/server";
import { DarkModeSelector } from "@hubbo/react";
import { FeedIcon } from "@hubbo/react/icons";
import { config } from "~/hubbo";
import "./globals.css";

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
      <body className="bg-white dark:bg-zinc-950">
        <header className="border-b border-slate-200 dark:border-zinc-800">
          <div className="mx-auto max-w-3xl h-14 px-2 flex items-center justify-between">
            <a
              href="/"
              className="font-bold text-lg text-slate-800 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
            >
              Blog Title
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
