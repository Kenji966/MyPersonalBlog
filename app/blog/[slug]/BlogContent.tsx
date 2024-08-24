
'use client';

import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import { urlFor } from "@/app/lib/sanity";
import { TwitterTweetEmbed  } from 'react-twitter-embed';
import SyntaxHighlighter from 'react-syntax-highlighter';


interface BlogContentProps {
  imageUrl: string;
  title: string;
  smallDescription: string;
  content: any;
  date: string;
  type:string;
}
interface SectionProps {
    children: React.ReactNode; 
}

function Section({ children }: SectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    return (
      <section ref={ref}>
        <span
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s"
          }}
        >
          {children}
        </span>
      </section>
    );
  }

  

export default function BlogContent({
  imageUrl,
  title,
  smallDescription,
  content,
  type,
  date,
}: BlogContentProps) {
    const [isOpen, setIsOpen] = useState(false)

    const components = {
      types: {
        image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => {
          const imageUrl = urlFor(value.asset).url();
          return (
            <div className="my-8">
              <Image
                src={imageUrl}
                alt={value.alt || 'Blog Image'}
                width={800}
                height={800}
                className="rounded-lg border"
                layout="responsive"
              />
            </div>
          );
        },
        youtube: ({ value }: { value: { url: string } }) => {
          try {
            const videoId = new URL(value.url).searchParams.get('v');
            if (!videoId) throw new Error("Video ID not found");
            return (
              <div className="relative w-full pb-[56.25%] mb-4">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video"
                />
              </div>
            );
          } catch (error) {
            console.error("Error embedding YouTube video:", error);
            return <p>Error loading video.</p>;
          }
        },
        twitter: ({ value }: { value: { url: string } }) => {
          const tweetId = new URL(value.url).pathname.split('/').pop() as string;

          return (
            <div className="relative w-full mb-4">
              <TwitterTweetEmbed tweetId={tweetId} />
            </div>
          );
        },
        code: ({ value }: { value: { language: string; code: string } }) => {
          return (
            <div className='my-2'>
            <SyntaxHighlighter language={value.language} >
                {value.code}
            </SyntaxHighlighter>
            </div>
          );
        }
      },
    };
    
  return (
    <div>
    <div className="mt-6">
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
     <h1> 
        <span className="block text-base text-center text-primary font-semibold  tracking-wide uppercase">
        <p className="text-blue-600 text-xs"> #{type} </p>
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
         {title} 
        </span>
        <p className="text-xs mt-2 text-gray-500 text-end ">{date}</p>
      </h1> 
      </motion.div>
      <div className="flex justify-center mt-8">
      <motion.div
      className="box"
      initial={{ opacity: 0,x:5555}}
      animate={{opacity: 1, x: 0}}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
        <Image
          src={imageUrl}
          alt=""
          width={800}
          height={800}
          className="rounded-lg mt-8 border"
        />
        </motion.div>
      </div>
      
      <Section>  
      <div className="mt-16 prose prose-blue lg:prose-lg sm:prose-sm dark:prose-invert prose-li:marker:text-primary bg-clip-padding prose-a:text-primary mb-16 max-w-none">
      <PortableText value={content} components={components}  />
        <Button asChild>
          <Link href="/" > <p className="text-white dark:text-black">Back</p></Link>
        </Button>
      </div>
      </Section>
    </div>
    </div>
  );
}
