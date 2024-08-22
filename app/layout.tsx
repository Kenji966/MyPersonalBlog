"use client"; // 标记为客户端组件

import { ReactNode } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./components/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); 

  return (
    <html lang="en">
      <body className={inter.className}>
        
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          <LanguageProvider>
          <motion.div 
           key={pathname} 
          style={{ x: -15, opacity: 0}} 
          animate={{ x: 0, opacity: 1 }}>
            <Navbar />
            </motion.div>
            <main className="max-w-4xl mx-auto px-4">
             
                  {children}
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
