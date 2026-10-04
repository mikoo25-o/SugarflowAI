import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SugarFlow AI",
  description: "Operations platform for sugar supply chains — demo prototype",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
