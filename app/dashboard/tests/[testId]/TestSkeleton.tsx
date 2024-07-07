"use client"
import React from 'react'
import {Skeleton} from "@/components/ui/skeleton";
import ExamCardSkeleton from "@/app/dashboard/ExamCardSkeleton";

export default function TestSkeleton ()  {

    return (
        <div>

            <div className="my-12 pr-4">
                <div className="scroll-m-20 flex justify-start gap-4 items-center  text-4xl font- tracking-tight lg:text-5xl">
                    <Skeleton className="h-4 w-[250px]" />

                </div>

                {/*"translate-x-0": selectedOption === "reports",*/}
                {/*"translate-x-full": selectedOption === "questions",*/}
                {/*"translate-x-200": selectedOption === "students",                                   })  }>الاحصائيات</p>*/}

                <div className="my-8 py-4">
                    <div className="my-8">

                        <Skeleton className="h-4 w-full" />

                    </div>

                </div>

                <div>
                    <ExamCardSkeleton />
                </div>

            </div>
            </div>
    )


}
