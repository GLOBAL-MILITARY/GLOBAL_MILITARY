import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./main.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Global Military Power - Rankings & Analysis",
  description: "Interactive platform for analyzing global military power rankings, capabilities, and defense statistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      background: '#020617',
                      foreground: '#e2e8f0',
                      power: {
                        gold: '#FFD700',
                        red: '#EF4444',
                        orange: '#F59E0B',
                        amber: '#FBBF24',
                        gray: '#64748B',
                      }
                    },
                    fontFamily: {
                      sans: ['var(--font-inter)', 'sans-serif'],
                      heading: ['var(--font-oswald)', 'sans-serif'],
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-slate-950 text-slate-100 min-h-screen relative selection:bg-blue-500/30 selection:text-blue-200`}
      >
        {/* Background Effects */}
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay" />

        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
