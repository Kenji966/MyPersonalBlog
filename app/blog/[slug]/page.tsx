import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BlogContent from "./BlogContent"; // Client 端组件的导入

async function getData(slug: string) {
  const timestamp = new Date().getTime(); 
  const query = `
    *[_type == 'blog' && slug.current == '${slug}'] {
      "currentSlug": slug.current,
      title_JP,
      title_TW,
      title_EN,
      type,
      date,
      smallDescription_EN,
      smallDescription_JP,
      smallDescription_TW,
      content_EN,
      content_JP,
      content_TW,
      titleImage
    }[0]`;

    const data = await client.fetch(query, { timestamp });
    return data;
  }

export default async function BlogArticle({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { lang?: string };
}) {
  const data: fullBlog = await getData(params.slug);

  if (!data || !data.titleImage) {
    console.error('url fail');
  }

  const imageUrl = data?.titleImage ? urlFor(data.titleImage).url() : "/Project2.jpg";
  const languageFromHash = searchParams.lang || 'EN'; // 默认使用 'EN'
  const type = data.type;

  const title =
    languageFromHash === 'JP'
      ? data.title_JP
      : languageFromHash === 'HK'
      ? data.title_TW
      : data.title_EN;

  const smallDescription =
    languageFromHash === 'JP'
      ? data.smallDescription_JP
      : languageFromHash === 'HK'
      ? data.smallDescription_TW
      : data.smallDescription_EN;

  const content =
    languageFromHash === 'JP'
      ? data.content_JP
      : languageFromHash === 'HK'
      ? data.content_TW
      : data.content_EN;

  return (
    <BlogContent
      imageUrl={imageUrl}
      title={title}
      smallDescription={smallDescription}
      content={content}
      type={type}
      date={new Date(data.date).toLocaleDateString(languageFromHash, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    />
  );
}
