import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Cho phép truy cập vào các routes trong (auth) group
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return NextResponse.next();
  }

  // Nếu không có token và không phải ở public routes thì redirect về login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    // Lưu lại url hiện tại để sau khi login có thể redirect lại
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Cấu hình các routes sẽ được middleware xử lý
export const config = {
  matcher: [
    /*
     * Match tất cả các routes ngoại trừ:
     * - _next
     * - api (API routes)
     * - static files (js, css, images, etc)
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico).*)',
  ],
}; 