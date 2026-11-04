import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Safe casting to 'any' to bypass missing geo property type definition
  const country = (request as any).geo?.country || 'PK';
  
  const response = NextResponse.next();
  response.headers.set('x-visitor-country', country);
  
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};