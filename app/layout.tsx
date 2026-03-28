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
  title: "L'A HIT - Catálogo de Músicas",
  description: "Plataforma de licenciamento musical e descoberta de hits. Transformando ideias em ativos musicais.",
  icons: {
    icon: [
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
    shortcut: "/web-app-manifest-512x512.png",
    apple: "/web-app-manifest-512x512.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "L'A HIT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/web-app-manifest-512x512.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/web-app-manifest-192x192.png" type="image/png" sizes="192x192" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/web-app-manifest-512x512.png" />
        <link rel="apple-touch-icon-precomposed" href="/web-app-manifest-512x512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="L'A HIT" />
        <meta name="theme-color" content="#020617" />
        <meta name="msapplication-TileColor" content="#020617" />
        <meta name="msapplication-TileImage" content="/web-app-manifest-512x512.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
