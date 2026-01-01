import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
});

export default async function middleware(request: NextRequest) {
  // Only protect the studio and api routes
  if (request.nextUrl.pathname.startsWith("/studio") || request.nextUrl.pathname.startsWith("/api")) {
    const ip = request.ip ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse("Too many requests! Please wait a moment.", { status: 429 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*', '/api/:path*'],
};