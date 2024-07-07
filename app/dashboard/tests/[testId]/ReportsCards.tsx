import CustomTextInput from "@/components/shared/CustomTextInput";
import {InfoIcon, LoaderIcon, MessageCircleQuestion, UsersRound} from "lucide-react";
import React, {useState} from "react";
import {Exam} from "@/types/exam";
import {Label} from "@/components/ui/label";
import PrimaryButton from "@/components/shared/PrimaryButton";
import {z} from "zod";
import {useApi} from "@/hooks/useApi";
import CustomBadge from "@/components/CustomBadge";
import {useToast} from "@/components/ui/use-toast";
import {isAxiosError} from "axios";
import {GENERIC_VALIDATION_ERROR_KEY, GenericValidationError, ValidationError} from "@/types/errors";
import {useRouter} from "next/navigation";
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

type ExamData =  Exam & {
    is_my_exam: boolean
}
type UpdatedExamProps = {
    exam_title:string,
    status:string,
    ip_range_start:string,
    ip_range_end:string,
}

interface UpdateExamValidationError {
    exam_title:string[],
    status:string[],
    ip_range_start:string[],
    ip_range_end:string[],
}

export default function ReportsCards({exam , updateExam}:{exam:ExamData, updateExam:(d :UpdatedExamProps) => void}) {
    const schema = z.object({
        exam_title:z.string()
            .min(5, 'يجب أن يحتوي عنوان الاختبار على 5 أحرف على الأقل')
            .max(20, 'يجب أن لا يزيد عنوان الاختبار عن 20 حرفا')
        ,
        ip_range_start:z.string().ip({
            version:'v4',
            message: "عنوان الIP غير صحيح"
        }).or(z.literal('')),
        ip_range_end: z.string().ip({
            version:'v4',
            message: "عنوان الIP غير صحيح"
        }).or(z.literal('')),
    })
        .superRefine((data  , ctx ) => {
        if(!data.ip_range_end && !data.ip_range_start){
            return

        }

        if(!data.ip_range_end && data.ip_range_start){
            ctx.addIssue({
                code:"custom",
                message: "نهاية ال IP مطلوبة",
                path : ['ip_range_end'],
            })
            return

        }
        if(!data.ip_range_start && data.ip_range_end ){
            ctx.addIssue({
                code:"custom",
                message: "بداية ال IP مطلوبة",
                path : ['ip_range_start'],
            })
            return

        }

        console.log(data.ip_range_start , data.ip_range_end)

        const pad = (num:string) => String("00"+num).slice(-3);
        const start = data.ip_range_start?.split(".").map(num => pad(num)).join('.')
        const end = data.ip_range_end?.split(".").map(num => pad(num)).join('.')
        if(start == undefined || end == undefined ) {
            return
        }
        if(start > end) {
            ctx.addIssue({
                code:"custom",
                message: "يجب أن تكون بداية ال IP أصغر من نهايته",
                path : ['ip_range_end'],
            })
        }

    }, )

    const api = useApi()
    const {toast} = useToast()

    const [isDeleteExamDialogOpen , setIsDeleteExamDialogOpen] = useState<boolean>(false)
    const [isDeletingExam, setIsDeletingExam] = useState<boolean>(false)

    const router = useRouter()

    const [testData , setTestData] = useState<{
        exam_title:string,
        status:'public' | 'private',
        ip_range_start:string | null,
        ip_range_end:string | null,
    }>({
        exam_title:exam.exam_title,
        status:exam.status,
        ip_range_start:exam.ip_range_start,
        ip_range_end:exam.ip_range_end,
    });

    const defaultValidationErrors = {
        exam_title:[],
        status:[],
        ip_range_start:[],
        ip_range_end:[],
    }


    const [validationErrors , setValidationErrors] = useState<{
        exam_title:string[],
        status:string[],
        ip_range_start:string[],
        ip_range_end:string[],
    }>(defaultValidationErrors);



    const [isSubmitting , setIsSubmitting] = useState<boolean>(false)

    function validateData () {


        setValidationErrors(defaultValidationErrors)


        const result = schema.safeParse(testData)

        if (result.success) {
            setValidationErrors(defaultValidationErrors)

            return true
        } else {
            const errors = result.error.errors.map(e => {
                setValidationErrors(prevState =>  ({
                    ...prevState,
                    [e.path[0]]: e.message
                }))
            })
            return false
        }

    }


    async function submit() {
        setIsSubmitting(true)

        const isValid = validateData()
        if(!isValid) {
            setIsSubmitting(false)
            return
        }

        try {
            const res = await api.patch(`/home/exams/${exam.id}`  , testData )
            if(res.status === 200) {
                toast({
                    title: "تم تحديث بيانات الاختبار",
                })
                updateExam({
                    ...testData,
                    ip_range_start: testData.ip_range_start?? "",
                    ip_range_end: testData.ip_range_end?? "",
                })
            }
        } catch (e:any) {
            if(isAxiosError<ValidationError>(e) && e.response) {
                const errors = e.response.data as GenericValidationError<UpdateExamValidationError>
                if(errors.validation_code === GENERIC_VALIDATION_ERROR_KEY) {
                    console.log(errors.validation_code)
                    setValidationErrors(prevState => ({
                        ...prevState,
                            ...errors.validation_errors
                    }))

                }


            }
        }

        setIsSubmitting(false)

    }

    function setData(name:string , value:any) {
        setTestData(prevState => ({
            ...prevState,
            [name]:value
        }))

    }




    async function deleteConfirmed(e:React.FormEvent<HTMLButtonElement>) {
        e.preventDefault()
        setIsDeletingExam(true)

        try {
            const res = await api.delete(`/home/exams/${exam.id}`, )

            toast({
                title: "تم حذف الاختبار"
            })
            setIsDeleteExamDialogOpen(false)

            router.push('/dashboard')

        } catch (e) {
            console.log(e)
        }

        setIsDeletingExam(false)

    }

    return (
        <div>

        <div className="grid gap-4 lg:gap-8 md:grid-cols-3 pb-8 ">
            <div className="relative flex justify-between items-center p-6 rounded-2xl bg-slate-50 shadow dark:bg-gray-800">
                <div className="space-y-2">
                    <div
                        className="flex items-center space-x-2 rtl:space-x-reverse text-2xl font-medium text-gray-500 dark:text-gray-400">
                        <span>المشاركين</span>
                    </div>
                    <div className="text-3xl dark:text-gray-100">{exam.participants_count}</div>
                </div>
                <div>
                    <UsersRound size={40}/>
                </div>
            </div>
            <div
                className="relative flex justify-between items-center p-6 rounded-2xl bg-slate-50 shadow dark:bg-gray-800">
                <div className="space-y-2">
                    <div
                        className="flex items-center space-x-2 rtl:space-x-reverse text-2xl font-medium text-gray-500 dark:text-gray-400">
                        <span>الأسئلة</span>
                    </div>
                    <div className="text-3xl dark:text-gray-100">{exam.questions_count}</div>

                </div>
                <div>
                    <MessageCircleQuestion size={40}/>
                </div>
            </div>
        </div>
            <div className={"mt-8"}>
                <div className={"text-2xl"}>اعدادت الاختبار</div>
                <div className={"mt-8 max-w-xl"}>
                    <CustomTextInput
                        inputSize={'large'}
                        required
                        label="عنوان الاختبار"
                        id="full_name"
                        type="text"
                        errors={validationErrors.exam_title[0]}
                        value={testData.exam_title}
                        onChange={(e) => setData("exam_title", e.target.value)}
                        hint={<div className="mr-2 mt-1 text-lg flex flex-start items-center gap-1 text-green-800">
                            <span><InfoIcon size={15}/></span>
                            <span>اختر عنوانا مناسبا لاختبارك</span>
                        </div>}
                    />
                </div>
                <div className="w-full   md:w-1/2 text-xl my-8">
                    <Label className='text-xl mb-2'>
                        نوع الاختبار
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        <div
                            onClick={() => setData("status" , "public")}
                            className={`rounded-lg ${testData.status == 'public' ? 'bg-gray-100' : 'bg-white'} cursor-pointer border
                            hover:bg-gray-100
                            text-card-foreground shadow-sm p-6`}>

                            <h3>اختبار عام</h3>
                            <p className="text-sm flex gap-2">
                                <InfoIcon size={15}/>
                                يمكن لأي شخض الانضمام
                            </p>

                        </div>
                        <div
                            onClick={() => setData("status" , "private")}
                            className={`rounded-lg ${testData.status == 'private' ? 'bg-gray-100' : 'bg-white'}
                            hover:bg-gray-100
                              cursor-pointer border  text-card-foreground shadow-sm p-6`}>
                            <h3>اختبار خاص</h3>
                            <p className="text-sm flex gap-2">
                                <InfoIcon size={15}/>
                                يمكن فقط للأشخاص المدعويين الانضمام
                            </p>

                        </div>
                    </div>
                    {validationErrors.status && (
                        <div className={"text-red-500 text-md mt-4"}>{validationErrors.status}</div>
                    )}

                </div>


                <div className={"mt-8 max-w-xl"}>
                    <Label className={"text-lg"}>عناوين الIP</Label>
                    <div className={" flex justify-end flex-row-reverse gap-4"}>
                        <CustomTextInput
                            inputSize={'large'}
                            id="full_name"
                            type="text"
                            errors={typeof validationErrors.ip_range_start == 'object' ? validationErrors.ip_range_start[0] : validationErrors.ip_range_start}
                            value={testData.ip_range_start ?? ""}
                            onChange={(e) => setData("ip_range_start", e.target.value)}
                            placeholder={"145.82.44.1"}
                            maxLength={15}
                            hint={<div className="mr-2 mt-1 text-lg flex flex-start items-center gap-1 text-green-800">
                                <span>من</span>
                            </div>}

                        />
                        <span className={"text-4xl"}>/</span>

                        <CustomTextInput
                            inputSize={'large'}
                            id="full_name"
                            type="text"
                            errors={typeof validationErrors.ip_range_end == 'object' ? validationErrors.ip_range_end[0] : validationErrors.ip_range_end}
                            value={testData.ip_range_end ?? ""}
                            maxLength={15}
                            onChange={(e) => setData("ip_range_end", e.target.value)}
                            placeholder={"145.82.44.255"}
                            hint={<div className="mr-2 mt-1 text-lg flex flex-start items-center gap-1 text-green-800">
                                <span>الى</span>
                            </div>}
                        />
                    </div>
                    <div className=" mt-4 text-lg     text-green-800">
                        <CustomBadge className={"pt-4 bg-blue-50 text-lg border border-blue-500 text-blue-500 flex justify-start items-start flex-col"}>
                            <div className="text-right">
                                <span><InfoIcon className={"text-right inline-block ml-2"} size={15}/></span>
                                <span>ما هو عنوان ال IP ؟</span>
                            </div>

                            <div>تستخدم عناوين الIP لمنع المشاركين خارج شبكتك من الوصول الى الاختبار</div>

                        </CustomBadge>
                    </div>
                    <div className={"flex justify-between items-center"}>
                        <PrimaryButton color={"danger"} onClick={() => setIsDeleteExamDialogOpen(true)} className={"mt-8 "}> حذف الاختبار</PrimaryButton>
                        <PrimaryButton onClick={submit} className={"mt-8 "}>تحديث </PrimaryButton>
                    </div>
                </div>


            </div>
            <AlertDialog onOpenChange={setIsDeleteExamDialogOpen} open={isDeleteExamDialogOpen}>
                <AlertDialogContent dir={"rtl"}>
                    <AlertDialogHeader dir={"rtl"}>
                        <AlertDialogTitle className={"text-right"}>هل أنت متأكد؟</AlertDialogTitle>
                        <AlertDialogDescription className={"text-right"}>

                            هذا الأجراء لا يمكن الغاؤه. سيتم مسح جميع البيانات  المرتبطة بهذا الاختبار بما في ذلك الأسئلة و المستخدمين المشاركين في الاختبار
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>الغاء</AlertDialogCancel>
                        <AlertDialogAction  onClick={deleteConfirmed} className={"bg-transparent"}>
                            <PrimaryButton disabled={isDeletingExam} color={"danger"}>
                                {isDeletingExam ?
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

            {/*</div>*/}
        </div>
    )

}
