import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

// Specify routes for authenticated users
const protectedRoutes = ['/admin', '/user'];
const publicRoutes = ['/login', '/register', '/'];

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Ensure Middleware does not run on API routes or static files
  if (pathname.match(/^\/api|^\/_next\/|^\/favicon.ico/)) {
    return NextResponse.next();
  }

  // Retrieve cookies using cookies-next
  const token = getCookie('token', { req });

  // Check if the request is attempting to access a protected route
  if (protectedRoutes.includes(pathname)) {
    // If the user is not authenticated, redirect them to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Redirect authenticated users away from public pages to their dashboards
  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/user', req.url));
  }

  return NextResponse.next();
}

// Ensure Middleware does not run on API routes or static files
export const config = {
  matcher: ['/((?!api|_next\/static|_next\/image|favicon.ico).*)'],
};
