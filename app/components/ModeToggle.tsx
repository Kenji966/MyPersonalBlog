"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const controls = useAnimation();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    // 当主题变化时，触发背景颜色动画
    controls.start({
      backgroundColor: theme === "light" ? "#ffffff" : "#000000",
      transition: { duration: 0.16, ease: "easeInOut" },
    });
  }, [theme, controls]);

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <>
      {/* 用于控制整个网页背景色的 motion.div */}
      <motion.div
        animate={controls}
        style={{ zIndex: -1, position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
      />

      {/* 切换按钮 */}
      <Button variant="outline" size="icon" onClick={handleClick}>
        {theme === "light" ? (
          <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
        ) : (
          <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
}
