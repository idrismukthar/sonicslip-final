import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create rate limiter: 10 requests every 10 seconds per user
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10s"),
});

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect the studio and api routes
  if (pathname.startsWith("/studio") || pathname.startsWith("/api")) {
    
    // FIX for Next.js 16: Get IP from headers for Vercel deployment
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(',')[0] : "127.0.0.1";

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests! Slow down." }), 
        { status: 429, headers: { 'content-type': 'application/json' } }
      );
    }
  }
  
  return NextResponse.next();
}

// Config ensures this middleware doesn't run on static files (images, css, etc.)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
