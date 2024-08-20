import { client } from "@/app/lib/sanity";
import ClientComponent from './components/ClientComponent'; // 引入客户端组件
import { simpleBlogCard } from "@/app/lib/interface";

async function getData() {
  const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
      title_EN,
      title_JP,
      title_TW,
      type,
      smallDescription_EN,
      smallDescription_JP,
      smallDescription_TW,
      "currentSlug": slug.current,
      titleImage
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <ClientComponent data={data} />
  );
}
