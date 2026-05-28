import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Call your Spring Boot Backend
    const backendResponse = await fetch(`${process.env.SPRING_BOOT_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { message: errorData.message || 'Authentication failed' },
        { status: backendResponse.status }
      );
    }

    // Assuming Spring Boot returns JSON like: { token: "eyJhbGci...", user: { ... } }
    const { access_token, refresh_token } = await backendResponse.json();

    // 2. Set the JWT as an HttpOnly Cookie securely
    const cookieStore = await cookies();
    cookieStore.set('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in prod
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: '/',
    });

    cookieStore.set('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
    });

    // 3. Return user info to the frontend (excluding the token!)
    //return NextResponse.json({ success: true, user });
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}