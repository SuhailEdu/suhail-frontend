'use client'
import React, {useState} from "react";
import CustomTextInput from "@/components/shared/CustomTextInput";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import {z} from "zod";
import {login} from "@/auth";
import {LoaderIcon} from "lucide-react";
import {GENERIC_VALIDATION_ERROR_KEY} from "@/types/errors";
import {useRouter} from "next/navigation";
import useAuthStore from "@/stores/AuthStore";

interface LoginValidationError {
    email: string[],
    password: string[],
}

export default function Login() {

    const [isLoading , setIsLoading] = useState(false)
    const router = useRouter()
    const setAuthUser = useAuthStore(state => state.setAuthUser)

    const loginSchema = z.object({
        email: z.string({message: "البريد الالكتروني غير صحيح"}).email({message: "البريد الالكتروني غير صحيح"}),
        password: z.string({message: "كلمة المرور  غير صحيحة"})
            .min(8 , "يجب أن تتكون كلمة المرور من 8 رموز على الأقل")
            .max(255, "الحد الأقصى لكلمة المرور 255 رمزا "),
    })

    const [data, setData] = useState<{ email: string; password: string }>({
        email: 'ash@gmail.com',
        password: 'password'
    })

    const defaultErrors = {
        email: [""],
        password: [""],
    }

    const [validationErrors, setValidationErrors] = useState(defaultErrors)




    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setValidationErrors(defaultErrors)

        const s = loginSchema.safeParse(data)

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

            const res = await login(data)

        if(res != undefined && !res.isOk  && res.validation_code == GENERIC_VALIDATION_ERROR_KEY) {
            setValidationErrors(prevState => ({
                ...prevState,
                ...res.validation_errors
            }))
        }
        if(res != undefined && res.isOk && res.session ) {
            console.log(res.session)
            setAuthUser(JSON.parse(res.session))
            router.push("/dashboard")
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
                            تسجيل الدخول
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <form onSubmit={submit} className="flex max-w-md flex-col gap-4">

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
                                <PrimaryButton disabled={isLoading} type="submit">{isLoading ? <LoaderIcon className={'animate-spin'} /> : "تأكيد"}</PrimaryButton>
                            </form>
                            <p
                                className="mt-4 text-sm text-gray-500 dark:text-gray-400">ليس لديك حساب بعد ؟
                                {" "}
                                <Link
                                    prefetch={false}
                                    href="/auth/register"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    أنشاء حساب
                                    جديد</Link>.</p>
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
