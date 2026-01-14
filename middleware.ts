import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Product slug to category mapping for redirects
const productCategoryMap: { [key: string]: string } = {
  // BLDC Ceiling Fans
  'airoelevate': 'ceiling-fans',
  'airoquad': 'ceiling-fans',
  'airogeometry': 'ceiling-fans',
  'airojewel': 'ceiling-fans',
  
  // Smart Fans
  'airojewelsmart': 'smart-fans',
  'airogeometrysmart': 'smart-fans',
  
  // Decorative Fans
  'airozephyr': 'decorative-fans',
  'airoserenade': 'decorative-fans',
  'airosleek': 'decorative-fans',
  
  // Economy Fans
  'vayuprohs': 'economy-fans',
  'vayuultra': 'economy-fans',
  'airofreshnew': 'economy-fans',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Handle old /products/[slug] URLs that might not be caught by next.config.js
  if (pathname.startsWith('/products/')) {
    const slug = pathname.split('/products/')[1]
    
    // Check if this is a known product slug
    if (productCategoryMap[slug]) {
      const category = productCategoryMap[slug]
      const newUrl = new URL(`/${category}/${slug}`, request.url)
      
      // Return a 301 permanent redirect
      return NextResponse.redirect(newUrl, 301)
    }
  }
  
  // Add security headers for all responses
  const response = NextResponse.next()
  
  // Add canonical URL header for SEO
  if (pathname.match(/^\/(ceiling-fans|smart-fans|decorative-fans|economy-fans)\/[^\/]+$/)) {
    response.headers.set('X-Canonical-URL', `https://fans.ecolinklighting.in${pathname}`)
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
} 