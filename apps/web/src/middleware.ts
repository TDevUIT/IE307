/* eslint-disable @typescript-eslint/no-explicit-any */
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import {jwtDecode} from 'jwt-decode';

const intlMiddleware = createMiddleware({
  locales: ['en', 'jp', 'vi'],
  defaultLocale: 'vi',
});

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const { pathname } = request.nextUrl;
  const langSegment = pathname.split('/')[1];
  const token = request.cookies.get('adminToken')?.value;

  if (pathname === `/${langSegment}/admin` && token) {

    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.role === true) {
        return NextResponse.redirect(new URL(`/${langSegment}/admin/dashboard`, request.url));
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return NextResponse.redirect(new URL(`/${langSegment}/admin`, request.url));
    }
  }

  if (pathname.startsWith(`/${langSegment}/admin/`) && pathname !== `/${langSegment}/admin`) {
    if (!token) {
      return NextResponse.redirect(new URL(`/${langSegment}/admin`, request.url));
    }

    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.role !== true) { 
        return NextResponse.redirect(new URL(`/${langSegment}/admin`, request.url));
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return NextResponse.redirect(new URL(`/${langSegment}/admin`, request.url));
    }
  }

  console.log('Middleware is running');
  return response;
}

export const config = {
  matcher: ['/', '/(vi|en|jp)/:path*', '/admin/:path*'],
};
