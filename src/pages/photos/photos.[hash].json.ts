import crypto from 'node:crypto'
import type { APIRoute } from 'astro'

export interface PhotoItem {
  uuid: string
  src: string
  desc: string
  thumbnail: string
  placeholder: string
  aspectRatio: number
}

// Temporarily simplified to avoid build issues
const VERSION = 1
const photos: unknown[] = []

export const hash = crypto
  .createHash('sha256')
  .update(`${VERSION}-${JSON.stringify(photos)}`)
  .digest('hex')
  .slice(0, 8)

// Simplified: return empty data to avoid timeout issues during build
const data: PhotoItem[] = []

export const GET: APIRoute = ({ params }) => {
  return new Response(JSON.stringify([params.hash, data]), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=31536000, immutable',
      // 'public, max-age=0, stale-while-revalidate=31536000, stale-if-error=31536000',
    },
  })
}

export async function getStaticPaths() {
  return [{ params: { hash } }]
}
