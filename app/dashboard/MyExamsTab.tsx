import {useApi} from "@/hooks/useApi";
import {useQuery} from "@tanstack/react-query";
import {Exam} from "@/types/exam";
import React from "react";
import ExamCard from "@/components/ExamCard";
import Link from "next/link";
import ExamCardSkeleton from "@/app/dashboard/ExamCardSkeleton";


function MyExamsTab({children}:any) {

    const api = useApi()

    const query = useQuery<Exam[]>({
        queryFn: () => api.get("/home/exams").then((res) => res.data.data),
        queryKey: ["exams"]
    })

    return (
        <div className="my-8">
            {query.isLoading ?
                <div className="grid gap-2  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
                    <ExamCardSkeleton />
                    <ExamCardSkeleton />
                    <ExamCardSkeleton />
                    <ExamCardSkeleton />
                    <ExamCardSkeleton />
                    <ExamCardSkeleton />



                </div> :

                <div className="grid gap-4  grid-cols-1 md:grid-cols-3  xl:grid-cols-4">
                    {query.data && query.data?.length > 0 && query.data.map(exam => (
                        <ExamCard type={"my"} exam={exam} key={exam.id}/>
                    ))}
                    <div
                        className="rounded-lg hover:bg-gray-100 cursor-pointer border bg-card text-card-foreground shadow-sm p-6  ">
                        <Link prefetch={false} href="/dashboard/tests/new" className="text-center min-h-20 flex items-center justify-center leading-9 text-xl">
                            +
                            اختبار جديد
                        </Link>
                    </div>

                </div>

            }
        </div>
        // <h1>hk</h1>
    )
}

export default MyExamsTab;