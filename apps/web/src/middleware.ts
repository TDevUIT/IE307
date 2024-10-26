import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // List all locales you support
  locales: ['en', 'jp', 'vi'],
  
  // Fallback if no locale is found
  defaultLocale: 'vi'
}); matcher: ['/', '/(de|en)/:path*']
console.log('Middleware is running');
export const config = {
   matcher: ['/', '/(vi|en|jp)/:path*']
};

