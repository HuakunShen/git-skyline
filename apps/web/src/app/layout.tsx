import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/footer";

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
      <body className={`${inter.className} h-screen flex flex-col`}>
        <Header className="flex-none" />
        <div className="grow">{children}</div>
        <Footer className="flex-none" />
      </body>
    </html>
  );
}
