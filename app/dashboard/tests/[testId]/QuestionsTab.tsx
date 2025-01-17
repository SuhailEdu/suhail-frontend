import PrimaryButton from "@/components/shared/PrimaryButton";
import CustomBadge from "@/components/CustomBadge";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import CustomTextInput from "@/components/shared/CustomTextInput";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {InfoIcon, LoaderIcon, MinusIcon, PlusIcon} from "lucide-react";
import React, {useState} from "react";
import {z} from "zod";
import {useApi} from "@/hooks/useApi";
import {useQuery} from "@tanstack/react-query";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {AxiosError, isAxiosError} from "axios";
import {GENERIC_VALIDATION_ERROR_KEY, QUESTIONS_VALIDATION_ERROR_KEY, ValidationError} from "@/types/errors";
import {useToast} from "@/components/ui/use-toast";
import {Skeleton} from "@/components/ui/skeleton";

type Question = {
    title: string,
        type: "options" | "yesOrNo",

}
type Option = {
    id: number,
    option: string,
    is_correct: boolean,
}
type QuestionResponse = {
    live_status: string,
    questions: {
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
}

interface SubmitQuestionValidationError   {

    question_index: number,
    option_index?: number,
    is_question_error:boolean,
    message: string,

}

interface SubmitGenericValidationError   {
    exam_title:string[],
    questions:string[],
    status:string[],

}

export default function QuestionsTab({ testId , isMyExam} : { testId:string , isMyExam?:boolean }) {

    const api = useApi()
    const [isNewQuestionDialogOpen, setIsNewQuestionDialogOpen] = useState<boolean>(false)
    const [dialogMode, setDialogMode] = useState<"create" | "update">("create")

    const [titleError, setTitleError] = useState<string>("")
    const [optionsErrors, setOptionsErrors] = useState<{id:number , message:string}[] >([])

    const [isSubmittingQuestion, setIsSubmittingQuestion] = useState<boolean>(false)

    const [question , setQuestion] = useState<Question>({
        title: "What is your question?",
        type: "options",
    })

    const {toast} = useToast()


    const questionsQuery = useQuery<QuestionResponse>({
        queryFn:  () => api.get(`/home/exams/${testId}/questions`).then(res => res.data.data),
        queryKey: ["exams" , testId , 'questions']
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
    const [questionToUpdate, setQuestionToUpdate] = useState<string | null>(null)
    const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)
    const [isDeleteQuestionDialogOpen, setIsDeleteQuestionDialogOpen] = useState<boolean>(false)
    const [deleteQuestionValidationMessage, setDeleteQuestionValidationMessage] = useState<string>("")
    const [isDeletingQuestion, setIsDeletingQuestion] = useState<boolean>(false)


    function removeOption(id: number) {
        setOptions(op=> {
           return op.filter(o => o.id != id)
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
                    .questions
                    .filter(q => {
                        if(dialogMode === "create") {
                            return true
                        }
                        return q.id != questionToUpdate;
                    })
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
                    id: options[e.path[0] as number ?? 0].id,
                    message: e.message
                })

            })


            setOptionsErrors(errors)
            return false

        }

    }

    async function handleSubmitQuestion() {

        if(dialogMode !== 'create') {
            return
        }
        const isTitleValid = validateTitle()
        if (!isTitleValid) {
            return
        }
        const isOptionsValid = validateOptions()
        if (!isOptionsValid) {
            return

        }

        try {
            const res = await api.post(`/home/exams/${testId}/questions` ,
                {
                    question: {
                        title: question.title,
                        type: "options",
                            options: options
                    }
                }

            )

            if(res.status === 200) {
                setIsSubmittingQuestion(false)
                setIsNewQuestionDialogOpen(false)
                await questionsQuery.refetch()
                toast({
                    title: "تم اضافة السؤال"
                })


            }
            console.log(res)

        } catch (e:unknown) {
            if(isAxiosError<ValidationError>(e) && e.response) {
                console.log(e.response.data.validation_code)
                switch (e.response.data.validation_code){
                    case GENERIC_VALIDATION_ERROR_KEY:
                        handleServerGenericValidationError(e.response.data.validation_errors as SubmitGenericValidationError)

                        break
                    case QUESTIONS_VALIDATION_ERROR_KEY:
                        handleServerQuestionsError(e.response.data.validation_errors as SubmitQuestionValidationError )
                        break
                    default:
                        console.log(e.response.data)
                        break
                }

            }

        }

    }

    function handleServerGenericValidationError(errors: SubmitGenericValidationError) {
        if(errors.exam_title) {
            setTitleError(errors.exam_title[0])
        }
        if(errors.status) {
            setTitleError(errors.status[0])
        }

        if(errors.questions) {
            setTitleError(errors.questions[0])
        }

    }

    function handleServerQuestionsError(error : SubmitQuestionValidationError) {

        if(error.is_question_error) {
            setTitleError(error.message)
        } else {
            setOptionsErrors(prevState => ([
                ...prevState,
            {
                id:options[0].id,
                message: error.message
            }
            ]))

        }


    }

    function openUpdateQuestionDialog(questionId:string) {
        if(!questionsQuery.data||  questionsQuery.data?.questions.length < 1) {
            return

        }

        const q = questionsQuery.data.questions.find(q  => q.id == questionId)
        if(q) {

            setQuestion({
                title: q.title,
                type: q.type == "options" ? "options" : "yesOrNo",
            })

            setOptions(q.options.map(i => ({id: Math.random() , is_correct: i.is_correct, option: i.option})))

            setQuestionToUpdate(questionId)
            setDialogMode("update")
            setIsNewQuestionDialogOpen(true)
        }
    }


    async function handleUpdateQuestion() {
        if(dialogMode !== 'update' || questionToUpdate == null) {
            return
        }
        setIsSubmittingQuestion(true)

        const isTitleValid = validateTitle()
        if (!isTitleValid) {
            setIsSubmittingQuestion(false)
            return
        }
        const isOptionsValid = validateOptions()
        if (!isOptionsValid) {
            setIsSubmittingQuestion(false)
            return

        }

        try {
            const res = await api.patch(`/home/exams/${testId}/questions/${questionToUpdate}` , {
                    title: question.title,
                    type: "options",
                    options: options
            })

            if(res.status === 200) {
                setIsSubmittingQuestion(false)
                setIsNewQuestionDialogOpen(false)
                await questionsQuery.refetch()

            }
            console.log(res)

        } catch (e) {
            if(e instanceof AxiosError) {

            if(e?.response?.status === 422 && e?.response?.data?.validationError) {
                const validationError = e.response.data.validationError
                if(validationError && validationError.title) {
                    setTitleError(validationError.title)
                }


                if(validationError && validationError.options ) {
                    console.log(validationError.options[0])
                    setTitleError(validationError.options[0])
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

            console.log(e)

        }

        setIsSubmittingQuestion(false)

    }

    function openDeleteQuestionDialog(questionId:string)  {
        setQuestionToDelete(questionId)
        setIsDeleteQuestionDialogOpen(true)
    }

    async function deleteConfirmedQuestion(e:React.FormEvent<HTMLButtonElement>) {
        e.preventDefault()
        setIsDeletingQuestion(true)
        setDeleteQuestionValidationMessage("")

        try {
            const res = await api.delete(`/home/exams/${testId}/questions/${questionToDelete}`, )

            if(res.status == 204) {
                await questionsQuery.refetch()
                setDeleteQuestionValidationMessage("")
                setIsDeleteQuestionDialogOpen(false)

            }

        } catch (e) {
            if(e instanceof AxiosError) {

            if(e?.response?.status === 422 && e?.response?.data?.validationError) {
                const validationError = e.response.data.validationError
                console.log(validationError)
                // if(validationError && validationError.emails) {
                    setDeleteQuestionValidationMessage("حدث خطأ ما")
                // }
            }
            }
        }

        setIsDeletingQuestion(false)

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
                        {questionsQuery?.data?.questions.length ?? 0}
                        {" "}
                        سؤال

                    </CustomBadge>
                    </span>

                </div>
                {isMyExam && (
                    <PrimaryButton onClick={() => setIsNewQuestionDialogOpen(true)}>سؤال جديد </PrimaryButton>

                )}

            </div>
            <div className={"mt-20 "}>

                <Accordion className={"border rounded-lg"} type="single" collapsible>
                    {questionsQuery &&  questionsQuery.data?.questions?.map((q , index) => (

                    <AccordionItem  value={q.title} key={q.title}>
                        <AccordionTrigger    className={"bg-slate-100 p-2 h-12"}>{index+1} - {q.title}</AccordionTrigger>
                        <AccordionContent className={"p-2"}>
                            <div className={"text-lg  flex justify-between items-center"}>
                                <div>
                                    الاختيارات

                                </div>
                                <div>
                                    {isMyExam && (

                                        <>

                                    <span onClick={() => openUpdateQuestionDialog(q.id)}
                                         className={"text-orange-400 hover:underline cursor-pointer ml-2"}>
                                        تعديل

                                    </span>

                                    <span onClick={() =>openDeleteQuestionDialog(q.id)}
                                         className={"text-red-500 hover:underline cursor-pointer"}>
                                        حذف

                                    </span>
                                        </>
                                )}
                                </div>
                            </div>
                            <div className={"flex justify-start gap-10 mt-4 items-center"}>
                                {q.options.map(o => (
                                    <div key={o.option} className="flex items-center">
                                    <input
                                        readOnly={true}
                                        checked={o.is_correct && isMyExam} id="default-radio-2" type="radio" value=""
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
                    {questionsQuery.isLoading && (
                        <>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </>
                    )}
                </Accordion>


            </div>

            <Dialog onOpenChange={setIsNewQuestionDialogOpen}  open={isNewQuestionDialogOpen}  >
                <DialogContent  className={"min-h-60"} dir={"rtl"}>
                    <DialogHeader className={"text-right"} dir={"rtl"}>
                        <DialogTitle  className={"text-right"}>{dialogMode == "create" ? "سؤال جديد"  : "تحديث سؤال" }</DialogTitle>
                            <div className="w-full md:w-1/2 text-xl my-12 ">

                                <CustomTextInput
                                    inputSize={'large'}
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
                                                        //@ts-ignore
                                                        htmlFor={option.id.toString()}
                                                        inputSize={'small'}
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



                            <div className={"flex justify-end items-center mt-8"}>
                                <PrimaryButton
                                    onClick={dialogMode == "create" ? handleSubmitQuestion : handleUpdateQuestion}

                                    disabled={ isSubmittingQuestion || !!titleError}>{
                                    (isSubmittingQuestion ?
                                            <span><LoaderIcon className={"animate-spin"}/></span>
                                            :
                                            <span>{dialogMode == "create" ? "اضافة": "تحديث"}</span>

                                    )
                                }</PrimaryButton>

                            </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


            <AlertDialog onOpenChange={setIsDeleteQuestionDialogOpen} open={isDeleteQuestionDialogOpen}>
                <AlertDialogContent dir={"rtl"}>
                    <AlertDialogHeader dir={"rtl"}>
                        <AlertDialogTitle className={"text-right"}>هل أنت متأكد؟</AlertDialogTitle>
                        <AlertDialogDescription className={"text-right"}>

                            هذا الأجراء لا يمكن الغاؤه. سيتم مسح جميع البيانات  المرتبطة بهذا السؤال بما في ذلك النتائج
                            {deleteQuestionValidationMessage && (
                                <div className="text-red-500 mt-4">
                                    {deleteQuestionValidationMessage}
                                </div>

                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>الغاء</AlertDialogCancel>
                        <AlertDialogAction  onClick={deleteConfirmedQuestion} className={"bg-transparent"}>
                            <PrimaryButton disabled={isDeletingQuestion} color={"danger"}>
                                {isDeletingQuestion ?
                                    ( <span>
                                    <LoaderIcon className={"animate-spin"}/>
                                </span>
                                    )
                                    :
                                    (
                                        <span>
                                    تأكيد
                                </span>

                                    )

                                }

                            </PrimaryButton>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>

    )

}
