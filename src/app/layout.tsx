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
      <head>
        <link rel="shortcut icon" href="/assets/icons/nexus.svg" type="image/x-icon" />
      </head>
      <body className={"antialiased " + abel.className}>
        {children}
      </body>
    </html>
  );
}
