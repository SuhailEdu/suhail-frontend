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
import {FileIcon, HomeIcon, InfoIcon, PaperclipIcon, PenIcon} from "lucide-react";
import {z} from "zod";
import ReportsCards from "@/app/dashboard/tests/[testId]/ReportsCards";
import {useRouter, useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {useApi} from "@/hooks/useApi";
import {Exam, Question} from "@/types/exam";
import QuestionsTab from "@/app/dashboard/tests/[testId]/QuestionsTab";
import * as sea from "node:sea";
import StudentsTab from "@/app/dashboard/tests/[testId]/StudentsTab";

type ExamQueryData =  Exam & {
    questions: Question[]
}
type SelectedTap = 'students' | 'reports' | 'questions' | 'settings'

export default function ShowTest ({params}: {params:{testId: string}})  {
    const searchParams = useSearchParams()
    console.log(searchParams)
    const router = useRouter()
    const test = {
        title: 'اختبار عملي حاسوب',
    }
    const api = useApi()

    const testQuery = useQuery<ExamQueryData>({
        queryFn:  () => api.get(`/home/exams/${params.testId}`).then(res => res.data.data),
        queryKey: ["exams" , params.testId]
    });

    const [selectedOption, setSelectedOption] = useState<SelectedTap>(() => {
        const tab = searchParams.get('tab') ?? ""
        if( ['students' , 'reports' , 'questions' , 'settings'].includes(tab)) {
            // @ts-ignore
            return tab
        }
        return "questions"

    })

    function isSelected(option: string) {
        return option == selectedOption ? 'border-black' : 'border-none'
    }

    console.log(testQuery.data)

    return (
        <div>
            <Breadcrumb className="inline-block border p-2 rounded-lg  ">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link className=" cursor-pointer flex gap-3 items-bottom justify-between"
                                  href="/dashboard">
                                <span>
                                <HomeIcon size={'18'}/>
                                </span>
                                <span>
                                الرئيسية
                                </span>
                            </Link>
                        </BreadcrumbLink>

                        <BreadcrumbSeparator/>
                        <BreadcrumbLink asChild>
                            <div className=" flex gap-3 items-bottom justify-between">
                                <span>
                                <PaperclipIcon size={'18'}/>
                                </span>
                                <span>
                                {test.title}
                                </span>
                            </div>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {!testQuery.data ?<div>No data Found</div> :
                <>

            <div className="my-12 pr-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    <span>{testQuery.data.exam_title}</span>
                </h1>

                <div className="my-8 py-4">
                    <div className="my-8">
                        <div className='flex justify-start border-b-2 '>
                            <p onClick={() => setSelectedOption('reports')}
                               className={`border-b-2 ${isSelected('reports')} px-4 cursor-pointer`}>الاحصائيات</p>
                            <p onClick={() => setSelectedOption('questions')}
                               className={`border-b-2 ${isSelected('questions')} px-4 cursor-pointer`}>أسئلة
                                الاختبار</p>
                            <p onClick={() => setSelectedOption('students')}
                               className={`border-b-2 ${isSelected('students')} px-4 cursor-pointer`}>الطلاب</p>

                            <p onClick={() => setSelectedOption('settings')}
                               className={`border-b-2 ${isSelected('settings')} px-4 cursor-pointer`}>اعدادات
                                الاختبار</p>
                        </div>
                    </div>

                </div>

                <div>
                    {selectedOption === 'questions' && (
                        <QuestionsTab testId={params.testId} questions={testQuery.data.questions} />
                    )}

                    {selectedOption === 'reports' && (
                        <ReportsCards/>
                    )}

                    {selectedOption === 'students' && (
                        <StudentsTab testId={params.testId} />
                    )}

                </div>

            </div>
            </>

            }
        </div>
    )

}
