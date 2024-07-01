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
    useEffect(() => {
        if(session.isLoggedIn) {
            console.log("user logged out")

            setAuthUser(session)
        }

    }, []);
    return (
        <div>{children}</div>

    )

}

export default AuthProvider;