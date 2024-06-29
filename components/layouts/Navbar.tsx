'use client'
import {useEffect, useState} from 'react'
import {Navbar} from "flowbite-react";
import {Camera, CircleArrowLeft, Info, Menu} from 'lucide-react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import PrimaryButton from "@/components/shared/PrimaryButton";

interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: "/about",
        label: "عن المنصة",
    },
];
export default function LayoutNavbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])

    return mounted && (
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
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({href, label}: RouteProps) => (
                      <a
                          rel="noreferrer noopener"
                          key={label}
                          href={href}
                          onClick={() => setIsOpen(false)}
                          // className={buttonVariants({variant: "ghost"})}
                      >
                          {label}
                      </a>
                  ))}
                    <PrimaryButton href="/auth/register">انضم الينا</PrimaryButton>
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
                        <PrimaryButton href="/auth/register">انضم الينا</PrimaryButton>

                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    )
}
