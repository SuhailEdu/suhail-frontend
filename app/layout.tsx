import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Suhail App",
    description: "Suhail App",
};
// const queryClient = new QueryClient()
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {/*<QueryClientProvider client={queryClient}>*/}
        <Navbar/>
        <ReactQueryProvider>

            <main>
                {children}
            </main>

            <Footer/>

        </ReactQueryProvider>
        {/*</QueryClientProvider>*/}
        </body>
        </html>
    );
}
