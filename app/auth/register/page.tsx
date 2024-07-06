'use client'
import React, {useState} from "react";
import CustomTextInput from "@/components/shared/CustomTextInput";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import {z} from "zod";
import {register} from "@/auth";
import {LoaderIcon} from "lucide-react";


export default function Register() {

    const [isLoading , setIsLoading] = useState(false)


    const registerSchema = z.object({
        first_name: z.string().min(3).max(20),
        last_name: z.string().min(3).max(20),
        email: z.string().email(),
        password: z.string().min(8).max(50),
    })

    const [data, setData] = useState<{ email: string; password: string  , first_name:string , last_name:string}>({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const defaultErrors = {
        first_name: [""],
        last_name: [""],
        email: [""],
        password: [""],
    }

    const [validationErrors, setValidationErrors] = useState(defaultErrors)




    async function submit(e: SubmitEvent) {
        e.preventDefault()
        setValidationErrors(defaultErrors)

        const s = registerSchema.safeParse(data)

        if (!s.success) {
            const errors = s.error.formErrors.fieldErrors
            console.log(errors)
            setValidationErrors(e => ({
                ...e,
                ...errors
            }))
            return
        }

        setIsLoading(true)

            const res = await register(data)

        if (!res?.isOk && res?.status == 422) {
            console.log(res.errors.validationError)
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                ...res.errors.validationError
            }))
            setIsLoading(false)
            return
        }

        setIsLoading(false)

    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">

                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        {/*<Image*/}
                        {/*    width={undefined}*/}
                        {/*    src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"*/}
                        {/*    className="w-32 mx-auto" alt={"Login"}/>*/}
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            انشاء حساب جديد
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <form onSubmit={submit} className="flex max-w-md flex-col gap-4">
                                <div className={"grid grid-cols-2 gap-2"}>

                                    <CustomTextInput
                                        label="الاسم الأول"
                                        id="first_name"
                                        type="text"
                                        errors={validationErrors.first_name[0] ?? ""}
                                        value={data.first_name}
                                        onChange={(e) => setData(d => ({
                                            ...d,
                                            first_name: e.target.value
                                        }))}
                                    />

                                    <CustomTextInput
                                        label="الأخير الأول"
                                        id="last_name"
                                        type="text"
                                        errors={validationErrors.last_name[0] ?? ""}
                                        value={data.last_name}
                                        onChange={(e) => setData(d => ({
                                            ...d,
                                            last_name: e.target.value
                                        }))}
                                    />
                                </div>

                                <CustomTextInput
                                    label="البريد الالكتروني"
                                    id="email"
                                    type="email"
                                    errors={validationErrors.email[0] ?? ""}
                                    value={data.email}
                                    onChange={(e) => setData(d => ({
                                        ...d,
                                        email: e.target.value
                                    }))}
                                />


                                <CustomTextInput
                                    label="كلمة المرور"
                                    id="password"
                                    type="password"
                                    errors={validationErrors.password[0] ?? ""}
                                    value={data.password}
                                    onChange={(e) => setData(d => ({
                                        ...d,
                                        password: e.target.value
                                    }))}
                                />
                                <PrimaryButton type="submit">{isLoading ? <LoaderIcon className={'animate-spin'} /> : "تأكيد"}</PrimaryButton>
                            </form>
                            <p
                                className="mt-4 text-sm text-gray-500 dark:text-gray-400">لديك حساب بالفعل؟
                                {" "}
                                <Link
                                    prefetch={false}
                                    href="/auth/login"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    تسجيل الدخول
                                </Link>.</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                         style={{backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')"}}>
                    </div>
                </div>

            </div>

        </div>
    )
}
