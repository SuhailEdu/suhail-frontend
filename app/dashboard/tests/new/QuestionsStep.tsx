import {ChevronDown, PlusIcon, XIcon} from "lucide-react";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react'
import QuestionItem from "../../../../components/QuestionItem";
import Badge from "@/components/CustomBadge";
import {z} from "zod";
import PrimaryButton from "@/components/shared/PrimaryButton";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useApi} from "@/hooks/useApi";

interface QuestionValidationError {
    question_index: number,
    option_index: number,
    is_question_error: boolean,
    message: string,
}


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

interface Props extends React.FC {
    questions: QuestionType[]
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>
    tooltipMessage: { id: number, message: string }[]
    setTooltipMessage: React.Dispatch<React.SetStateAction<{id:number , message:string}[]>>
    serverValidationError ?: {
        errorBelongsTo:"questions" | "testInfo"
        error:QuestionValidationError
    },
}

const QuestionsStep = forwardRef<{isReadyToSubmit:() => Promise<boolean>} , Props>(({questions, setQuestions, tooltipMessage, setTooltipMessage, serverValidationError} , ref)=> {


    const api = useApi()


    useEffect(() => {
        if(serverValidationError?.errorBelongsTo === 'questions' && serverValidationError?.error) {
            console.log("server error:"  , serverValidationError.error)
            const question = questions.at(serverValidationError.error?.question_index)
            // console.log("found:" , question)
            if(question) {
                console.log("found:" , serverValidationError.error.message)
                setTooltipMessage(e => ([
                    ...e,
                    {
                        id: question.id,
                        message:  serverValidationError.error.message
                    }
                ]))
            }

        }

    }, [questions, serverValidationError, serverValidationError?.errorBelongsTo, setTooltipMessage]);



        const [titleError, setTitleError] = useState<string>('')

        const [optionsError, setOptionsError] = useState<{ id: number, message: string }[]>([])

        const [activeQuestion, setActiveQuestion] = useState<QuestionType | null>(questions[0])

        const questionTitleValidationSchema = z
            .string()
            .min(6, 'يجب أن لا يقل عنوان السؤال عن ستة أحرف')

        const questionOptionValidationSchema = z.object({
            id: z.any(),
            title: z.string().min(6, 'يجب أن لا يقل عنوان السؤال عن ستة أحرف'),
            isCorrect: z.boolean()
        })


         useImperativeHandle(ref, () => ({
            isReadyToSubmit: () => {
                return isReadyToSubmit();
            }
        }));

        function clearActiveQuestionTooltipError() {
            if (!activeQuestion) {
                return
            }
            const activeQuestionHasTooltipError = tooltipMessage.find(t => t.id === activeQuestion.id)

            if (activeQuestionHasTooltipError) {
                setTooltipMessage(prev => {
                    return prev.filter(t => t.id != activeQuestion.id)
                })

            }

            setTitleError("")
            setOptionsError([])
        }


        function changeActiveQuestion(questionId: number) {
            // const titleValidation = parseQuestionTitleValidation()
            if(!activeQuestion) {
                return
            }

            const isTitleValid = validateTitle()
            if (!isTitleValid) {
                setTooltipMessage(prev => {
                    return [
                        ...prev,
                        {
                            id: 33,
                            message: "يحتوي هذا السؤال على خطأ"
                        }
                    ]
                })
                return
            }


            const isOptionsValid = validateOptions()
            if (!isOptionsValid) {
                setTooltipMessage(prev => {
                    return [
                        ...prev,
                        {
                            id: activeQuestion?.id,
                            message: "يحتوي هذا السؤال على خطأ"
                        }
                    ]
                })
                return
            }

            const questionHasTooltipError = tooltipMessage.find(t => t.id === questionId)

            clearActiveQuestionTooltipError()

            const question = questions.find(q => q.id == questionId)
            if (question) {

                setActiveQuestion(question)
            }

        }

        function validateTitle(): boolean {
            if (activeQuestion == null) {
                return false

            }
            const schema = z.string().min(6)
                .refine(value => {
                    const titles = questions

                        .filter(q => q.id !== activeQuestion.id)
                        .map(q => q.title)

                    console.log(titles, value)

                    if (!titles) {
                        return true

                    }

                    return !titles.includes(value)


                }, 'عنوان السؤال مكرر')
            const validation = schema.safeParse(activeQuestion.title)

            if (validation.success) {
                return true
            } else {
                const message = JSON.parse(validation.error.message)[0].message
                setTitleError(message)
                return false

            }

        }


        function validateOptions(): boolean {
            if (activeQuestion == null) {
                return false

            }
            const schema = z.array(z.object({
                title: z.string().min(1, 'يجب أن تحتوي الاجابة على رمز واحد على الأقل')
            }))
                .min(2, 'يجب أن يحتوي السؤال على أجابتين كحد أدنى')
                .refine(items => {
                    const titles = items.map(i => i.title)
                    return new Set(titles).size == titles.length


                }, {
                    message: 'يجب أن لا تتكرر الاجابات',
                })

            const validation = schema.safeParse(activeQuestion.options)

            if (validation.success) {
                return true
            } else {

                const zodErrors = JSON.parse(validation.error.message)

                const errors: { id: number; message: any; }[] = []

                zodErrors.map((e: { path: (string | number)[]; message: any; }) => {

                    errors.push({
                        id: activeQuestion.options[e.path[0] as number ?? 0].id,
                        message: e.message
                    })

                })


                setOptionsError(errors)
                return false

            }

        }


        function addEmptyQuestion() {


            if (activeQuestion) {

                const isTitleValid = validateTitle()
                if (!isTitleValid) {
                    setTooltipMessage(prev => {
                        return [
                            ...prev,
                            {
                                id: activeQuestion?.id,
                                message: "يحتوي هذا السؤال على خطأ"

                            }
                        ]
                    })
                    return
                }


                const isOptionsValid = validateOptions()
                if (!isOptionsValid) {
                    setTooltipMessage(prev => {
                        return [
                            ...prev,
                            {
                                id: activeQuestion?.id,
                                message: "يحتوي هذا السؤال على خطأ"

                            }
                        ]
                    })
                    return
                }

            }

            const newQuestion:QuestionType =
                {
                    title: 'سؤال جديد',
                    id: Math.random(),
                    options: [
                        {
                            title: 'أزرق',
                            isCorrect: false,
                            id: Math.random(),
                        },
                    ],
                }

            setQuestions(q => {
                return [
                    ...q,
                    newQuestion

                ]
            })

            setActiveQuestion(newQuestion)

        }

        function handleQuestionChange(value: string) {
            setQuestions(q => {

                return q.map(question => {
                    if (question.id == activeQuestion?.id) {
                        question.title = value
                    }
                    return question

                })
            })
        }

        function handleOptionsChange(optionId: number, updatedOption: QuestionOptionType) {

            setQuestions(q => {

                return q.map(question => {
                    if (question.id == activeQuestion?.id) {
                        question.options = question.options.map(option => {
                            if (option.id == optionId) {
                                return {
                                    ...updatedOption,
                                    id: optionId
                                }
                            }
                            if (updatedOption.isCorrect && option.id != optionId) {

                                return {
                                    ...option,
                                    isCorrect: false
                                }

                            }

                            return option
                        })
                    }
                    return question

                })

            })

        }


        function addEmptyOption() {


            if(!activeQuestion?.id) {
                return

            }

            const newQ = questions.map(question => {
                if (question.id == activeQuestion?.id) {
                    question.options.push({
                        id: Math.random(),
                        title: 'أزرق' + Math.random(),
                        isCorrect: false,
                    })
                }
                return question

            })


            setQuestions(newQ)
        }

        function removeOption(optionId: number) {

            setQuestions(q => {
                return q.map(question => {
                    if (question.id == activeQuestion?.id) {
                        question.options = question.options.filter(o => o.id != optionId)
                    }
                    return question

                })
            })
        }

        function removeQuestion(id: number) {
            setQuestions(q => {
                    return q.filter(question => question.id != id)
                }
            )
            if (!activeQuestion) {
                return
            }

            if (activeQuestion.id == id) {
                if (questions.length > 1) {
                    setActiveQuestion(questions[0])

                } else {

                    setActiveQuestion(null)
                }


            }
        }

        async function isReadyToSubmit(): Promise<boolean> {


            if (activeQuestion) {

                const isTitleValid = validateTitle()
                if (!isTitleValid) {
                    setTooltipMessage(prev => {
                        return [
                            ...prev,
                            {
                                id: activeQuestion?.id,
                                message: "يحتوي هذا السؤال على خطأ"

                            }
                        ]
                    })
                    return false
                }


                const isOptionsValid = validateOptions()
                if (!isOptionsValid) {
                    setTooltipMessage(prev => {
                        return [
                            ...prev,
                            {
                                id: activeQuestion?.id,
                                message: "يحتوي هذا السؤال على خطأ"

                            }
                        ]
                    })
                    return false
                }

            }

            return tooltipMessage.length == 0
        }


        return (
            // @ts-ignore
            <div ref={ref}>
                {/*{questionsCount.forEach(count => <QuestionItem />)}*/}
                <div className="flex gap-1 flex-wrap">
                    {questions.map(q => (

                        <TooltipProvider key={q.id} >


                            <Tooltip open={!!tooltipMessage.find(m => m.id === q.id)} >
                                <TooltipTrigger>
                                    <Badge
                                        key={q.id}
                                        className={`font-bold bg-white
                        ${q.id == activeQuestion?.id ? 'bg-primary text-white' : 'border border-primary text-primary'} `}
                                    >
                        <span
                            onClick={() => changeActiveQuestion(q.id)}

                            className="cursor-pointer">
                         {q.title}
                        </span>
                                        <span onClick={() => removeQuestion(q.id)}
                                              className={'cursor-pointer   mr-4'}><XIcon/></span>
                                    </Badge>
                                </TooltipTrigger>
                                <TooltipContent sideOffset={5} className="bg-transparent border-none shadow-none">
                                    <p className={" p-1 rounded  text-red-500 font-bold border border-red-500"}>
                                        {tooltipMessage.find(m => m.id === q.id)?.message}
                                    </p>
                                    <ChevronDown className="text-center mx-auto text-red-500"/>

                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>


                    ))}
                    <PrimaryButton
                        onClick={addEmptyQuestion} className="
                    font-normal
                    flex items-center bg-white text-black hover:text-black  hover:bg-gray-200 w-fit p-2 rounded-lg cursor-pointer
                    ">
                    <span>
                    <PlusIcon/>
                    </span>
                        <span>
                    أضف سؤال
                    </span>
                    </PrimaryButton>
                </div>
                {activeQuestion && (

                    <div>
                        {activeQuestion && (
                            <QuestionItem
                                clearActiveQuestionTooltipError={clearActiveQuestionTooltipError}

                                titleError={titleError}
                                optionsError={optionsError}
                                removeOption={removeOption} handleOptionsChange={handleOptionsChange}
                                handleQuestionTitleChange={handleQuestionChange} question={activeQuestion}/>
                        )}
                        <div>

                            {activeQuestion.options.length <= 4 && (
                                <p onClick={addEmptyOption}
                                   className="flex items-center hover:bg-gray-200 w-fit p-2 rounded-lg cursor-pointer">

                    <span>
                    <PlusIcon/>
                    </span>
                                    <span>
                    اختيار جديد
                    </span>

                                </p>
                            )}


                        </div>

                    </div>
                )}
            </div>
        )
    }
)

export default QuestionsStep
