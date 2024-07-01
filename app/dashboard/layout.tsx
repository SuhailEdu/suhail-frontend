import DashboardHome from "@/components/DashboardHome";
import {getSession} from "@/auth";


async function DashboardLayout({children}:any) {


    return (
        <>
            <main className="py-28 px-12 ">
                {children}

            </main>
        </>
        // <h1>hk</h1>
    )
}

export default DashboardLayout;