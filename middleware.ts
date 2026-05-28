import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Helper to decode JWT payload without heavy external libraries (Middleware-compatible)
function isTokenExpired(token: string | undefined): boolean {
  if (!token) return true;
  try {
    // 1. Extract the payload split
    const parts = token.split('.');
    if (parts.length < 2) return true;
    
    const base64Url = parts[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // 2. Production Safeguard: Pad the base64 string if it's missing trailing '=' 
    // This prevents runtime environment failures with atob()
    const pad = base64.length % 4;
    if (pad === 2) {
      base64 += '==';
    } else if (pad === 3) {
      base64 += '=';
    }

    // 3. Decode and parse
    const payload = JSON.parse(atob(base64));

    // Fallback if the token somehow lacks an exp field
    if (!payload.exp) return true;

    // 4. Time Comparison (exp is in seconds, Date.now() is in milliseconds)
    const bufferTime = 30 * 1000; // 30-second window to prevent clock-drift issues
    return Date.now() >= (payload.exp * 1000) - bufferTime;
    
  } catch (error) {
    console.error("Error parsing JWT for expiration check:", error);
    return true; // Treat broken tokens as expired to force a clean re-auth
  }
}

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

  // Skip asset files and auth API endpoints to prevent infinite loops
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/static') || 
    pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // If access token is stale but we have a refresh token, rotate it!
  if (isTokenExpired(accessToken) && refreshToken) {
    try {
      // 1. Call Spring Boot to refresh tokens
      const response = await fetch(`${process.env.SPRING_BOOT_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Refresh failed');
      }

      const data = await response.json(); // Expects: { accessToken: "...", refreshToken: "..." }

      // 2. Setup response to proceed to the destination
      const nextResponse = NextResponse.next();

      // 3. Update cookies in the user's browser
      nextResponse.cookies.set('access_token', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 5 * 60, // 5 minutes
        path: '/',
      });

      nextResponse.cookies.set('refresh_token', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60, // 1 hour
        path: '/',
      });

      // 4. CRITICAL CRUX: Pass the NEW token down to the current request's headers 
      // so Server Components or Route Handlers executing right now get the fresh token.
      request.cookies.set('access_token', data.accessToken);
      nextResponse.headers.set('cookie', request.cookies.toString());

      return nextResponse;

    } catch (error) {
      console.error('Silent token refresh failed:', error);
      // Refresh token is likely expired (past 1 hour). Force clear tokens and send to login.
      const loginUrl = new URL('/login', request.url);
      const clearResponse = NextResponse.redirect(loginUrl);
      clearResponse.cookies.delete('access_token');
      clearResponse.cookies.delete('refresh_token');
      return clearResponse;
    }
  }
  return NextResponse.next()
}
