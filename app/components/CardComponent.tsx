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
const CardComponent = ({ data }: HomeClientContentProps) => {
    const { language } = useLanguage();
    const pathname = usePathname(); 
    const [isAnimating, setIsAnimating] = useState(false);
    const [destination, setDestination] = useState<string | null>(null);
    const isMobile = useMediaQuery('(max-width:768px)');
  
  
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
       
        <div className="grid grid-cols-1 md:grid-cols-1 mt-4 gap-5 mb-16">
          {data.map((post) => {
            const CardTitle = language === 'JP' ? post.title_JP : language === 'HK' ? post.title_TW : post.title_EN;
            const CardDescription = language === 'JP' ? post.smallDescription_JP : language === 'HK' ? post.smallDescription_TW : post.smallDescription_EN;
            const imageUrl = post.titleImage ? urlFor(post.titleImage).url() : "/";
  
            return (
              <AnimatePresence key={post.currentSlug}>
                {!isAnimating && (
                  <motion.div 
                    key={post.currentSlug} // Ensure key is unique
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
                      whileHover={{ scale: .95, rotate: .5 }}
                      whileTap={{ scale: 1.05, rotate: -.5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      onClick={() => handleCardClick(post.currentSlug)} // Replace Link's default behavior
                    >
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
                    </motion.div>
                  </motion.div>
                )}
  
                {isAnimating && (
                  <motion.div 
                    key={post.currentSlug} // Ensure key is unique
                    initial={{ opacity: 1  }}
                    animate={{ opacity: 0}}
                    transition={{
                      duration: 0.8,
                      delay: 0.1,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}
                  >
                    <Card>
                      <Image src={imageUrl} alt="" width={1200} height={700} className="rounded-t-lg h-[300px] object-cover" />
                      <CardContent className="mt-5">
                        <h3 className="text-xl line-clamp-2 font-bold">{CardTitle}</h3>
                        <p className="line-clamp-1 text-xs mt-1 text-blue-600">#{post.type}</p>
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
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default CardComponent;
  