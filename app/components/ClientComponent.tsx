"use client";

import { urlFor } from "@/app/lib/sanity";  // 确保导入 urlFor 函数
import { simpleBlogCard } from "@/app/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/app/components/LanguageContext";

interface ClientComponentProps {
  data: simpleBlogCard[];
}

const ClientComponent = ({ data }: ClientComponentProps) => {
  // 在这里使用语言上下文或者其他客户端逻辑
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 mt-4 gap-5">
      {data.map((post, idx) => {
        const title = language === 'JP' ? post.title_JP : language === 'HK' ? post.title_TW : post.title_EN;
        const description = language === 'JP' ? post.smallDescription_JP : language === 'HK' ? post.smallDescription_TW : post.smallDescription_EN;

        return (
          <Card key={idx}>
            <Image src={urlFor(post.titleImage).url()} alt="" width={1200} height={700} className="rounded-t-lg h-[300px] object-cover" />
            <CardContent className="mt-5">
              <h3 className="text-xl line-clamp-2 font-bold">{title}</h3>
              <p className="line-clamp-1 text-xs mt-1 text-blue-600">{post.type}</p>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{description}</p>
            </CardContent>
            <div className="flex justify-end">
              <Button asChild>
              <Link href={`/blog/${post.currentSlug}?lang=${language}`}>Read More</Link>
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ClientComponent;