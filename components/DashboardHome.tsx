"use client"
import {useSession} from "next-auth/react";

export default () => {
    const session = useSession();
    console.log(session);
    return (
        <section className="bg-white flex items-center h-screen dark:bg-gray-900">
            Here is home
        </section>
    )
}
