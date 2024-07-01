import HeroHomeSection from "@/components/HeroHomeSection";
import HomeStepsSection from "@/components/HomeStepsSection";
import HomePricingSection from "@/components/HomePricingSection";
import HomeOurMessageSection from "@/components/HomeOurMessageSection";
import {getSession} from "@/auth";


export default async function Home() {

    const session = await getSession()
    console.log("session" , session)
    console.log("hi")
    return (

        <main>
            <p>{session.isLoggedIn}</p>
            <HeroHomeSection/>
            <HomeStepsSection/>
            <HomePricingSection/>
            <HomeOurMessageSection/>
        </main>

    );
}
