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
        <body >
        <ReactQueryProvider>
        <AuthProvider session={session}>

            <div className={`h-screen `}>

            <Navbar/>
                <main>
                    {children}
                </main>
                <Toaster />
                <Footer />
            </div>
        </AuthProvider>

            </ReactQueryProvider>
            {/*</QueryClientProvider>*/}
        </body>
        </html>
    );
}

