'use client'
import PrimaryButton from "@/components/shared/PrimaryButton";
import React, {useEffect, useState} from "react";

import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import useAuthStore from "@/stores/AuthStore";
import LogOutButton from "@/components/layouts/LogUserOUt";
import Link from "next/link";

interface RouteProps {
    href: string;
    label: string;
}

interface RouteProps {
    routeList: RouteProps[];

}

export default function  MobileNavbar({routeList}: RouteProps)  {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])

    const isLoggedIn = useAuthStore(state => state.user.isLoggedIn)
    return mounted && (
        <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <SheetTrigger className="px-2">
                <Menu
                    className="flex md:hidden h-5 w-5"
                    onClick={() => setIsOpen(true)}
                >
                    <span className="sr-only">Menu Icon</span>
                </Menu>
            </SheetTrigger>

            <SheetContent side={"left"}>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                    {isLoggedIn && routeList.map(({href, label}: RouteProps) => (
                        <Link
                            key={label}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            // className={buttonVariants({variant: "ghost"})}
                        >
                            {label}
                        </Link>
                    ))}
                    {isLoggedIn ? (
                        <LogOutButton  />
                    ): (
                        <PrimaryButton prefetch={false} href={'/auth/login'}>انضم الينا</PrimaryButton>
                    )}
                    {/*<a
                        rel="noreferrer noopener"
                        href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                        target="_blank"
                        className={`w-[110px] border `}
                    >
                    <GitHubLogoIcon className="mr-2 w-5 h-5"/>
                    Github
                  </a>*/}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
