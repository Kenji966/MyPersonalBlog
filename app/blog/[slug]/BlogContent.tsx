
'use client';

import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";


interface BlogContentProps {
  imageUrl: string;
  title: string;
  smallDescription: string;
  content: any;
  date: string;
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
  date,
}: BlogContentProps) {
    const [isOpen, setIsOpen] = useState(false)

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
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
        {title}
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
         {title} 
        </span>
        <p className="text-xs mt-1 text-gray-500">{date}</p>
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
      
      <Section>  <div className="mt-16">{smallDescription}</div>
      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary bg-clip-padding prose-a:text-primary mb-16">
        <PortableText value={content} />
        <Button asChild>
          <Link href="/" className="text-gray-600 dark:text-gray-300">Back</Link>
        </Button>
      </div>
      </Section>
    </div>
    </div>
  );
}
