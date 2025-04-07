import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "File Manager",
  description: "An inovative approach to file managing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
