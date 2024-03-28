import type { Metadata } from "next";
import { Jockey_One, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";

const jockeyOne = Jockey_One({ subsets: ["latin"], display: "swap", weight: ['400'], variable: '--font-jockey-one' });
const poppins = Poppins({ subsets: ["latin"], display: "swap", weight: ['300', '400', '600', '800', '900'], style: ['normal', 'italic'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: "Vozikay",
  description: "Join the ride!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-w-full min-h-[100dvh] pt-20 ${jockeyOne.variable} ${poppins.variable} font-body`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
