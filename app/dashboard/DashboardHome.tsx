"use client"

import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,} from "@/components/ui/breadcrumb"
import Link from "next/link";
import {HomeIcon} from "lucide-react";
import {useState} from "react";
import MyExamsTab from "@/app/dashboard/MyExamsTab";
import ParticpatingExamsTab from "@/app/dashboard/ParticpatingExamsTab";
// import DashboardMenu from "@/";


export default  function  Dashboard() {
    const [selectedOption , setSelectedOption] = useState<'my' | 'others'>('my')

    function isSelected(option: string) {
        return option == selectedOption ? 'border-black' : 'border-none'
    }


    return (
        <div>
            <Breadcrumb className="inline-block border p-2 rounded-lg  " >
                <BreadcrumbList >
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild={true}>
                            <Link  className=" flex gap-3 items-bottom justify-between" href="/dashboard">
                                <span>
                                <HomeIcon size={'18'}/>
                                </span>
                                <span>
                                الرئيسية
                                </span>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="my-12 pr-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">لوحة التحكم</h1>

                <div className="my-8">
                    <div className='flex justify-start border-b-2 '>
                        <p onClick={() => setSelectedOption('others')}
                           className={`border-b-2 ${isSelected('others')} px-4 cursor-pointer`}>اختبارات الاخرين</p>
                        <p onClick={() => setSelectedOption('my')}
                           className={`border-b-2 ${isSelected('my')} px-4 cursor-pointer`}>اختباراتك</p>
                    </div>
                </div>

                {selectedOption == 'my' && (
                    <MyExamsTab />
                )}

                {selectedOption == 'others' && (
                    <ParticpatingExamsTab />
                )}

            </div>
        </div>
    )
}
