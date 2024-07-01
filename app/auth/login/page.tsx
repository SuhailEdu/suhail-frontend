'use client'
import React, {FormEvent, useEffect, useState} from "react";
import axiosClient from "@/providers/axiosClient";
import {useMutation} from "@tanstack/react-query";
import Image from "next/image";
import CustomTextInput from "@/components/shared/CustomTextInput";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import {AxiosError} from "axios";
import {z} from "zod";
import {redirect, useRouter} from "next/navigation";
import {useFormState} from "react-dom";
import {login} from "@/auth";
import useAuthStore from "@/stores/AuthStore";


export default function Login() {
    const router = useRouter()
    const [state, formAction] = useFormState<any, any>(login, {
        state:null,
        errors : {}
    });

    const setAuthUser = useAuthStore(state => state.setAuthUser);


    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50),
    })

    const [data, setData] = useState<{ email: string; password: string }>({
        email: 'client@gmail.com',
        password: 'password'
    })

    const defaultErrors = {
        email: [""],
        password: [""],
    }

    const [validationErrors, setValidationErrors] = useState(defaultErrors)


    const mutation = useMutation({

        onMutate: () => console.log("mutation"),
        mutationFn: submit,
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
                console.log(error)
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

            const res = await login(data)

        if (!res?.isOk && res?.status == 422) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                ...res.errors.validationError
            }))
            return
        }

        if(res?.status == 200) {

        }
        console.log(res)

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
