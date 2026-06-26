import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const AB_COOKIE = "ab_prefetch";

function applyAbPrefetchCookie(request: NextRequest, response: NextResponse) {
  const forced = request.nextUrl.searchParams.get("ab_prefetch");
  const existing = request.cookies.get(AB_COOKIE)?.value;

  if (forced === "A" || forced === "B") {
    response.cookies.set(AB_COOKIE, forced, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
    console.log(`[AB] Forcé via query param: ${forced}`);
    return;
  }

  if (existing === "A" || existing === "B") {
    return;
  }

  const variant = Math.random() < 0.5 ? "A" : "B";
  response.cookies.set(AB_COOKIE, variant, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });
  console.log(`[AB] Nouveau tirage: ${variant}`);
}

export const proxy = auth((request) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const role = request.auth?.user?.role;

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const response = NextResponse.next();
  applyAbPrefetchCookie(request, response);

  return response;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
