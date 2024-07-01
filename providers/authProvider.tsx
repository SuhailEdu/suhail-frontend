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
            setAuthUser(session)
            console.log("setting user done")
        }

    }, []);
    return (
        <div>{children}</div>

    )

}

export default AuthProvider;