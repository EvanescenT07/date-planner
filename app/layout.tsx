import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lets Date 🌸",
  description:
    "A beautifully crafted, romantic date planner designed to create unforgettable moments together.",
  keywords: ["romantic date", "date planner", "invitation", "couple date", "Iqbal"],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "Lets Date 🌸",
    description: "Will you go on a date with me? Plan our magical evening together.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8FA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans antialiased selection:bg-[var(--accent)] selection:text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
