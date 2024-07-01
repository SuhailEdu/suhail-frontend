"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import {HomeIcon, LoaderIcon} from "lucide-react";
import DashboardMenu from "@/components/DashboardMenu";
import ExamCard from "@/components/ExamCard";
import {useApi} from "@/hooks/useApi";
import {useEffect} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Exam} from "@/types/exam";
// import DashboardMenu from "@/";


export default  function  Dashboard({id}: {id: string}) {
    // const user = useAuthStore(state => state.user);
    // console.log(user.isLoggedIn)

    const api = useApi()

    const query = useQuery<Exam[]>({
        queryFn: () => api.get("/home/exams").then((res) => res.data.data),
        queryKey: ["exams"]
    })

    console.log(query.data)

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

               <DashboardMenu />

                <div className="my-8">
                    {query.isLoading ? <div className="flex justify-center items-center">
                        <LoaderIcon  className="animate-spin"  />


                        </div> :

                    <div className="grid gap-4  grid-cols-1 md:grid-cols-3  xl:grid-cols-4">
                        {query.data && query.data?.length > 0 && query.data.map(exam => (
                            <ExamCard exam={exam} key={exam.id}/>
                        ))}
                        <div
                            className="rounded-lg hover:bg-gray-100 cursor-pointer border bg-card text-card-foreground shadow-sm p-6  ">
                            <Link href="/dashboard/tests/new" className="text-center min-h-20 flex items-center justify-center leading-9 text-xl">
                                +
                                اختبار جديد
                            </Link>
                        </div>

                    </div>

                    }
                </div>

            </div>
        </div>
    )
}
