import CustomTextInput from "@/components/shared/CustomTextInput";
import {FileQuestionIcon, InfoIcon} from "lucide-react";
import {useState} from "react";
import {Exam} from "@/types/exam";
import {Label} from "@/components/ui/label";
import PrimaryButton from "@/components/shared/PrimaryButton";
import {z} from "zod";
import {useApi} from "@/hooks/useApi";
import CustomBadge from "@/components/CustomBadge";
import {useToast} from "@/components/ui/use-toast";

type ExamData =  Exam & {
    is_my_exam: boolean
}
type UpdatedExamProps = {
    exam_title:string,
    status:string,
    ip_range_start:string,
    ip_range_end:string,
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
        }).nullable(),
        ip_range_end: z.string().ip({
            version:'v4',
            message: "عنوان الIP غير صحيح"
        }).nullish()
    }).superRefine((data  , ctx ) => {
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

    const [testData , setTestData] = useState<{
        exam_title:string,
        status:'public' | 'private',
        ip_range_start:string | null,
        ip_range_end:string | null,
    }>({
        exam_title:exam.exam_title,
        status:exam.status,
        ip_range_start:null,
        ip_range_end:null,
    });

    const [validationErrors , setValidationErrors] = useState<{
        exam_title:string,
        status:string,
        ip_range_start:string,
        ip_range_end:string,
    }>({
        exam_title:"",
        status:"",
        ip_range_start:'',
        ip_range_end:'',
    });


    const [isSubmitting , setIsSubmitting] = useState<boolean>(false)

    function validateData () {


        setValidationErrors({
            exam_title:"",
            ip_range_start:'',
            ip_range_end:'',
            status:''
        })


        const result = schema.safeParse(testData)

        if (result.success) {
            setValidationErrors({
                exam_title:"",
                ip_range_start:'',
                ip_range_end:'',
                status:''
            })

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
            const res = await api.patch(`/home/exams/${exam.id}` , testData )
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
            if(e?.response && e?.response?.status == 422 && e?.response?.data?.validationError) {

                const validationError = e?.response?.data?.validationError
                if(validationError) {
                    if(validationError.exam_title) {
                        setValidationErrors(prev => ({
                            ...prev,
                            exam_title:validationError.exam_title[0],

                        }))

                    }
                    if(validationError.status) {
                        setValidationErrors(prev => ({
                            ...prev,
                            status:validationError.status[0],

                        }))

                    }
                    if(validationError.ip_range_start || validationError.ip_range_end) {
                        if(validationError.ip_range_start ) {
                            setValidationErrors(prev => ({
                                ...prev,
                                ip_range_end:validationError.ip_range_start[0],

                            }))
                        }
                        if(validationError.ip_range_end) {
                            setValidationErrors(prev => ({
                                ...prev,
                                ip_range_end:validationError.ip_range_end[0],

                            }))

                        }

                    }


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

    return (
        <div>

        <div className="grid gap-4 lg:gap-8 md:grid-cols-3 pb-8 ">
            <div className="relative p-6 rounded-2xl bg-slate-100 shadow dark:bg-gray-800">
                <div className="space-y-2">
                    <div
                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span>عدد الطلاب</span>
                    </div>
                    <div className="text-3xl dark:text-gray-100">20</div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                        <span>400</span>
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                <div className="space-y-2">
                    <div
                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span>Freelancer Subscriptions Revenue</span></div>
                    <div className="text-3xl dark:text-gray-100">343</div>
                    <div
                        className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-red-600">
                        <span>3% decrease</span>
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                <div className="space-y-2">
                    <div
                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span>Clients Subscriptions Revenue</span></div>
                    <div className="text-3xl dark:text-gray-100">88</div>
                    <div
                        className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                        <span>7% increase</span>
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
            <div className={"mt-8"}>
                <div className={"text-2xl"}>اعدادت الاختبار</div>
                <div className={"mt-8 max-w-xl"}>
                    <CustomTextInput
                        size={'large'}
                        required
                        label="عنوان الاختبار"
                        id="full_name"
                        type="text"
                        errors={validationErrors.exam_title}
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
                            size={'large'}
                            id="full_name"
                            type="text"
                            errors={validationErrors.ip_range_start}
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
                            size={'large'}
                            id="full_name"
                            type="text"
                            errors={validationErrors.ip_range_end}
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
                        <CustomBadge className={"pt-4 bg-green-50 text-lg border border-green-500 text-green-500 flex justify-start items-start flex-col"}>
                            <div className="text-right">
                                <span><FileQuestionIcon className={"text-right inline-block ml-2"} size={15}/></span>
                                <span>ما هو عنوان ال IP ؟</span>
                            </div>

                            <div>تستخدم عناوين الIP لمنع المشاركين خارج شيكتك من الوصول الى الاختبار</div>

                        </CustomBadge>
                    </div>
                    <div className={" ml-auto text-left"}>
                        <PrimaryButton onClick={submit} className={"mt-8 "}>تحديث </PrimaryButton>
                    </div>
                </div>


            </div>

            {/*</div>*/}
        </div>
    )

}
