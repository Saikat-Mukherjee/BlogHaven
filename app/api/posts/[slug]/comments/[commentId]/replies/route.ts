import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string; commentId: string }> }
) {
  const { slug, commentId } = await params
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const { searchParams } = new URL(request.url)
  const query = searchParams.toString()

  const backendUrl = `${process.env.SPRING_BOOT_API_URL}/api/posts/${slug}/comments/${commentId}/replies${query ? `?${query}` : ''}`

  const backendResponse = await fetch(backendUrl, {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    cache: 'no-store',
  })

  if (!backendResponse.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch replies' },
      { status: backendResponse.status }
    )
  }

  const data = await backendResponse.json()
  return NextResponse.json(data)
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string; commentId: string }> }
) {
  const { slug, commentId } = await params
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const body = await request.json()

  const backendUrl = `${process.env.SPRING_BOOT_API_URL}/api/posts/${slug}/comments/${commentId}/replies`

  const backendResponse = await fetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  if (!backendResponse.ok) {
    return NextResponse.json(
      { error: 'Failed to post reply' },
      { status: backendResponse.status }
    )
  }

  const data = await backendResponse.json()
  return NextResponse.json(data, { status: 201 })
}
