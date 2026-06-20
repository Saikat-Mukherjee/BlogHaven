import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const backendUrl = `${process.env.SPRING_BOOT_API_URL}/api/posts/${slug}`

  const backendResponse = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    cache: 'no-store',
  })

  if (!backendResponse.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: backendResponse.status }
    )
  }

  const post = await backendResponse.json()
  return NextResponse.json(post)
}
