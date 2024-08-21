import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./components/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kenji's Dev Blog",
  description: "Wellcome to My Personal Develog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
  <body className={inter.className} >
    
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
       <div className={inter.className}>
      <LanguageProvider>
        <Navbar/>
        <main className="max-w-2xl mx-auto px-4">
          {children}
        </main>
        </LanguageProvider></div>
    </ThemeProvider>
  </body>
</html>
  );
}
