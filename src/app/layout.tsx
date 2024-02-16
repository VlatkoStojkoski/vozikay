import type { Metadata } from "next";
import { Jockey_One, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const jockeyOne = Jockey_One({ subsets: ["latin"], display: "swap", weight: ['400'], variable: '--font-jockey-one' });
const poppins = Poppins({ subsets: ["latin"], display: "swap", weight: ['300', '400', '600', '800', '900'], style: ['normal', 'italic'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-w-full min-h-[100dvh] ${jockeyOne.variable} ${poppins.variable} font-body`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}