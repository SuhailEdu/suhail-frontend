'use client'
import {useEffect, useState} from 'react'
import {Navbar} from "flowbite-react";
import {Camera, CircleArrowLeft, Info, Menu} from 'lucide-react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import PrimaryButton from "@/components/shared/PrimaryButton";
import MobileNavbar from "@/components/MobileNavbar";
import {signIn} from "next-auth/react";

const routeList: RouteProps[] = [
    {
        href: "/about",
        label: "عن المنصة",
    },
];

interface RouteProps {
    href: string;
    label: string;
}

export default function LayoutNavbar() {


    return (
        <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container h-14 px-4 w-screen flex flex-row-reverse justify-between ">
                    <NavigationMenuItem className="font-bold flex">
                        <a
                            rel="noreferrer noopener"
                            href="/"
                            className="ml-2 font-bold text-xl flex"
                        >
                            {/*<LogoIcon/>*/}
                            سهيل
                        </a>
                    </NavigationMenuItem>

                    {/* mobile */}
                    <span className="flex md:hidden">
                        <MobileNavbar routeList={routeList}/>


          </span>

                    {/* desktop */}
                    <nav className="hidden md:flex gap-2">
                        {routeList.map((route: RouteProps, i) => (
                            <a
                                rel="noreferrer noopener"
                                href={route.href}
                                key={i}
                                className={`text-[17px] `}
                            >
                                {route.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:flex gap-2">
                        <PrimaryButton onClick={() => signIn()}>انضم الينا</PrimaryButton>

                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    )
}
