"use client"

import * as React from "react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ReactCountryFlag from "react-country-flag"
import { useLanguage } from "./LanguageContext"
import { useState } from "react";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = React.useState(language);
  React.useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const flagCountryCode = {
    EN: "GB", 
    JP: "JP",
    HK: "HK",
  }[selectedLanguage];

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setSelectedLanguage(lang);
    router.push(`?lang=${lang}`); // Update the URL with the new language parameter
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ReactCountryFlag
            countryCode={flagCountryCode as string}
            className="h-[1.2rem] w-[1.2rem] transition-all"
          />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("EN")}>
          EN
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("JP")}>
          JP
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("HK")}>
          HK
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
