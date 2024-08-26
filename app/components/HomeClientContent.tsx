"use client";

import { urlFor } from "@/app/lib/sanity"; 
import { simpleBlogCard } from "@/app/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/app/components/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import {useMediaQuery} from '@mui/material'
import TagComponent from "./tagComponent";

interface HomeClientContentProps {
  data: simpleBlogCard[];
}

const HomeClientContent = ({ data }: HomeClientContentProps) => {
  const { language } = useLanguage();
  const pathname = usePathname(); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [destination, setDestination] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width:768px)');


  const Title = language === 'JP' ? "こんにちは、私は馬偉堅（マ・ワイギン）ですが、Kenjiとも呼んでください。" 
    : language === 'HK' ? "你好，我叫馬偉堅，你可以叫我 Kenji。歡迎來到我的個人開發博客！" 
    : "Hi, I’m Wai Kin Ma, also known as Kenji.";
  
  const Description = language === 'JP' ? "ゲーム開発とウェブ開発を専門とするプロフェッショナルです。AR（拡張現実）、UIデザイン、エフェクトデザインの分野にも精通しています。このブログでは、これらの分野での経験や学習ノートを共有し、技術に対する情熱と専門知識をお見せします。私のスキルや背景を理解し、どのように価値を創造できるかを知っていただければと思います。" 
    : language === 'HK' ? "我是一名專注於遊戲開發和網站開發的專業開發者。我的專業領域涵蓋了AR增強現實、UI設計和效果設計。在這個博客中，我會分享我在這些領域中的經驗和學習筆記，展示我對技術的熱情和專業知識。希望通過這些內容，你能夠更好地了解我的技能和背景，並探索我如何在這些領域中創造價值。" 
    : "I’m a professional developer specializing in game development and web development. My expertise includes AR augmented reality, UI design, and effect design. On this blog, I’ll share my experiences and learning notes in these fields, showcasing my passion for technology and professional knowledge. I hope these insights will give you a better understanding of my skills and background and how I can create value in these areas.";
    
    const handleCardClick = (slug: string) => {
      setIsAnimating(true); // 开始动画
      setDestination(`/blog/${slug}?lang=${language}`); // 设置目标路径
    };
  
    useEffect(() => {
      if (destination) {
        const timeout = setTimeout(() => {
          window.location.href = destination;
        }, 100); // 等待动画完成后进行导航
  
        return () => clearTimeout(timeout); // 清理超时
      }
    }, [destination]);

  return (
    <div>
      <AnimatePresence>
        {!isAnimating && (
          <motion.div
            key="content-enter"
            initial={{ x: isMobile ? 300 : 555, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <h1 className="flex justify-center">{Title}</h1>
            <br />
            <h1 className="flex justify-center text-sm text-gray-600 dark:text-gray-300">{Description}</h1>
          </motion.div>
        )}

        {isAnimating && (
          <motion.div
            key="content-exit"
            initial={{ x: 0, opacity: 1  }}
            animate={{ x: isMobile ? -300 : -555, opacity: 0 }}
            exit={{ x: isMobile ? -300 : -555, opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <h1 className="flex justify-center">{Title}</h1>
            <br />
            <h1 className="flex justify-center text-sm text-gray-600 dark:text-gray-300">{Description}</h1>
            
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default HomeClientContent;
