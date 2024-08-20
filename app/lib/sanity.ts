import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: 'c2733rel',
  dataset: 'production',
  apiVersion: '2023-08-01',
  useCdn: false,
})

const builer = imageUrlBuilder(client);

export function urlFor(source: any){
  return builer.image(source);
}