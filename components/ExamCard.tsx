import {FileIcon, InfoIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import CustomBadge from "@/components/CustomBadge";
import {Exam} from "@/types/exam";
import Link from "next/link";

type ParticipatingExamResource = {
    id: string,
    exam_title: string,
    questions_count: string,
    created_at: string,
    updated_at: string,
}

export default function ExamCard ({exam , type} : {exam: Exam |ParticipatingExamResource , type : 'my' | 'participating'})  {
    const router = useRouter()
    return (

        <Link prefetch={false} href={type == "my" ? `/dashboard/tests/${exam.id}` : `/dashboard/tests/${exam.id}/live`}
             className="rounded-lg hover:bg-gray-100 cursor-pointer border bg-card text-card-foreground shadow-sm p-6  ">

            <h2 className="mt-10 scroll-m-20 flex justify-start gap-2  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                <FileIcon className=""/>
                {exam.exam_title}
            </h2>
            <p className="leading-7 ">تاريخ الانشاء:{exam.created_at}  </p>
            <div className="mt-4 flex flex-wrap  gap-2 ">

                <CustomBadge type='primary'>
                    <InfoIcon size={17}/>
                    <span>
                {exam.questions_count}
                        {" "}
                        سؤال
                </span>
                </CustomBadge>
                {type == "my"  && "participants_count" in exam  && (
                <CustomBadge type='success'>
                    <InfoIcon size={17}/>
                    <span>
                {"participants_count" in exam ? exam.participants_count : ""}
                        {" "}
                        مشارك
                </span>
                </CustomBadge>
                )}
                <CustomBadge type='info'>
                    <InfoIcon size={17}/>
                    <span>
                27  سؤال
                </span>
                </CustomBadge>
            </div>
        </Link>

    )
}
