import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: [
    "/",
    "/category/:path*",
    // "/product/:path*",
    "/cart",
    // "/api/cart:path*",
    // "/apit/cart",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
