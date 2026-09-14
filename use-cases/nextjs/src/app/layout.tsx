import type { Metadata } from "next";
import "./globals.css";
import "@iamjariwala/react-doc-viewer/dist/index.css";
export const metadata: Metadata = { title: "Document viewer example" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
