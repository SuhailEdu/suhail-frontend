import {FileIcon, InfoIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import CustomBadge from "@/components/CustomBadge";
import {Exam} from "@/types/exam";

export default function ExamCard ({exam} : {exam: Exam})  {
    const router = useRouter()
    return (

        <div onClick={() => router.push('/dashboard/tests/1')}
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
                <CustomBadge type='success'>
                    <InfoIcon size={17}/>
                    <span>
                {exam.participants_count}
                        {" "}
                        مشارك
                </span>
                </CustomBadge>
                <CustomBadge type='info'>
                    <InfoIcon size={17}/>
                    <span>
                27  سؤال
                </span>
                </CustomBadge>
            </div>
        </div>

    )
}
