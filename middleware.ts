import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SUBDOMAIN_TO_PATH: Record<string, string> = {
  "mochi.harshachaganti.com": "/mochi",
  "can.harshachaganti.com": "/can",
};

const SUBDOMAIN_TO_FAVICON: Record<string, string> = {
  "mochi.harshachaganti.com": "/favicons/mochi-rounded.png",
  "can.harshachaganti.com": "/favicons/can-rounded.png",
};

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host");
  if (!hostHeader) return NextResponse.next();
  const host = hostHeader.toLowerCase().split(":")[0];

  // Ensure subdomain-specific favicon works even when browser requests /favicon.ico directly.
  if (request.nextUrl.pathname === "/favicon.ico") {
    const iconPath = SUBDOMAIN_TO_FAVICON[host];
    if (iconPath) {
      const url = request.nextUrl.clone();
      url.pathname = iconPath;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Keep static assets untouched on subdomains
  if (/\.[^/]+$/.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const targetPath = SUBDOMAIN_TO_PATH[host];
  if (!targetPath) return NextResponse.next();

  const pathname = request.nextUrl.pathname;

  if (pathname === targetPath || pathname.startsWith(`${targetPath}/`)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? targetPath : `${targetPath}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|robots.txt|sitemap.xml).*)"],
};
