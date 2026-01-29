import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Content Analyzer | Detect AI-Generated Content",
  description: "Advanced AI-powered platform to detect and analyze AI-generated content. Upload documents and get detailed insights into content authenticity, AI usage percentage, and source detection.",
  keywords: "AI detection, content analysis, AI-generated content, plagiarism detection, content authenticity",
  authors: [{ name: "AI Content Analyzer Team" }],
  openGraph: {
    title: "AI Content Analyzer | Detect AI-Generated Content",
    description: "Analyze your documents for AI-generated content with our advanced detection platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
