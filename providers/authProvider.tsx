"use client";
import {SessionProvider} from "next-auth/react";
import React, {ReactNode} from "react";

import {getSession} from "@/auth";

interface Props {
    children: ReactNode;
}

async function AuthProvider({children}: Props) {
    const session = await getSession()
    return (
        <SessionProvider>{children}</SessionProvider>

    )

}

export default AuthProvider;