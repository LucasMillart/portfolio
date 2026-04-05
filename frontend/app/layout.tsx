import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeInitializer from "./components/ThemeInitializer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Portfolio - Lucas",
  description: "Discover my projects, backlogs, and progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="curatedcanvas">
      <body className={inter.className}>
        <ThemeInitializer />
        <main className="min-h-screen bg-base-100">{children}</main>
      </body>
    </html>
  );
}
