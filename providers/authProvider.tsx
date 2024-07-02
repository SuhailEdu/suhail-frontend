"use client"
import React, {ReactNode, useEffect} from "react";
import useAuthStore from "@/stores/AuthStore";
import {SessionData} from "@/session";


interface Props {
    children: ReactNode;
    session: SessionData;
}

function AuthProvider({children, session}: Props) {
    const setAuthUser = useAuthStore( s => s.setAuthUser)
    const [mounted, setMounted] = React.useState(false);
    useEffect(() => {
        if(session.isLoggedIn) {
            setAuthUser(session)
        }
        setMounted(true)

    }, []);

    return mounted && (
        <>{children}</>

    )

}

export default AuthProvider;