"use client"
import {SessionProvider} from "next-auth/react";
import React, {ReactNode} from "react";
import {Session} from "next-auth";


interface Props {
    children: ReactNode;
    session: Session | null;
}

function AuthProvider({children, session}: Props) {
    console.log(session)
    return (
        <SessionProvider>{children}</SessionProvider>

    )

}

export default AuthProvider;