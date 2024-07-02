import PrimaryButton from "@/components/shared/PrimaryButton";
import CustomBadge from "@/components/CustomBadge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import CustomTextInput from "@/components/shared/CustomTextInput";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {InfoIcon, LoaderIcon, MinusIcon, PlusIcon} from "lucide-react";
import React, {useState} from "react";
import {z} from "zod";
import {useApi} from "@/hooks/useApi";
import {useQuery} from "@tanstack/react-query";

type Question = {
    title: string,
        type: "options",

}
type Option = {
    id: number,
    option: string,
    is_correct: boolean,
}
type QuestionResponse = {
    id:string,
    title:string,
    type:string,
    created_at:string,
    updated_at:string,
    options: {
        option:string,
        is_correct:boolean,
    }[]
}[]

export default function QuestionsTab({ testId} : { testId:string}) {

    const api = useApi()
    const [isNewQuestionDialogOpen, setIsNewQuestionDialogOpen] = useState<boolean>(false)

    const [titleError, setTitleError] = useState<string>("")
    const [optionsErrors, setOptionsErrors] = useState<{id:number , message:string}[] >([])

    const [isSubmittingQuestion, setIsSubmittingQuestion] = useState<boolean>(false)

    const [question , setQuestion] = useState<Question>({
        title: "What is your question?",
        type: "options",
    })


    const questionsQuery = useQuery<QuestionResponse>({
        queryFn:  () => api.get(`/home/exams/${testId}/questions`).then(res => res.data.data),
        queryKey: ["exams" , testId]
    });
    console.log(questionsQuery.data)

    const [options , setOptions] = useState<Option[]>(
        [
            {
                id: Math.random(),
                option: "",
                is_correct: true,
            }
        ]
    )


    function removeOption(id: number) {
        setOptions(o => {
           return options.filter(o => o.id != id)
        })

    }

    function addEmptyOption() {
            setOptions(o=> {
                return [
                    ...o,
                    {
                        id: Math.random(),
                        option: "New one",
                        is_correct: false
                    }
                    ]

            })
    }


    function validateTitle(): boolean {
        const schema = z.string().min(6)
            .refine(value => {
                if(!questionsQuery.data) {
                    return true
                }
                const titles = questionsQuery.data

                    .map(q => q.title)

                if (!titles) {
                    return true

                }
                return !titles.includes(value)


            }, 'عنوان السؤال مكرر')
        const validation = schema.safeParse(question.title)

        if (validation.success) {
            return true
        } else {
            const message = JSON.parse(validation.error.message)[0].message
            setTitleError(message)
            return false

        }

    }

    function validateOptions(): boolean {

        const schema = z.array(z.object({
            option: z.string().min(1, 'يجب أن تحتوي الاجابة على رمز واحد على الأقل')
        }))
            .min(2, 'يجب أن يحتوي السؤال على أجابتين كحد أدنى')
            .refine(items => {
                const titles = items.map(i => i.option)
                return new Set(titles).size == titles.length

            }, {
                message: 'يجب أن لا تتكرر الاجابات',
            })

        const validation = schema.safeParse(options)

        if (validation.success) {
            return true
        } else {

            const zodErrors = JSON.parse(validation.error.message)

            const errors: { id: number; message: any; }[] = []

            zodErrors.map((e: { path: (string | number)[]; message: any; }) => {

                errors.push({
                    id: options[e.path[0] ?? 0].id,
                    message: e.message
                })

            })


            setOptionsErrors(errors)
            return false

        }

    }

    async function handleSubmitQuestion() {
        const isTitleValid = validateTitle()
        if (!isTitleValid) {
            console.log('failed')
            return
        }
        const isOptionsValid = validateOptions()
        if (!isOptionsValid) {
            console.log('failed2')
            return

        }

        try {
            const res = await api.post(`/home/exams/${testId}/questions` , {
                question: {
                    title: question.title,
                    type: "options",
                    options: options
                }
            })

            if(res.status === 200) {
                setIsSubmittingQuestion(false)
                setIsNewQuestionDialogOpen(false)
                await questionsQuery.refetch()

            }
            console.log(res)

        } catch (e) {
            if(e?.response?.status === 422 && e?.response?.data?.validationError) {
                const validationError = e.response.data.validationError
                if(validationError && validationError.title) {
                    setTitleError(validationError.title)
                }

                if(validationError && validationError.question_index !== null) {
                    console.log(validationError)
                    setOptionsErrors(prevErrors => ([
                        ...prevErrors,
                        {
                            id: options[0]?.id,
                            message: validationError.message
                        }
                    ]))
                    // setTitleError(validationError.title)
                }
            }

        }

    }

    return (
        <div className=" container">

            <div className="flex justify-between items-center">
                <div className={"text-2xl flex gap-4"}>

                    <span>
                    أسئلة اختبارك
                    </span>

                    <span>
                    <CustomBadge type={"info"} >
                        {questionsQuery?.data?.length ?? 0}
                        {" "}
                        سؤال

                    </CustomBadge>
                    </span>

                </div>
                <PrimaryButton onClick={() => setIsNewQuestionDialogOpen(true)}>سؤال جديد </PrimaryButton>

            </div>
            <div className={"mt-20 "}>
                <Accordion className={"border rounded-lg"} type="single" collapsible>
                    {questionsQuery.data &&  questionsQuery.data?.map((q , index) => (

                    <AccordionItem  value={q.title} key={q.title}>
                        <AccordionTrigger    className={"bg-slate-100 p-2 h-12"}>{index+1} - {q.title}</AccordionTrigger>
                        <AccordionContent className={"p-2"}>
                            <div className={"text-lg"}>الاختيارات</div>
                            <div className={"flex justify-start gap-10 mt-4 items-center"}>
                                {q.options.map(o => (
                                <div key={o.option} className="flex items-center">
                                    <input
                                        readOnly={true}
                                        checked={o.is_correct} id="default-radio-2" type="radio" value=""
                                        name="default-radio"
                                        className="w-4 h-4 focus:bg-red-500 text-red-500  "/>
                                    <label htmlFor="default-radio-2"
                                           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        {o.option}
                                    </label>
                                </div>
                                ))}
                            </div>

                        </AccordionContent>
                    </AccordionItem>
                        ))}
                </Accordion>

            </div>

            <Dialog onOpenChange={setIsNewQuestionDialogOpen}  open={isNewQuestionDialogOpen}  >
                <DialogContent  className={"min-h-60"} dir={"rtl"}>
                    <DialogHeader className={"text-right"} dir={"rtl"}>
                        <DialogTitle  className={"text-right"}>أضف أسئلة جديدة</DialogTitle>
                            <>

                            <span className={"my-4"}>
                                أدعوا طلابك للمشاركة في الاختبار
                            </span>
                            <div className="w-full md:w-1/2 text-xl my-8 ">

                                <CustomTextInput
                                    size={'large'}
                                    required
                                    label="عنوان السؤال"
                                    id="full_name"
                                    type="text"
                                    placeholder='كيف تأكل الأسماك الماء'
                                    value={question.title}
                                    errors={titleError}
                                    onChange={(e) => {
                                        setTitleError("")
                                        setQuestion(q => ({...q , title:e.target.value}))
                                    }}

                                    // onBlur={e => validateTitle(e.target.value)}
                                    hint={<div className="mr-2 mt-1 flex flex-start items-center gap-1 text-green-800">
                                        <span><InfoIcon size={15}/></span>
                                        <span>اختر عنوانا مناسبا للسؤال</span>
                                    </div>}
                                />

                                <div className="mt-8">


                                    <div>الاختيارات
                                        {!options.find(o => o.is_correct) && (

                                            <small className='mr-2 text-red-500'>(يرجى تحديد الخيار الصحيح)</small>
                                        )}
                                    </div>

                                    <div className="flex justify-start flex-col mt-4 gap-4 items-start">

                                        {options.map(option => (
                                            <div key={option.id} className="flex items-center">
                                                <input
                                                    onChange={e => {
                                                        // setOptionsErrors([])
                                                        console.log(e.target.checked , options)

                                                        setOptions(prevOptions => {
                                                            return prevOptions.map(o => {
                                                                if(o.id == option.id) {
                                                                    console.log("foun" , e.target.value , e.target.checked)
                                                                    return {
                                                                        ...o,
                                                                        is_correct: e.target.checked
                                                                    }
                                                                }
                                                                return {
                                                                    ...o,
                                                                    is_correct: false
                                                                }

                                                            })
                                                        })

                                                    }}
                                                    checked={option.is_correct}  type="radio"
                                                    name="options-radio"
                                                    id={option.id.toString()}
                                                    className="w-4 h-4 focus:bg-red-500 text-red-500  "/>
                                                <label htmlFor="default-radio-2"
                                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    <CustomTextInput
                                                        htmlFor={option.id.toString()}
                                                        size={'small'}
                                                        required
                                                        id="full_name"
                                                        type="text"
                                                        placeholder='كيف تأكل الأسماك الماء'
                                                        value={option.option}
                                                        errors={optionsErrors.find(o => o.id == option.id)?.message ?? ''}
                                                        onChange={e => {
                                                            setOptionsErrors([])

                                                            setOptions(prevOptions => {
                                                                return prevOptions.map(o => {
                                                                    if(o.id == option.id) {
                                                                        return {
                                                                            ...o,
                                                                            option: e.target.value
                                                                        }
                                                                    }
                                                                    return o

                                                                })
                                                            })

                                                        }}
                                                    />
                                                </label>
                                                {options.length > 2 && (
                                                    <span onClick={() => removeOption(option.id)}
                                                          className=" hover:bg-gray-200 w-fit mr-2 rounded-lg cursor-pointer">

                                    <MinusIcon/>
                                </span>
                                                )}

                                            </div>
                                        ))}

                                        {options.length <= 4 && (
                                            <div onClick={() => addEmptyOption()}
                                               className="flex items-center hover:bg-gray-200 w-fit p-2 rounded-lg cursor-pointer">

                    <span>
                    <PlusIcon/>
                    </span>
                                                <span>
                    اختيار جديد
                    </span>

                                            </div>
                                        )}

                                    </div>

                                </div>

                            </div>


                            </>

                            <div className={"flex justify-end items-center mt-8"}>
                                <PrimaryButton
                                    onClick={handleSubmitQuestion}

                                    disabled={ isSubmittingQuestion || !!titleError}>{
                                    (isSubmittingQuestion ?
                                            <span><LoaderIcon className={"animate-spin"}/></span>
                                            :
                                            <span>اضافة</span>

                                    )
                                }</PrimaryButton>

                            </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>

    )

}
