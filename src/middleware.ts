import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(req: NextRequest) {
  const modHeaders = new Headers(req.headers);
  modHeaders.set('x-url-pathname', req.nextUrl.pathname);

  const res = NextResponse.next({
    request: {
      headers: modHeaders
    }
  })

  const { supabase, response } = createClient(req, res);

  await supabase.auth.getSession();

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
