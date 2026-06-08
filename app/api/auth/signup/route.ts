import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json();
    console.log('Received signup data:', { email, username }); // Log received data for debugging

    // 1. Call your Spring Boot Backend
    const backendResponse = await fetch(`${process.env.SPRING_BOOT_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });

    if (!backendResponse.ok) {
      throw new Error('Failed to create account');
    }

    return NextResponse.json({ message: 'Account created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}