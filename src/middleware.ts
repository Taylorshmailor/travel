// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn');

  if (request.nextUrl.pathname === '/' && isLoggedIn) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (request.nextUrl.pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/home'],
};
