import {InfoIcon} from "lucide-react";
import React, {forwardRef, useImperativeHandle, useState} from 'react'
import {z} from "zod";
import CustomTextInput from "@/components/shared/CustomTextInput";
import {Label} from "@/components/ui/label";
import {useApi} from "@/hooks/useApi";
import {AxiosError} from "axios";


type TestData = {
    title: string
    type: "public" | 'private'
}

interface Props {
    testData: TestData
    setTestData: React.Dispatch<React.SetStateAction<TestData>>
}

const TestInfoStep = forwardRef(({testData, setTestData}: Props, ref) => {

    const api = useApi()

        const [titleError, setTitleError] = useState<string>("")


        useImperativeHandle(ref, () => ({
            isReadyToSubmit: () => {
                return isReadyToSubmit()
            }
        }));


        async function isReadyToSubmit(): Promise<boolean> {


        const validationReady = validateTitle(testData.title)

            console.log(validationReady)

           if(!validationReady) {
               return false
           }

           try {
               const res = await api.post("/home/exams/create/check-title" , {
                   exam_title: testData.title
               })
               return true

           } catch (e) {
               if( e instanceof AxiosError) {

               if(e?.response?.status == 422) {
                   console.log("error" , e.response)
                   const error = e?.response?.data?.validationError?.exam_title
                   if(error) {
                       setTitleError(error)
                   }
               }
               }
               return false
           }



            // console.log(res.status)
            return false

        }


        function validateTitle(value: string) {

            const schema = z.string()
                .min(5, 'يجب أن يحتوي عنوان الاختبار على 5 أحرف على الأقل')
                .max(20, 'يجب أن لا يزيد عنوان الاختبار عن 20 حرفا')


            const result = schema.safeParse(value)

            if (result.success) {
                setTitleError("")
                return true
            } else {
                const message = result.error.errors[0]
                setTitleError(message.message)
                return false
            }

        }


        return (
            <>
                <div
                    //@ts-ignore
                    ref={ref}
                    className="w-full md:w-1/2 text-xl">

                    <CustomTextInput
                        inputSize={'large'}
                        required
                        label="عنوان الاختبار"
                        id="full_name"
                        type="text"
                        errors={titleError}
                        value={testData.title}
                        onChange={(e) => {
                            validateTitle(e.target.value)
                            setTestData((values) => {
                                    return {
                                        ...values,
                                        title: e.target.value
                                    }
                                }
                            )
                        }}
                        hint={<div className="mr-2 mt-1 flex flex-start items-center gap-1 text-green-800">
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
                            onClick={() => setTestData(v => ({...v, type: 'public'}))}
                            className={`rounded-lg ${testData.type == 'public' ? 'bg-gray-100' : 'bg-white'} cursor-pointer border
                            hover:bg-gray-100
                            text-card-foreground shadow-sm p-6`}>

                            <h3>اختبار عام</h3>
                            <p className="text-sm flex gap-2">
                                <InfoIcon size={15}/>
                                يمكن لأي شخض الانضمام
                            </p>

                        </div>
                        <div
                            onClick={() => setTestData(v => ({...v, type: 'private'}))}
                            className={`rounded-lg ${testData.type == 'private' ? 'bg-gray-100' : 'bg-white'}
                            hover:bg-gray-100
                              cursor-pointer border  text-card-foreground shadow-sm p-6`}>
                            <h3>اختبار خاص</h3>
                            <p className="text-sm flex gap-2">
                                <InfoIcon size={15}/>
                                يمكن فقط للأشخاص المدعويين الانضمام
                            </p>

                        </div>
                    </div>

                </div>
            </>
        )
    }
)

export default TestInfoStep
