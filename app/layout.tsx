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
  description: "Plataforma de licenciamento musical e descoberta de hits.",
  icons: {
    icon: [
      {
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/image_2ee558fe-removebg-preview.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/web-app-manifest-512x512.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  // Opcional: Configuração para PWA
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Meta tags adicionais para PWA */}
        <link rel="apple-touch-icon" href="/web-app-manifest-512x512.png" />
        <meta name="theme-color" content="#020617" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
