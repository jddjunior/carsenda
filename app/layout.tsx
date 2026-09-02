import type { Metadata } from "next";
import "./globals.css";

// Loaded via <link> (fetched by the browser at runtime) rather than
// next/font/google, which fetches from fonts.googleapis.com at build time —
// not reliable across every build environment. Font stacks fall back
// gracefully to system fonts if the request is ever blocked.
export const metadata: Metadata = {
  title: "Carsenda — Ship any vehicle, any distance",
  description:
    "Instant quotes, vetted carriers, and live tracking from pickup to delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
