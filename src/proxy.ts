import { NextRequest, NextResponse } from "next/server";

const MINDNEST_USER = "mindnest-user";

// Paths that require authentication
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/admin",
  "/coach",
];

// Auth pages that logged-in users should be redirected away from
const AUTH_PATHS = ["/auth/login", "/auth/register", "/auth/forgot-password"];

function parseMindnestUserCookie(value: string | undefined): {
  role: string | null;
  isLoggedIn: boolean;
} {
  if (!value) return { role: null, isLoggedIn: false };

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as {
      user?: { role?: string };
      sessionExpiresAt?: string;
    };

    if (parsed.sessionExpiresAt) {
      const exp = new Date(parsed.sessionExpiresAt).getTime();
      if (!Number.isNaN(exp) && exp <= Date.now()) {
        return { role: null, isLoggedIn: false };
      }
    }

    const role = typeof parsed.user?.role === "string" ? parsed.user.role : null;
    return { role, isLoggedIn: !!role };
  } catch {
    return { role: null, isLoggedIn: false };
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieValue = request.cookies.get(MINDNEST_USER)?.value;
  const { role, isLoggedIn } = parseMindnestUserCookie(cookieValue);

  // ── Auth guard: protect dashboard/admin/coach routes ──────────────────────
  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Redirect logged-in users away from auth pages ─────────────────────────
  const isAuthPage = AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (isAuthPage && isLoggedIn) {
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ── Role-based route guards ────────────────────────────────────────────────
  if (isLoggedIn) {
    if (role === "ADMIN" && pathname.startsWith("/member")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (role === "COACH" && pathname.startsWith("/member")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (role === "MEMBER" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/coach/:path*",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ],
};