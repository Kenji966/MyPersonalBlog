

import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { PortableText } from "next-sanity";

async function getData(slug: string) {
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

  const data = await client.fetch(query);
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
    <div className="mt-6">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          {data.type}
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {title}
        </span>
        <p className="text-xs mt-1 text-gray-500">
        {new Date(data.date).toLocaleDateString(languageFromHash, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </p>
      </h1>
      <div className="flex justify-center mt-8">
        <Image
          src={imageUrl}
          alt=""
          width={800}
          height={800}
          className="rounded-lg mt-8 border"
        />
      </div>

      <div className="mt-16">{smallDescription}</div>

      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary bg-clip-padding prose-a:text-primary">
        <PortableText value={content} />
      </div>
    </div>
  );
}
