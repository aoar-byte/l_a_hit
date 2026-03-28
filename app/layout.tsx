// app/layout.tsx
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
    icon: "/web-app-manifest-512x512.png",
    shortcut: "/web-app-manifest-512x512.png",
    apple: "/web-app-manifest-512x512.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Fallback para garantir que o ícone seja carregado */}
        <link rel="icon" href="/web-app-manifest-512x512.png" />
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
