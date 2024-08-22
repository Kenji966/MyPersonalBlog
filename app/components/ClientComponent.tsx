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

interface ClientComponentProps {
  data: simpleBlogCard[];
}

const ClientComponent = ({ data }: ClientComponentProps) => {
  const { language } = useLanguage();
  const pathname = usePathname(); 

  const Title = language === 'JP' ? "こんにちは、私は馬偉堅（マ・ワイギン）ですが、Kenjiとも呼んでください。" 
    : language === 'HK' ? "你好，我叫馬偉堅，你可以叫我 Kenji。歡迎來到我的個人開發博客！" 
    : "Hi, I’m Wai Kin Ma, also known as Kenji.";
  
  const Description = language === 'JP' ? "ゲーム開発とウェブ開発を専門とするプロフェッショナルです。AR（拡張現実）、UIデザイン、エフェクトデザインの分野にも精通しています。このブログでは、これらの分野での経験や学習ノートを共有し、技術に対する情熱と専門知識をお見せします。私のスキルや背景を理解し、どのように価値を創造できるかを知っていただければと思います。" 
    : language === 'HK' ? "我是一名專注於遊戲開發和網站開發的專業開發者。我的專業領域涵蓋了AR增強現實、UI設計和效果設計。在這個博客中，我會分享我在這些領域中的經驗和學習筆記，展示我對技術的熱情和專業知識。希望通過這些內容，你能夠更好地了解我的技能和背景，並探索我如何在這些領域中創造價值。" 
    : "I’m a professional developer specializing in game development and web development. My expertise includes AR augmented reality, UI design, and effect design. On this blog, I’ll share my experiences and learning notes in these fields, showcasing my passion for technology and professional knowledge. I hope these insights will give you a better understanding of my skills and background and how I can create value in these areas.";

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div 
          key={pathname} 
          initial={{ x: 555 }} 
          animate={{ x: 0 }}
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
      </AnimatePresence>
      
      <div className="grid grid-cols-1 md:grid-cols-1 mt-4 gap-5">
        {data.map((post) => {
          const CardTitle = language === 'JP' ? post.title_JP : language === 'HK' ? post.title_TW : post.title_EN;
          const CardDescription = language === 'JP' ? post.smallDescription_JP : language === 'HK' ? post.smallDescription_TW : post.smallDescription_EN;
          
          const imageUrl = post.titleImage ? urlFor(post.titleImage).url() : "/";

          return (
            <motion.div 
              key={post.currentSlug} // Use unique identifier from post
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
              <motion.div
                className="box"
                whileHover={{ scale: 1.05, rotate: 2.5 }}
                whileTap={{ scale: 0.8, rotate: -2.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link href={`/blog/${post.currentSlug}?lang=${language}`}>
                  <Card>
                    <Image src={imageUrl} alt="" width={1200} height={700} className="rounded-t-lg h-[300px] object-cover" />
                    <CardContent className="mt-5">
                      <h3 className="text-xl line-clamp-2 font-bold">{CardTitle}</h3>
                      <p className="line-clamp-1 text-xs mt-1 text-blue-600">{post.type}</p>
                      <p className="text-xs mt-1 text-gray-500">
                        {new Date(post.date).toLocaleDateString(language, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{CardDescription}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </motion.div>    
          );
        })}
      </div>
    </div>
  );
};

export default ClientComponent;
