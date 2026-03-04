import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SUBDOMAIN_TO_PATH: Record<string, string> = {
  "mochi.harshachaganti.com": "/mochi",
  "can.harshachaganti.com": "/can",
};

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host");
  if (!hostHeader) return NextResponse.next();

  // Keep static assets untouched on subdomains
  if (/\.[^/]+$/.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const host = hostHeader.toLowerCase().split(":")[0];
  const targetPath = SUBDOMAIN_TO_PATH[host];
  if (!targetPath) return NextResponse.next();

  if (request.nextUrl.pathname === targetPath) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = targetPath;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
