"use client"
import React, {useEffect, useState} from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import {
    ArrowBigLeft,
    ArrowBigRight,
    HomeIcon,
    PaperclipIcon,
    PauseIcon,
    PenIcon,
    SettingsIcon,
    StopCircle
} from "lucide-react";
import PrimaryButton from "@/components/shared/PrimaryButton";
import {useApi} from "@/hooks/useApi";
import {useQuery} from "@tanstack/react-query";
import {Sheet, SheetContent, SheetHeader, SheetTitle,} from "@/components/ui/sheet"
import {CiMenuBurger} from "react-icons/ci";
import StudentsList from "@/app/dashboard/tests/[testId]/live/manage/StudentsList";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface LiveQuestionResponse {
    id: number,
    title: string,
    type: 'options' | 'yesOrNo',
    exam_id: string,
    created_at: string,
    updated_at: string,
    options:Option[]
}
interface Option {
    option: string,
    is_correct: boolean,

}
interface Answer{
    id: number,
    answer: string
}


export default function New({params} : {params:{testId: string}}) {

    const api = useApi()

    const testId = params.testId

    const questionsQuery = useQuery<LiveQuestionResponse[]>({
        queryFn: () => api.get(`/home/exams/${testId}/live/manage/questions`).then(res => res.data.data),
        queryKey: ['exams' , testId , 'live']
    })

    const [answers , setAnswers] = useState<Answer[]>([])


    const [isSidebarOpen , setIsSidebarOpen] = useState<boolean>(false)
    const [selectedQuestion , setSelectedQuestion] = useState<LiveQuestionResponse | null>(null)

    useEffect(() => {
        if(questionsQuery.data && questionsQuery.data.length> 0) {
            setSelectedQuestion(questionsQuery.data[0])
        }

    }, []);


    function selectedOptionNumber():number {
        if(questionsQuery.data && questionsQuery.data.length > 0 && selectedQuestion) {
            const questionIndex = questionsQuery.data.findIndex(q => q.id == selectedQuestion.id)
            return questionIndex  == -1 ? 1 : questionIndex + 1
        }
        return 0

    }

    function selectNextQuestion() {
        if(questionsQuery.data && questionsQuery.data.length > 0 && selectedQuestion) {
            const questionIndex = questionsQuery.data.findIndex(q => q.id == selectedQuestion.id)
            if(questionIndex > -1 && questionsQuery.data[questionIndex + 1]) {
                 setSelectedQuestion(questionsQuery.data[questionIndex + 1])
                return

            }
            setSelectedQuestion(questionsQuery.data[0])
        }

    }

    function selectPreviousQuestion() {
        if(questionsQuery.data && questionsQuery.data.length > 0 && selectedQuestion) {
            const questionIndex = questionsQuery.data.findIndex(q => q.id == selectedQuestion.id)
            if(questionIndex > -1 && questionsQuery.data[questionIndex  - 1]) {
                setSelectedQuestion(questionsQuery.data[questionIndex - 1])
                return

            }
            setSelectedQuestion(questionsQuery.data[0])
        }

    }


    function handleAnswerChange(newAnswer:string) {
        if(!selectedQuestion) {
            return
        }

        setAnswers(preAnswers => {
            if(!preAnswers.find(a => a.id == selectedQuestion.id )) {
                return [
                    ...preAnswers,
                    {
                        id: selectedQuestion.id,
                        answer: newAnswer
                    }
                ]

            }



            return preAnswers.map(a => {
                console.log(newAnswer , a)
                if(a.id == selectedQuestion.id) {
                    return {
                        ...a,
                        answer:newAnswer
                    }
                }
                return a


            })


        })

    }

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
                    <span>ادارة الاختبار</span>
                </h1>

                                <PrimaryButton color={'base'} onClick={() => setIsSidebarOpen(true)} className={"flex justify-between gap-2 items-center text-xl cursor-pointer"}>
                    <span><CiMenuBurger/></span>
                    <span>عرض الأسئلة</span>
                </PrimaryButton>
                <DropdownMenu dir={"rtl"}>
                    <DropdownMenuTrigger>
                        <PrimaryButton className={"flex justify-between items-center gap-2"}>

                            <SettingsIcon size={'16'}/>
                            <span>الاعدادات</span>
                        </PrimaryButton>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={"px-2 "}>
                        <DropdownMenuLabel>الخيارات</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className={"mb-1 cursor-pointer"}>
                            <div className={"text-black  flex items-center gap-1"}>
                                <span><PauseIcon size={'18'}/></span>
                                <span>ايقاف الاختبار مؤقتا</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className={"mb-1 cursor-pointer"}>

                            <div className={"text-red-500 hover:text-red-500 flex items-center gap-1"}>
                                <span><StopCircle size={'18'}/></span>
                                <span>انهاء الاختبار</span>
                            </div>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
                {selectedQuestion !== null ? (

                    <div className="mt-20">
                        <div className={"text-2xl text-center"}>{selectedQuestion.title}</div>
                        <div className={"flex justify-center gap-12 items-center"}>

                    {selectedQuestion.options.map((option , index) => (

                    <div key={option.option} className="flex items-center justify-center mt-16 ">
                        <label
                               htmlFor={option.option}
                               className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">
                            {index+1} - {option.option}
                        </label>

                    </div>
                    ))}

                    </div>

                    <div className={"mt-16 flex justify-center gap-12 items-center"}>
                        <ArrowBigRight onClick={selectPreviousQuestion} className={"cursor-pointer"} size={'29'}/>
                        <span>{selectedOptionNumber()} / {questionsQuery.data?.length}</span>
                        <ArrowBigLeft onClick={selectNextQuestion} className={"cursor-pointer"} size={'29'}/>

                    </div>
                </div>

                ): (
                    <div>Noo</div>
                )}
            </div>
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetContent side={"left"} dir={"rtl"}>
                    <SheetHeader dir={"rtl"}>
                        <SheetTitle className={"text-right"}>قائمة الأسئلة</SheetTitle>
                        {questionsQuery.data && questionsQuery.data?.length > 0 ? (

                        <div className={"mt-4"}>
                            {questionsQuery.data.map(question => (

                        <div onClick={() => {
                            setSelectedQuestion(question)
                            setIsSidebarOpen(false)
                        }} key={question.id} className={`border rounded-lg p-2 text-right ${question.id == selectedQuestion?.id && 'bg-slate-100' }
                          hover:bg-slate-100 cursor-pointer my-2`}>
                            <div className="flex items-center justify-start gap-2">

                            <span><PaperclipIcon size={18} /></span>
                            <span>
                           {question.title}

                            </span>
                            </div>
                        </div>

                            ))}
                        </div>

                        ) : (
                           <div>No</div>
                            )}
                    </SheetHeader>
                </SheetContent>
            </Sheet>

            <div className={"mt-16"}>
                <StudentsList testId={testId} />

            </div>

        </div>
    )

}
