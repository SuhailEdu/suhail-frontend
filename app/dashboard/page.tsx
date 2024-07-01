import DashboardHome from "@/components/DashboardHome";
import {getSession} from "@/auth";


async function Home() {
    const session = await getSession()

    console.log("session" , session)

    return (
        <>
            {session.email && (
                <DashboardHome id={session.email}/>

            )}
        </>
        // <h1>hk</h1>
    )
}

export default Home;