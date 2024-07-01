import {ArrowLeft, CrossIcon, HomeIcon, PlusIcon, TimerIcon, XIcon} from "lucide-react";
import React, {useState, KeyboardEventHandler} from 'react'
import QuestionItem from "./QuestionItem";
import Badge from "@/components/CustomBadge";
import {isValid, z, ZodError, ZodIssue, ZodParsedType} from "zod";
import PrimaryButton from "@/components/shared/PrimaryButton";
import {Label} from "flowbite-react";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';

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

                    <img src={'/check.svg'} className={'text-center inline-block'} alt={'Check'}/>

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
