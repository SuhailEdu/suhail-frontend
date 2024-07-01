'use client'
import PrimaryButton from "@/components/shared/PrimaryButton";
import {getSession, logout} from "@/auth";
import useAuthStore from "@/stores/AuthStore";

export default  function LogOutButton() {

    async function logUserOut() {
        await logout()
    }

    const user =  useAuthStore(state => state.user);

    console.log(user)

    return (
        <>

            {user.isLoggedIn && (
                <PrimaryButton onClick={() => logUserOut()}>Log out
                    <span>
                                 {user.firstName}
                            </span>

                </PrimaryButton>

            )}
        </>

    )
}
