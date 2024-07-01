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
import {FileIcon, HomeIcon, InfoIcon, LoaderIcon, PenIcon} from "lucide-react";
import TestInfoStep from "@/components/TestInfoStep";
import QuestionsStep from "@/components/QuestionsStep";
import InviteStep from "@/components/InviteStep";
import TestCreatedStep from "@/components/TestCreatedStep";
import PrimaryButton from "@/components/shared/PrimaryButton";
import {useApi} from "@/hooks/useApi";
import {useMutation} from "@tanstack/react-query";
import {setActTimeout} from "@tanstack/react-query/src/__tests__/utils";
// import TestInfoStep from "../../../Shared/Components/CreateTest/TestInfoStep";
// import QuestionsStep from "../../../Shared/Components/CreateTest/QuestionsStep";
// import InviteStep from "../../../Shared/Components/CreateTest/InviteStep";

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

    const [step, setStep] = useState<'info' | 'questions' | 'invite' | 'testCreated'>('info')

    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false)

    const [testInfoData, setTestInfoData] = useState<{
        title: string
        type: 'public' | 'private'
    }>({
        title: '',
        type: 'public',
    })


    const [studentsEmails, setStudentsEmails] = React.useState<readonly Option[]>([]);


    const [tooltipMessage, setTooltipMessage] = useState<{
        id: number
        message: string
    }[]>([])


    const questionStepRef = useRef()
    const testInfoStepRef = useRef()
    const inviteStepRef = useRef()

    const [stepButtonsLoading, setStepButtonsLoading] = useState(false)
    const [createdExam, setCreatedExam] = useState<object>({})

    const [serverValidationError , setServerValidationError] = useState<{
        errorBelongsTo: "questions" | "testInfo",
        error : object
    } | null>(null)

    const mutation = useMutation({
        mutationFn: handleSubmitExam,
        onMutate: () => {
            setTooltipMessage([])
            setServerValidationError(null)
            setStepButtonsLoading(true)
        },
        onSettled: () => {
            setStepButtonsLoading(false)
        },
        onError: (e) => {
            if(e?.response.status === 422 && e?.response?.data?.validationError) {
                const validationError = e?.response?.data?.validationError
                console.log(validationError)
                if(validationError && validationError.questions) {
                    setServerValidationError({
                        errorBelongsTo: "questions",
                        error: validationError.questions
                    })
                }
            }
        },
        onSuccess: (s) =>  {
            setCreatedExam(s.data.data)
            setStep("invite")
        },
    })


    const invitationMutation = useMutation({
        mutationFn: inviteExamParticipants,
        onSettled: () => {
            setStepButtonsLoading(false)
        },
        onError: (e) => {
            if(e?.response.status === 422 && e?.response?.data?.validationError) {
                const validationError = e?.response?.data?.validationError
                if(validationError && validationError.emails && validationError.emails.length > 0 ) {
                    setInvitationEmailsError(validationError.emails)
                }
            }
        },
        onSuccess: (s) =>  setStep("testCreated"),
    })

    const [questions, setQuestions] = useState<QuestionType[]>([
        {
            title: 'ما لون السمك في الماء',
            id: Math.random(),
            options: [
                {
                    title: 'أحمر',
                    isCorrect: false,
                    id: Math.random(),
                },

                {
                    title: 'أزرق',
                    isCorrect: true,
                    id: Math.random(),
                },
            ]
        }

    ])
    const [invitationEmailsError, setInvitationEmailsError] = useState<string>("")


    async function handleNextStep() {

        setStepButtonsLoading(true)


        if (step == 'info') {
            const isReadyToSubmit = await testInfoStepRef.current?.isReadyToSubmit()


            if (isReadyToSubmit) {
                setStep('questions')
            }

        }

        if (step == 'questions') {
            const isReadyToSubmit = await questionStepRef.current?.isReadyToSubmit()

            if (isReadyToSubmit) {

                 mutation.mutate()
                // setStep('invite')
            }

        }

        if (step == 'invite') {
            console.log(studentsEmails.length  , studentsEmails)
            if(studentsEmails.length > 0) {
                invitationMutation.mutate()
            } {
                // setStep('testCreated')
            }

        }

        setStepButtonsLoading(false)

    }


    function handelPreviousStep() {

        if (step == 'info') {
            return
        }


        if (step == 'questions') {
            setStep('info')
        }


        if (step == 'invite') {
            setStep('questions')
        }

    }

    function getStepTitle() {
        if (step == 'info') {
            return 'اعدادات الاختبار'
        }

        if (step == 'questions') {
            return 'أسئلة الاختبار'
        }

        if (step == 'invite') {
            return 'دعوة الطلاب'
        }
        return 'test'
    }

    function handleChangeQuestions(questions) {
        setQuestions(questions)

    }

    async function handleSubmitExam() {
        const refinedQuestions = questions.map(q => {

            const options = q.options.map((option) => {
                return {
                    option : option.title,
                    is_correct: option.isCorrect
                }
            })

            return {
                type: "options",
                title:  q.title,
                options
            }

        })
            return  await api.post("/home/exams/create" , {
                exam_title: testInfoData.title,
                status: testInfoData.type,
                questions:refinedQuestions ,
            })

    }

    async function inviteExamParticipants() {
        const examId = createdExam?.id ?? ""
        console.log(createdExam)
        return  await api.post(`/home/exams/${examId}/invite` , {
            emails:studentsEmails.map(e => e.value) ,
        })

    }



    return (
        <div>
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
                            <Link  className=" flex gap-3 items-bottom justify-between" href="/dashboard">
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

            <div className="my-12 pr-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    <span>اختبار جديد  - </span>
                    <span>{getStepTitle()}</span>
                </h1>

                <div className="my-8 border rounded-lg p-12">

                    {step == 'info' &&
                        <TestInfoStep

                            ref={testInfoStepRef}
                            testData={testInfoData} setTestData={setTestInfoData} key={"info"}/>}

                    {step == 'questions' &&
                        <QuestionsStep
                            serverValidationError={serverValidationError && serverValidationError.errorBelongsTo == "questions" ? serverValidationError : null}
                            ref={questionStepRef}
                            tooltipMessage={tooltipMessage}
                            setTooltipMessage={setTooltipMessage}
                            questions={questions}
                            setQuestions={(questions) => handleChangeQuestions(questions) } key={"questions"}/>


                    }
                    {step == 'invite' &&
                        <InviteStep
                            validationError={invitationEmailsError ?? ""}
                            ref={inviteStepRef}
                            emails={studentsEmails} setEmails={setStudentsEmails} key={"questions"}
                            setNextButtonDisabled={setIsNextDisabled}/>}


                    {step == 'testCreated' &&
                        <TestCreatedStep
                        />}

                    <div className="flex flex-row-reverse  justify-between items-end">
                        {!['testCreated'].includes(step) && (
                            <
                                PrimaryButton disabled={(isNextDisabled && tooltipMessage.length == 0) || stepButtonsLoading}
                                              onClick={handleNextStep}
                                              className="my-2 text-end">
                                {stepButtonsLoading ? <LoaderIcon className={"animate-spin"}/> : <span>
                                التالي
                                </span>
                                }

                            </PrimaryButton>
                        )
                        }

                        {!['info', 'testCreated'].includes(step) && (

                            <PrimaryButton disabled={isNextDisabled || stepButtonsLoading} onClick={handelPreviousStep}
                                           className="my-2 text-end">السابق</PrimaryButton>
                        )}


                    </div>
                </div>

            </div>
        </div>
    )

}
