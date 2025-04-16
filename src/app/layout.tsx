import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParentWrapper from "./ParentWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atlantic Web Builder",
  description:
    "Generate an website instantly using Drag and Drop Tailwind CSS components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParentWrapper>{children}</ParentWrapper>
      </body>
    </html>
  );
}
