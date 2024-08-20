import  { auth } from "@/auth"
import { DEFAULT_REDIRECT, apiAuthPrefix, authRoute, publicRoutes} from "@/routes"


export default auth ((req) => {
    //runs on every single route except matcher
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoute.includes(nextUrl.pathname)

    if (isApiAuthRoute) return null

    if (isAuthRoute) {
        if (isLoggedIn) return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    return null
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/signin', nextUrl))
    }

    return null
})

//optionally dont invoke the midlleware on some part
export const config = {
    matcher: ["/((?!_next/image|_next/static|favicon.ico).*)"],
}