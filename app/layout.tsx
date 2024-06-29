import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Suhail App",
    description: "Suhail App",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Navbar/>

        <main id="root">
            {children}
        </main>

        <Footer/>
        </body>
        </html>
    );
}
