import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Lora, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  display: "swap",
  weight: ["300", "400", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CodeCodeCoders",
  description: "Le blog de CodeCodeCoders pour les développeurs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} ${inter.variable} ${robotoCondensed.variable} ${lora.variable} antialiased flex min-h-full flex-col`
        )}
      >
        <Navbar />
        <main className="m-auto w-full max-w-3xl flex-1 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
