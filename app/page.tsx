import { client } from "@/app/lib/sanity";
import ClientComponent from './components/ClientComponent';
import { simpleBlogCard } from "@/app/lib/interface";


async function getData() {
  const timestamp = new Date().getTime(); 
  const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
      title_EN,
      title_JP,
      title_TW,
      type,
      date,
      smallDescription_EN,
      smallDescription_JP,
      smallDescription_TW,
      "currentSlug": slug.current,
      titleImage
    }
  `;

  const data = await client.fetch(query, { timestamp });
  console.log(data);
  return data;
}

export default async function Home() {
  let data: simpleBlogCard[] = await getData();

  return (
    <ClientComponent data={data} />
  );
}
