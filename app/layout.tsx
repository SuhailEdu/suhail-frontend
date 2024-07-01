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

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Suhail App",
    description: "Suhail App",
};
// const queryClient = new QueryClient()



export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession()
    console.log("session", session)
    if(session.isLoggedIn) {


    }
    return (
        <html dir="rtl" lang="ar">
        <body className={inter.className}>
        <AuthProvider session={session}>

            <Navbar/>
            <ReactQueryProvider>
                <main>
                    {children}
                </main>
                <Footer/>

            </ReactQueryProvider>
            {/*</QueryClientProvider>*/}
        </AuthProvider>
        </body>
        </html>
    );
}

