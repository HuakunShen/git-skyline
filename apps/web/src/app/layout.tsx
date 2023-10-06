import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Git Skyline",
  description: "Git Contributions as 3D Models",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " h-screen flex flex-col"}>
        <Header className="flex-none" />
        <div className="grow">{children}</div>
        <Footer className="flex-none" />
      </body>
    </html>
  );
}
