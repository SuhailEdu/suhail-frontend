'use client'
import PrimaryButton from "@/components/shared/PrimaryButton";
import {getSession, logout} from "@/auth";
import useAuthStore from "@/stores/AuthStore";
import {useEffect, useState} from "react";
import {LoaderCircle, Shell} from "lucide-react";

export default  function LogOutButton() {

    async function logUserOut() {
        await logout()
    }

    const [isLoaded , setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const user =  useAuthStore(state => state.user);


    return (
        <>

            {/*{user.isLoggedIn && (*/}
                <PrimaryButton disabled={!isLoaded} onClick={() => logUserOut()}>
                    {isLoaded ? "تسجيل الخروج" :<LoaderCircle className="animate-spin" />}
                </PrimaryButton>

            {/*)}*/}
        </>
    )
}
