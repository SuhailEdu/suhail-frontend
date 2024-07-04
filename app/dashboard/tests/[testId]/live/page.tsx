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
import {ArrowBigLeft, ArrowBigRight, HomeIcon, PaperclipIcon, PenIcon} from "lucide-react";
import PrimaryButton from "@/components/shared/PrimaryButton";
import {useApi} from "@/hooks/useApi";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Sheet, SheetContent, SheetHeader, SheetTitle,} from "@/components/ui/sheet"
import {CiMenuBurger} from "react-icons/ci";
import CustomBadge from "@/components/CustomBadge";
import {getExamLiveStatus, getExamLiveStatusBadge} from "@/helpers/liveTestHelper";
import useWebSocket, {ReadyState} from "react-use-websocket";
import useAuthStore from "@/stores/AuthStore";

interface LiveQuestionResponse {
    id: number,
    title: string,
    type: 'options' | 'yesOrNo',
    exam_id: string,
    created_at: string,
    updated_at: string,
    options:string[]

}
interface LiveExamResponse {
    exam: {
        id: string,
        user_id: string,
        exam_title: string,
        status: string,
        live_status: 'live' | 'paused' | 'finished' | '',
        created_at: string,
        updated_at: string,
    },
    questions: LiveQuestionResponse[]
}

interface Answer{
    id: number,
    answer: string
}


export default function New({params} : {params:{testId: string}}) {

    const api = useApi()
    const user = useAuthStore(state => state.user)

    const testId = params.testId
    const queryClient = useQueryClient()

    const questionsQuery = useQuery<LiveExamResponse>({
        queryFn: () => api.get(`/home/exams/${testId}/live`).then(res => res.data.data),
        queryKey: ['exams' , testId , 'live']
    })

    const { sendMessage, lastMessage, readyState }
        = useWebSocket(`http://localhost:4000/ws/live/${testId}` , {
            protocols: [ user.token ?? "" ],
        onError(e) {
            console.log("error", e);

        },
        // retryOnError:false,
        reconnectInterval: 10,
    });

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    // console.log(lastMessage)

    useEffect(() => {
        if(lastMessage?.data) {
            const data = JSON.parse(lastMessage.data)
            switch (data.type) {
                case "LIVE_EXAM_STATUS_UPDATED":
                    liveExamStatusUpdated(data.payload.status)
            }

        }

    }, [lastMessage , readyState]);

    function liveExamStatusUpdated(status:"paused" | "finished" | 'live') {
        queryClient.setQueryData(['exams' , testId , 'live'] , () => {
            let data = questionsQuery.data
            if(data) {
                data.exam.live_status = status
            }
            return data
        })
    }


    const [answers , setAnswers] = useState<Answer[]>([])


    const [isSidebarOpen , setIsSidebarOpen] = useState<boolean>(false)
    const [selectedQuestion , setSelectedQuestion] = useState<LiveQuestionResponse | null>(null)

    useEffect(() => {
        if(questionsQuery.data && questionsQuery.data.questions.length> 0) {
            setSelectedQuestion(questionsQuery.data.questions[0])
        }

    }, []);


    function selectedOptionNumber():number {
        if(questionsQuery.data && questionsQuery.data.questions.length > 0 && selectedQuestion) {
            const questionIndex = questionsQuery.data.questions.findIndex(q => q.id == selectedQuestion.id)
            return questionIndex  == -1 ? 1 : questionIndex + 1
        }
        return 0

    }

    function selectNextQuestion() {
        // sendMessage("hi man " , true)
        if(questionsQuery.data && questionsQuery.data.questions.length > 0 && selectedQuestion) {
            const questionIndex = questionsQuery.data.questions.findIndex(q => q.id == selectedQuestion.id)
            if(questionIndex > -1 && questionsQuery.data.questions[questionIndex + 1]) {
                 setSelectedQuestion(questionsQuery.data.questions[questionIndex + 1])
                return

            }
            setSelectedQuestion(questionsQuery.data.questions[0])
        }

    }

    function selectPreviousQuestion() {
        if(questionsQuery.data && questionsQuery.data.questions.length > 0 && selectedQuestion) {
            const questionIndex = questionsQuery.data.questions.findIndex(q => q.id == selectedQuestion.id)
            if(questionIndex > -1 && questionsQuery.data.questions[questionIndex  - 1]) {
                setSelectedQuestion(questionsQuery.data.questions[questionIndex - 1])
                return

            }
            setSelectedQuestion(questionsQuery.data.questions[0])
        }

    }
    function updateSubmittedAnswer(newAnswer:string) {
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



    async function handleAnswerChange(newAnswer:string) {
        if(!selectedQuestion || !questionsQuery.data ) {
            return
        }
        try {
            const res = await api.post(`/home/exams/${questionsQuery.data.exam.id}/live/store-answer`, {
                question_id: selectedQuestion.id,
                answer: newAnswer
            })
            updateSubmittedAnswer(newAnswer)

        } catch (e) {
            console.error(e)

        }



    }

    return (
        <div className={"container"}>
            {questionsQuery.data && (
                <>

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
                                {questionsQuery.data.exam.exam_title}
                                </span>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div>

            <div className="my-12 pr-4 flex justify-between">
                <div className="scroll-m-20 flex justify-between gap-4 items-center  text-4xl font- tracking-tight lg:text-5xl">
                    <span>{questionsQuery.data.exam.exam_title}</span>

                    <span className={""}>
                        <CustomBadge className={""} type={getExamLiveStatusBadge(questionsQuery.data.exam.live_status)}>
                            <span>{getExamLiveStatus(questionsQuery.data.exam.live_status)}</span>
                        </CustomBadge>
                    </span>
                </div>
                <PrimaryButton color={'base'} onClick={() => setIsSidebarOpen(true)}
                               className={"flex justify-between gap-2 items-center text-xl cursor-pointer"}>
                    <span><CiMenuBurger/></span>
                    <span>عرض الأسئلة</span>
                </PrimaryButton>

            </div>
                {selectedQuestion !== null ? (

                <div className="mt-20">
                    <div className={"text-2xl text-center"}>{selectedQuestion.title}</div>
                    <div className={"flex justify-center gap-12 items-center"}>

                    {selectedQuestion.options.map(option => (

                    <div key={option} className="flex items-center justify-center mt-16 ">
                        <input
                            id={option}
                            checked={!!answers.find(a => a.id == selectedQuestion.id && a.answer == option )}  type="radio"
                            onChange={() => handleAnswerChange(option)}

                            name={`question-radio-${selectedQuestion.id}`}
                            className="w-4 h-4 focus:bg-red-500 text-red-500 cursor-pointer "/>
                        <label
                               htmlFor={option}
                               className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                            {option}
                        </label>

                    </div>
                    ))}

                    </div>

                    <div className={"mt-16 flex justify-center gap-12 items-center"}>
                        <ArrowBigRight onClick={selectPreviousQuestion} className={"cursor-pointer"} size={'29'}/>
                        <span>{selectedOptionNumber()} / {questionsQuery.data?.questions.length}</span>
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
                        {questionsQuery.data && questionsQuery.data?.questions.length > 0 ? (

                        <div className={"mt-4"}>
                            {questionsQuery.data.questions.map(question => (

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
    </>
)}

        </div>
    )

}
