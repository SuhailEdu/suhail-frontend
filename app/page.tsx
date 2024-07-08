import HeroHomeSection from "@/components/HeroHomeSection";
import HomeStepsSection from "@/components/HomeStepsSection";
import HomePricingSection from "@/components/HomePricingSection";
import HomeOurMessageSection from "@/components/HomeOurMessageSection";
import {getSession} from "@/auth";
import NewHero from "@/app/NewHero";
import Features from "@/app/Features";
import Stats from "@/app/Stats";
import GetStartedNow from "@/app/GetStartedNow";
import LatestArticles from "@/app/LatestArticles";


export default async function Home() {

    return (

        <main className={"overflow-x-hidden"}>
            <NewHero />
            <Features />
            <Stats />
            <GetStartedNow />
            <LatestArticles />
            {/*<HeroHomeSection/>*/}
            {/*<HomeStepsSection/>*/}
            {/*<HomePricingSection/>*/}
            {/*<HomeOurMessageSection/>*/}
        </main>

    );
}
