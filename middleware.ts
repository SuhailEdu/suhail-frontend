import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getSession} from "@/auth";
import {next} from "sucrase/dist/types/parser/tokenizer";

// This function can be marked `async` if using `await` inside
export async function  middleware(request: NextRequest) {
    const session = await getSession()
    if (( request.nextUrl.pathname !== '/auth/login' && request.nextUrl.pathname !== '/auth/register') && !session.isLoggedIn ) {
        console.log('session skdjfksdjf sdfjksdfj', session.isLoggedIn)
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if (( request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/register') && session.isLoggedIn ) {
        return NextResponse.redirect(new URL('/', request.url))

    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/' , '/auth/login' , '/auth/register'],
}