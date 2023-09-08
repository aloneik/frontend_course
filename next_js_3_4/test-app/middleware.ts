export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/profile", "/profile/:path*", "/blog/add-post"]
};