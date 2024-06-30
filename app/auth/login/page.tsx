'use client'
import React, {FormEvent, useState} from "react";
import axiosClient from "@/providers/axiosClient";
import {useMutation} from "@tanstack/react-query";
import Image from "next/image";
import CustomTextInput from "@/components/shared/CustomTextInput";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import {AxiosError} from "axios";
import {z} from "zod";
import {signIn} from "next-auth/react";


export default function Login() {
    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50),
    })

    const [data, setData] = useState<{ email: string; password: string }>({
        email: '',
        password: ''
    })

    const defaultErrors = {
        email: [""],
        password: [""],
    }

    const [validationErrors, setValidationErrors] = useState(defaultErrors)


    const mutation = useMutation({

        mutationFn: (data: any) => axiosClient.post('http://localhost:4000/auth/login', data),
        onSuccess: (response) => {
            console.log(response.data)
        },

        onError: (error: AxiosError) => {
            if (!error.isAxiosError) {
                return
            }

            if (error?.response?.status === 422) {
                const errors = error?.response?.data?.validationError;
                console.log(errors)
                setValidationErrors(e => ({
                    ...e,
                    ...errors
                }))
                // if (errors?.email && errors?.email.length > 0) {
                //     // validationErrors.password = errors?.email[0]
                // }
                //
                // if (errors?.password) {
                //     // validationErrors.password = errors?.password[0]
                // }
            }
        },
    })


    async function submit(e: SubmitEvent) {
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

        const r = await signIn("credentials", {
            password: data.password,
            username: data.email,
            redirect: false
        })
        const validationE = JSON.parse(r.error)

        setValidationErrors(e => ({
            ...e,
            ...validationE,
        }))


        // mutation.mutate(data)

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
                                <PrimaryButton type="submit">تأكيد</PrimaryButton>
                            </form>
                            <p
                                className="mt-4 text-sm text-gray-500 dark:text-gray-400">ليس لديك حساب بعد ؟
                                <Link
                                    href="/auth/register"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500">أنشاء حساب
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
