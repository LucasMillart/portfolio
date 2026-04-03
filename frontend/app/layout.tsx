import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import ThemeInitializer from "./components/ThemeInitializer";

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
    <html lang="en" data-theme="light">
      <body>
        <ThemeInitializer />
        <Navbar />
        <main className="min-h-screen bg-base-200">{children}</main>
      </body>
    </html>
  );
}
