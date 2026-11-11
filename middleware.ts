import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();

  // PINK FIX - purana pink link -> naya link
  if (pathname.includes("ladies-wallet-pink")) {
    return NextResponse.redirect(new URL("/product/ladies-wallet", request.url));
  }

  // 404 FIX - /products/ladies-wallet -> /product/ladies-wallet
  if (pathname === "/products/ladies-wallet") {
    return NextResponse.redirect(new URL("/product/ladies-wallet", request.url));
  }

  // Safe casting to 'any' to bypass missing geo property type definition
  const country = (request as any).geo?.country || 'PK';
  
  const response = NextResponse.next();
  response.headers.set('x-visitor-country', country);
  
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};