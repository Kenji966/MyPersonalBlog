
  import { useState } from 'react';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import Link from 'next/link';
  import { useLanguage } from "@/app/components/LanguageContext";
  import CardComponent from './CardComponent';
  import { simpleBlogCard } from "@/app/lib/interface";
  import {client, urlFor } from "@/app/lib/sanity"; 
  
  interface TagComponentProps {
    onTagChange: (tag: string) => void;
  }


  const TagComponent: React.FC<TagComponentProps> = ({ onTagChange }) => {
    const handleTabChange = (value: string) => {
      console.log("Selected Tab:", value);  // 调试输出
      onTagChange(value);  // 调用父组件传入的回调函数
    };
  
    return (
      <Tabs defaultValue="all" onValueChange={handleTabChange} className=" pt-10 w-full flex justify-center sm:w-[600px] xl:w-[900px]">
        <TabsList>
          <TabsTrigger value="all">ALL</TabsTrigger>
          <TabsTrigger value="Game Dev">#Game Dev</TabsTrigger>
          <TabsTrigger value="Web Dev">#Web Dev</TabsTrigger>
          <TabsTrigger value="AR Dev">#AR</TabsTrigger>
        </TabsList>
        <TabsContent value="all"></TabsContent>
        <TabsContent value="Game Dev"></TabsContent>
        <TabsContent value="Web Dev"></TabsContent>
        <TabsContent value="AR"></TabsContent>
      </Tabs>
    );
  };
  
  export default TagComponent;
  