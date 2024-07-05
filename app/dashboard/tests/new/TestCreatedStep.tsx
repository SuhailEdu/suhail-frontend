import {ArrowLeft, HomeIcon} from "lucide-react";
import React from 'react'
import PrimaryButton from "@/components/shared/PrimaryButton";
import Image from "next/image";
import CheckSvg from '@/public/images/svg/check.svg'

interface Option {
    readonly label: string;
    readonly value: string;
}


export default function TestCreatedStep() {


    return (
        <>
            <div className="mb-2  ">
                {/*<h3 className={"h"}>*/}
                {/*    أدعوا طلابك للمشاركة في الاختبار*/}
                {/*    <span className="text-green-500 mr-1">*/}

                {/*    </span>*/}
                {/*</h3>*/}

                <div className={'text-center mx-auto'}>

                    <Image src={CheckSvg} className={'text-center inline-block'} alt={'Check'}/>

                    <h3 className="mt-4 font-semibold text-2xl">مبروك ! تم انشاء اختبارك بنجاح</h3>
                    <h5 className="text-md text-slate-500 mt-2">سيتم ارسال دعوة لطلابك عبر البريد الالكتروني</h5>

                    <div className="mt-8 flex justify-center gap-2.5">


                        <PrimaryButton href="/dashboard" className="border border-primary bg-white text-primary">
                            <span className="ml-2"><HomeIcon/> </span>
                            <span>الرئيسية</span>
                        </PrimaryButton>
                        <PrimaryButton href="/dashboard/tests/1">
                            <span>الانتقال للاختبار</span>
                            <span className="mr-2"><ArrowLeft/></span>
                        </PrimaryButton>
                    </div>
                </div>


            </div>

        </>
    )
}
