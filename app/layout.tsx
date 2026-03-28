import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DealFlow Checklist",
  description: "Simplify a complex multi-step transaction.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
