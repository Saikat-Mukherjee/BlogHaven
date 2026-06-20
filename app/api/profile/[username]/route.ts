import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params

    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    const backendUrl = `${process.env.SPRING_BOOT_API_URL}/api/profiles/${username}`

    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Forward the access token if present (profile may include private fields for own profile)
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      // Do not cache — profile data must always be fresh
      cache: 'no-store',
    })

    if (backendResponse.status === 404) {
      return NextResponse.json(
        { message: `Profile not found for user: ${username}` },
        { status: 404 }
      )
    }

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}))
      return NextResponse.json(
        { message: errorData.message || 'Failed to fetch profile' },
        { status: backendResponse.status }
      )
    }

    const profile = await backendResponse.json()
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

