"use client"
import React, {useState} from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import {HomeIcon, LucideFileQuestion, PaperclipIcon, SettingsIcon} from "lucide-react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useApi} from "@/hooks/useApi";
import {Exam} from "@/types/exam";
import TestSkeleton from "@/app/dashboard/tests/[testId]/TestSkeleton";
import CustomBadge from "@/components/CustomBadge";
import {getExamLiveStatus, getExamLiveStatusBadge} from "@/helpers/liveTestHelper";
import QuestionsTab from "@/app/dashboard/tests/[testId]/QuestionsTab";
import ReportsCards from "@/app/dashboard/tests/[testId]/ReportsCards";
import StudentsTab from "@/app/dashboard/tests/[testId]/StudentsTab";
import {IoMdPeople} from "react-icons/io";

type ExamQueryData =  Exam & {
    is_my_exam: boolean
}
type SelectedTap = 'students' | 'reports' | 'questions' | 'settings'
type UpdatedExamProps = {
    exam_title:string,
    status:string,
    ip_range_start:string,
    ip_range_end:string,
}

export default function ShowTest ({params}: {params:{testId: string}})  {
    const api = useApi()

    const queryClient = useQueryClient()

    const testQuery = useQuery<ExamQueryData>({
        queryFn:  () => api.get(`/home/exams/${params.testId}`).then(res => res.data.data),
        queryKey: ["exams" , params.testId]
    });

    const [selectedOption, setSelectedOption] = useState<SelectedTap>('reports')

    console.log("here is test qeury" , testQuery.data)

    function isSelected(option: string) {
        return option == selectedOption ? 'border-black' : 'border-none'
    }

    function updateExam(newData :UpdatedExamProps) :void {
        queryClient.setQueryData(["exams" , params.testId] , () => {
            let data = testQuery.data
            if(!data) {
                return {
                }
            }
            return {
                ...data,
                exam_title:newData.exam_title,
                status:newData.status,
                ip_range_start:newData.ip_range_start,
                ip_range_end:newData.ip_range_end,
            }
        })


    }


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
                                {testQuery.data?.exam_title ?? ""}
                                </span>
                            </div>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {testQuery.status == "success" &&  testQuery.data &&
                <>

            <div className="my-12 pr-4">
                <div className="scroll-m-20 flex justify-start gap-4 items-center  text-4xl font- tracking-tight lg:text-5xl">
                    <span>{testQuery.data.exam_title}</span>
                    <span className={""}>
                        <CustomBadge type={getExamLiveStatusBadge(testQuery.data.live_status)}>
                            <span>{getExamLiveStatus(testQuery.data.live_status)}. </span>
                            {testQuery.data.live_status != 'finished' && (
                                <Link href={testQuery.data.is_my_exam ? `/dashboard/tests/${testQuery.data.id}/live/manage` : `/dashboard/tests/${testQuery.data.id}/live`}
                                      className={"underline cursor-pointer mr-2"}>الانتقال الى لوحة التحكم</Link>

                            )}
                        </CustomBadge>
                    </span>
                </div>

                {/*"translate-x-0": selectedOption === "reports",*/}
                {/*"translate-x-full": selectedOption === "questions",*/}
                {/*"translate-x-200": selectedOption === "students",                                   })  }>الاحصائيات</p>*/}

                <div className="my-8 py-4">
                    <div className="my-8">
                        <div className='flex justify-start border-b-2 '>
                            <p onClick={() => setSelectedOption('reports')}
                               className={`border-b-2 ${isSelected("reports")}  px-4 cursor-pointer`}>
                                <span><SettingsIcon className={"inline-block ml-2"}/></span>
                                <span>الاحصائيات</span>
                                </p>

                            <p onClick={() => setSelectedOption('questions')}
                               className={`border-b-2 ${isSelected('questions')} px-4 cursor-pointer`}>

                                <span><LucideFileQuestion className={"inline-block ml-2"}/></span>
                                <span>
                                أسئلة
                                الاختبار
</span>
                            </p>

                            {testQuery.data.is_my_exam && (
                                <p onClick={() => setSelectedOption('students')}
                                   className={`border-b-2 ${isSelected('students')} px-4 cursor-pointer`}>

                                    <span><IoMdPeople className={"inline-block ml-2"}/></span>
                                    <span>الطلاب</span>
                                </p>

                            )}
                        </div>
                    </div>

                </div>

                <div>
                {selectedOption === 'questions' && (
                        <QuestionsTab isMyExam={testQuery.data.is_my_exam} testId={params.testId} />
                    )}
                    {selectedOption === 'reports' && (

                        <ReportsCards updateExam={updateExam} exam={testQuery.data}/>
                    )}

                    {selectedOption === 'students' && (
                        <StudentsTab  testId={params.testId} />
                    )}

                </div>

            </div>
            </>

            }
            {testQuery.isLoading && (
                <div className={"mt-8"}>
                <TestSkeleton />
                </div>
            )}

        </div>
    )

}
