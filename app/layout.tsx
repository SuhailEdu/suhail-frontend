import type {GetServerSideProps, Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import AuthProvider from "@/providers/authProvider";
import {getSession} from "@/auth";
import useAuthStore from "@/stores/AuthStore";
import {Tajawal} from 'next/font/google'

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
        <body className={inter.className}>
        <ReactQueryProvider>
        <AuthProvider session={session}>

            <Navbar/>
                <main>
                    {children}
                </main>
                <Footer/>
        </AuthProvider>

            </ReactQueryProvider>
            {/*</QueryClientProvider>*/}
        </body>
        </html>
    );
}

