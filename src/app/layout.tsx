import type { Metadata } from "next";
import { Abel } from 'next/font/google';
import "./globals.css";


export const metadata: Metadata = {
  title: "File Manager",
  description: "An inovative approach to file managing",
};

const abel = Abel({ subsets: ['latin'], weight: "400"});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={"antialiased " + abel.className}>
        {children}
      </body>
    </html>
  );
}
