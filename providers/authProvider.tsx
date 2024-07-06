"use client"
import React, {ReactNode, useEffect} from "react";
import useAuthStore from "@/stores/AuthStore";
import {SessionData} from "@/session";


interface Props {
    children: ReactNode;
    session: string;
}

function AuthProvider({children, session}: Props) {
    const setAuthUser = useAuthStore( s => s.setAuthUser)
    const [mounted, setMounted] = React.useState(false);
    const parsedSession = JSON.parse(session) as SessionData;
        useEffect(() => {
        if(parsedSession.isLoggedIn) {
            setAuthUser(parsedSession);
        }
        setMounted(true)

    }, []);

    return mounted && (
        <>{children}</>

    )

}

export default AuthProvider;