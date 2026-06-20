import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Decodes a JWT payload without verifying the signature.
// Signature verification happens on the Spring Boot backend — this is only
// for reading non-sensitive display data (username, email, name, avatar) that
// the backend already embedded in the token it issued.
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null

    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const pad = base64.length % 4
    if (pad === 2) base64 += '=='
    else if (pad === 3) base64 += '='

    return JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))
  } catch {
    return null
  }
}

function isExpired(payload: Record<string, unknown>): boolean {
  const exp = payload.exp as number | undefined
  if (!exp) return true
  const bufferTime = 30 * 1000 // 30-second clock-drift window
  return Date.now() >= exp * 1000 - bufferTime
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const payload = decodeJwtPayload(accessToken)

    if (!payload || isExpired(payload)) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // TODO: If the JWT doesn't carry profile fields (name, avatar_url), replace
    // the payload read below with a proxied call to the backend:
    // const res = await fetch(`${process.env.SPRING_BOOT_API_URL}/api/users/me`, {
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // })
    // const user = await res.json()
    // return NextResponse.json({ authenticated: true, user })

    // Standard JWT claims — adjust field names to match your Spring Boot token
    const user = {
      // sub is the standard JWT subject — typically username or user ID
      username:   (payload.sub as string)        ?? null,
      // Common custom claims; update keys to match what Spring Boot embeds
      full_name:  (payload.name as string)        ??
                  (payload.full_name as string)   ?? null,
      email:      (payload.email as string)       ?? null,
      avatar_url: (payload.avatar_url as string)  ?? null,
    }

    return NextResponse.json({ authenticated: true, user })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
