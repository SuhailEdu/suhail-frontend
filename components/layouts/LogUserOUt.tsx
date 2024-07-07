'use client'
import PrimaryButton from "@/components/shared/PrimaryButton";
import {logout} from "@/auth";
import useAuthStore from "@/stores/AuthStore";
import {useEffect, useState} from "react";
import {LoaderCircle} from "lucide-react";
import {useRouter} from "next/navigation";

export default  function LogOutButton() {
    const logoutClient = useAuthStore(state => state.logout);
    const router = useRouter()

    async function logUserOut() {
        await logout()
        logoutClient()
        router.replace("/auth/login")

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
