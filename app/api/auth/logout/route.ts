import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    
    // Clear the cookie by setting maxAge to 0 or deleting it
    const loginUrl = new URL('/login', req.url);
    const clearResponse = NextResponse.redirect(loginUrl);
      clearResponse.cookies.delete('access_token');
      clearResponse.cookies.delete('refresh_token');

    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to log out' }, { status: 500 });
  }
}