import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/category/:path*",
    "/cart",
    "/mycart",
    "/api/cart/null",
    "/api/webhooks",
    "/studio/:path*",
    "/register",
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
