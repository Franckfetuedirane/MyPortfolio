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
  metadataBase: new URL("http://localhost:3000"),
  title: "Franck Dirane TCHUMAMO FETUE | Portfolio",
  description:
    "Portfolio d'un ingénieur logiciel spécialisé cloud, architecture et électrotechnique.",
  icons: {
    icon: "/SAM_0076.JPG",
    shortcut: "/SAM_0076.JPG",
    apple: "/SAM_0076.JPG",
  },
  openGraph: {
    title: "Franck Dirane TCHUMAMO FETUE | Portfolio",
    description: "Ingénieur logiciel, Cloud AWS et électrotechnique.",
    images: [{ url: "/SAM_0076.JPG", width: 1200, height: 1200, alt: "Franck Dirane TCHUMAMO FETUE" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050816] text-white">{children}</body>
    </html>
  );
}
