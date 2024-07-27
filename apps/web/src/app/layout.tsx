import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Git Skyline",
  description: "Git Contributions as 3D Models",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Analytics />
      <SpeedInsights />
      <body className={`${inter.className} h-screen`}>{children}</body>
    </html>
  );
}
