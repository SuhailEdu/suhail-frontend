"use client"
import {getSession} from "@/auth";
import useAuthStore from "@/stores/AuthStore";

export default  function  Dashboard({id}: {id: string}) {
    // const user = useAuthStore(state => state.user);
    // console.log(user.isLoggedIn)

    return (
        <section className="bg-white flex items-center h-screen dark:bg-gray-900">
            Here is home
            <div>
                Your email is : {id}
                {/*{session.isLoggedIn ? <p>yes</p> : <p>no</p>}*/}
            </div>
        </section>
    )
}
