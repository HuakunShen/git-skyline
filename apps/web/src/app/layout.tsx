import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      <GoogleAnalytics gaId="G-K3T0E06JV4" />
      <body className={`${inter.className} h-screen`}>{children}</body>
    </html>
  );
}
