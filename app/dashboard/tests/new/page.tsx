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
import {FileIcon, HomeIcon, InfoIcon, PenIcon} from "lucide-react";
import TestInfoStep from "@/components/TestInfoStep";
import QuestionsStep from "@/components/QuestionsStep";
import InviteStep from "@/components/InviteStep";
import TestCreatedStep from "@/components/TestCreatedStep";
import PrimaryButton from "@/components/shared/PrimaryButton";
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


    function handleNextStep() {


        if (step == 'info') {
            const isReadyToSubmit = testInfoStepRef.current?.isReadyToSubmit()

            console.log(isReadyToSubmit, testInfoStepRef.current)

            if (isReadyToSubmit) {
                setStep('questions')
            }

        }

        if (step == 'questions') {
            const isReadyToSubmit = questionStepRef.current?.isReadyToSubmit()

            if (isReadyToSubmit) {
                setStep('invite')

            }
        }


        if (step == 'invite') {
            setStep('testCreated')
        }


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
                            ref={questionStepRef}
                            tooltipMessage={tooltipMessage}
                            setTooltipMessage={setTooltipMessage}
                            questions={questions} setQuestions={setQuestions} key={"questions"}/>}
                    {step == 'invite' &&
                        <InviteStep
                            ref={inviteStepRef}
                            emails={studentsEmails} setEmails={setStudentsEmails} key={"questions"}
                            setNextButtonDisabled={setIsNextDisabled}/>}


                    {step == 'testCreated' &&
                        <TestCreatedStep
                        />}

                    <div className="flex flex-row-reverse  justify-between items-end">
                        {!['testCreated'].includes(step) && (
                            <
                                PrimaryButton disabled={isNextDisabled && tooltipMessage.length == 0}
                                              onClick={handleNextStep}
                                              className="my-2 text-end">التالي</PrimaryButton>
                        )
                        }

                        {!['info', 'testCreated'].includes(step) && (

                            <PrimaryButton disabled={isNextDisabled} onClick={handelPreviousStep}
                                           className="my-2 text-end">السابق</PrimaryButton>
                        )}


                    </div>
                </div>

            </div>
        </div>
    )

}
