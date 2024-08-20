// nextjs-app/lib/sanity.js
import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'c2733rel',
  dataset: 'production',
  apiVersion: '2023-08-01',
  useCdn: false,
})