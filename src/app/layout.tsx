import type { Metadata } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";
import "./globals.css";

// Archivo's width axis powers the condensed display headings (font-stretch: 62%).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uriel Ortiz — Frontend Developer & IT/Cloud Support",
  description:
    "Portfolio of Uriel Ezequiel Ortiz Rosales — Computer Systems Engineering student specializing in frontend development and cloud/IT support fundamentals.",
  metadataBase: new URL("https://urielortiz.xyz/"),
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
      className={`${archivo.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
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
