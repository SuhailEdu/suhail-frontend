import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {getSession} from "@/auth";

// This function can be marked `async` if using `await` inside
export async function  middleware(request: NextRequest) {
    const session = await getSession()
    if (( request.nextUrl.pathname !== '/auth/login' && request.nextUrl.pathname !== '/auth/register') && !session.isLoggedIn ) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if (( request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/register') && session.isLoggedIn ) {
        return NextResponse.redirect(new URL('/', request.url))

    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/dashboard' , '/auth/login' , '/auth/register'],
}