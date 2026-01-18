import type { Metadata } from "next";
import Header from "@/components/header";

import './globals.css';
export const metadata: Metadata = {
  title: "Posting Management App",
  description: "Posting managment with next environtment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
