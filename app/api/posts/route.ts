import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    // Proxies to: GET /api/posts
    // Returns public feed of all PUBLISHED + PUBLIC posts, newest first.
    // Forwards any query params (e.g. ?page=1&size=10) to the backend.
    const { searchParams } = new URL(request.url)
    const query = searchParams.toString()
    const backendUrl = `${process.env.SPRING_BOOT_API_URL}/api/posts${query ? `?${query}` : ''}`

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
        { error: 'Failed to fetch posts' },
        { status: backendResponse.status }
      )
    }

    const posts = await backendResponse.json()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
