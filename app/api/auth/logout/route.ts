import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    console.log('Cookies before logout:', cookieStore.getAll());

     const backendResponse = await fetch(`${process.env.SPRING_BOOT_API_URL}/auth/logout`, {
      method: 'POST',
    });
    console.log('Logout response from backend:', backendResponse);
    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { message: errorData.message || 'Logout failed' },
        { status: backendResponse.status }
      );
    }
    
    // Clear the cookie by setting maxAge to 0 or deleting it
    const loginUrl = new URL('/auth/signin', req.url);
    const clearResponse = NextResponse.redirect(loginUrl);
      clearResponse.cookies.delete('access_token');
      clearResponse.cookies.delete('refresh_token');

    return clearResponse;
  } catch (error) {
    return NextResponse.json({ message: 'Failed to log out' }, { status: 500 });
  }
}