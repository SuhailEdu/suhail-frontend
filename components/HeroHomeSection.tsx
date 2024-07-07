import PrimaryButton from "@/components/shared/PrimaryButton";
import RandomElement from '@/public/images/svg/RandomElement.svg'
import OrangeElement from '@/public/images/svg/OrangeElement.svg'
import Image from "next/image";
import Link from "next/link";
import {ChevronLeftIcon} from "lucide-react";

export default function HeroHomeSection ()  {

    return (
        <section className="bg-white flex items-center h-screen dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl relative  lg:py-16 lg:px-12">

                <div className="hidden z-0 md:block absolute top-0 right-0 -translate-y-12 translate-x-20">
                    <Image className="w-28 h-auto " alt={""} src={OrangeElement}/>
                </div>

                <div className="flex justify-center mb-8">

                    <div
                        className="inline-flex justify-between  items-center py-1  pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                        role="alert">
                        <span
                            className="text-sm bg-primary  rounded-full text-white px-4 py-1.5 ml-2 ">انطلقنا</span>
                        <ChevronLeftIcon />
                        <span
                            className="ml-2 text-md font-medium">منصة سهيل انطلقت ! أنشئ حسابك</span>

                    </div>
                </div>

                <h1 className="mb-4 relative z-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">منصة
                    سهيل: اختبارات إلكترونية بلمسة إبداع</h1>
                <p className="mb-8 text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">صمم
                    اختبارات إلكترونية مخصصة تناسب احتياجاتك مع منصة سهيل سهلة الاستخدام</p>
                <div
                    className="flex relative z-10  gap-4  mb-8 lg:mb-16  justify-between sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <PrimaryButton>
                        <Link href={'auth/login'}>

                    <span className="my-auto text-xl">
                    تسجيل الدخول
                    </span>
                        </Link>
                    </PrimaryButton>
                    <PrimaryButton className={"bg-white border-primary border-2 text-primary"}>
                        <Link href={'auth/register'}>

                    <span className="my-auto text-xl">
                    انشاء حساب
                    </span>
                        </Link>
                    </PrimaryButton>

                </div>
                <div className="hidden md:block absolute bottom-0 left-0 -translate-y-12 translate-x-20">
                    <Image className="w-60 h-auto " alt={""} src={RandomElement}/>
                </div>

            </div>
        </section>
    )
}
