import type {Metadata} from "next";
import {Inter, Tajawal} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import React from "react";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import AuthProvider from "@/providers/authProvider";
import {getSession} from "@/auth";
import {Toaster} from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Suhail App",
    description: "Suhail App",
    
};
// const queryClient = new QueryClient()


const tajwalFont = Tajawal({
    // weight: ['200' , '300' ,'400' , '500' , '600' , '700' , '800' , '900'],
    weight: ['200' , '300' ,'400' , '500' ,  '700' , '800' , '900'],
    // weight: '200',
    subsets: ['arabic']
})

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession()

    return (
        <html className={tajwalFont.className} dir="rtl" lang="ar">
            <body>
            <ReactQueryProvider>
                <AuthProvider session={JSON.stringify(session)}>

                    <div className={`h-screen `}>

                        <Navbar/>
                        <NextTopLoader
                            color="#2299DD"
                            initialPosition={0.08}
                            crawlSpeed={200}
                            height={3}
                            crawl={true}
                            showSpinner={true}
                            easing="ease"
                            speed={200}
                            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                        />
                        <main>
                            {children}
                        </main>
                        <Toaster/>
                        <Footer/>
                    </div>
                </AuthProvider>

            </ReactQueryProvider>
            {/*</QueryClientProvider>*/}
            </body>
        </html>
);
}

