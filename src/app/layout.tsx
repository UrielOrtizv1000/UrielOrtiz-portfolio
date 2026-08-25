import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uriel Ortiz — Frontend Developer & IT/Cloud Support",
  description:
    "Portfolio of Uriel Ezequiel Ortiz Rosales — Computer Systems Engineering student specializing in frontend development and cloud/IT support fundamentals.",
  metadataBase: new URL("https://urielortizv1000.github.io/UrielOrtiz-portfolio/"),
  openGraph: {
    title: "Uriel Ortiz — Frontend Developer & IT/Cloud Support",
    description:
      "Portfolio of Uriel Ezequiel Ortiz Rosales — Computer Systems Engineering student specializing in frontend development and cloud/IT support fundamentals.",
    type: "website",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
