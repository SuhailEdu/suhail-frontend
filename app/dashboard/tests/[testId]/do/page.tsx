"use client"
import React, {useRef, useState} from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import {
    ArrowBigLeft,
    ArrowBigRight,
    FileIcon,
    HomeIcon,
    InfoIcon,
    LoaderIcon,
    MinusIcon,
    PaperclipIcon,
    PenIcon
} from "lucide-react";
import TestInfoStep from "@/app/dashboard/tests/new/TestInfoStep";
import QuestionsStep from "@/app/dashboard/tests/new/QuestionsStep";
import InviteStep from "@/app/dashboard/tests/new/InviteStep";
import TestCreatedStep from "@/app/dashboard/tests/new/TestCreatedStep";
import PrimaryButton from "@/components/shared/PrimaryButton";
import {useApi} from "@/hooks/useApi";
import {useMutation} from "@tanstack/react-query";
import CustomTextInput from "@/components/shared/CustomTextInput";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {CiMenuBurger} from "react-icons/ci";

interface QuestionType {
    title: string,
    id: number,
    options: QuestionOptionType[]
}

interface QuestionOptionType {
    id: number,
    title: string
    isCorrect: boolean
}

interface Option {
    readonly label: string;
    readonly value: string;
}

export default function New() {

    const api = useApi()

    const [isSidebarOpen , setIsSidebarOpen] = useState<boolean>(true)


    return (
        <div className={"container"}>
            <Breadcrumb className="inline-block border p-2 rounded-lg  ">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link  className=" flex gap-3 items-bottom justify-between" href="/dashboard">
                                <span>
                                <HomeIcon size={'18'}/>
                                </span>
                                <span>
                                الرئيسية
                                </span>
                            </Link>
                        </BreadcrumbLink>
                        <span>

                        <BreadcrumbSeparator/>

                        </span>

                        <BreadcrumbLink asChild>
                            <Link  className=" flex gap-3  items-bottom justify-between" href="/dashboard">
                                <span>
                                <PenIcon size={'18'}/>
                                </span>
                                <span>
                                اختبار جديد
                                </span>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div>

            <div className="my-12 pr-4 flex justify-between">
                <h1 className="scroll-m-20 text-4xl font- tracking-tight lg:text-5xl">
                    <span>المشاركة في الاختبار</span>
                </h1>
                <PrimaryButton color={'base'} onClick={() => setIsSidebarOpen(true)} className={"flex justify-between gap-2 items-center text-xl cursor-pointer"}>
                    <span><CiMenuBurger/></span>
                    <span>الأسئلة</span>
                </PrimaryButton>

            </div>
                <div className="mt-20">
                    <div className={"text-2xl text-center"}>كيف حالك في يوم الاربعاء?</div>
                    <div key={1} className="flex items-center justify-center mt-16">
                        <input
                            checked={true} id="default-radio-2" type="radio" value=""
                            name="default-radio"
                            className="w-4 h-4 focus:bg-red-500 text-red-500  "/>
                        <label htmlFor="default-radio-2"
                               className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Kjdkfjdk
                        </label>

                    </div>

                    <div className={"mt-16 flex justify-center gap-12 items-center"}>
                        <ArrowBigRight size={'29'}/>
                        <span>12 / 20</span>
                        <ArrowBigLeft size={'29'}/>

                    </div>
                </div>
            </div>
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetContent side={"left"} dir={"rtl"}>
                    <SheetHeader dir={"rtl"}>
                        <SheetTitle className={"text-right"}>قائمة الأسئلة</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                        <div className={"border rounded-lg p-2 text-right   hover:bg-slate-50 cursor-pointer my-2"}>
                            <div className="flex items-center justify-start gap-2">

                            <span><PaperclipIcon size={18} /></span>
                            <span>
                           كيف تأكل يوم الخميس اذا؟

                            </span>
                            </div>
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </div>
    )

}
