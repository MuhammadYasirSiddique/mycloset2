import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/category/:path*",
    "/cart",
    "/mycart",
    "/api/cart/null",
    "/api/webhook/:path*",
    "/studio/:path*",
    // "/product/:path*",
    // "/api/cart/:path*",
    // "/api/cart",
  ],
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/api/cart/:path",
  ],
};
