import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paras Sharma Portfolio",
  description: "AI Engineer | Data Scientist | Software Developer",
  openGraph: {
    title: "Paras Sharma Portfolio",
    description: "AI Engineer | Data Scientist | Software Developer",
    images: ["/paras-og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full bg-[#03000a] text-gray-100 font-sans selection:bg-cyan-500/30 selection:text-white">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
