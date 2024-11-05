import type { Metadata } from "next";
import { Acme } from "next/font/google";
import "./globals.css";

const acme = Acme({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kilowatt: Hawai'i Keiki Museum",
  description: "Hawai'i Hackathon 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={acme.className}>{children}</body>
    </html>
  );
}
