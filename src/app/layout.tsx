import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zenki Lab — Premium Digital Manufacturing",
  description:
    "Zenki Lab provides custom on-demand 3D printing and digital manufacturing. Industrial-grade parts, functional prototypes, and production-ready components — manufactured on demand, on time.",
  keywords: [
    "3D printing",
    "digital manufacturing",
    "custom parts",
    "prototypes",
    "additive manufacturing",
    "Zenki Lab",
    "Sri Lanka",
    "on-demand manufacturing",
  ],
  authors: [{ name: "Zenki Lab" }],
  openGraph: {
    title: "Zenki Lab — Premium Digital Manufacturing",
    description:
      "If you can imagine it, we can print it. Custom on-demand 3D printing and digital manufacturing for prototypes, parts, and production.",
    url: "https://zenkilab.com",
    siteName: "Zenki Lab",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://zenkilab.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#111111] text-white font-sans">
        {children}
      </body>
    </html>
  );
}