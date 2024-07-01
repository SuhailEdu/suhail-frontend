import PrimaryButton from "@/components/shared/PrimaryButton";
import CustomBadge from "@/components/CustomBadge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Question} from "@/types/exam";
import CustomTextInput from "@/components/shared/CustomTextInput";
import {ColumnDef} from "@tanstack/react-table";
import CustomDataTable from "@/components/shared/CustomDataTable";
import {useQuery} from "@tanstack/react-query";
import {useApi} from "@/hooks/useApi";
type Participant = {
    email:string,
    status:string,
}
 const columns: ColumnDef<Participant>[] = [
    {
         header: "البريد الالكتروني",
         accessorKey: "email",
    },
    {
        header: "حالة الدعوة",
        accessorKey: "status",
    },
]
export default function StudentsTab({testId}:{testId:string}) {

    const api = useApi()

    const participantsQuery = useQuery<Participant[]>({
        queryFn:() => api.get(`/home/exams/${testId}/participants`).then(res => res.data.data),
        queryKey: ['exams' , "id"],
    })

    console.log(participantsQuery.data)


    return (
        <div className="lg:mx-20">

            <div className="flex justify-between items-center">
                <div className={"text-2xl flex gap-4"}>

                    <span>
                    أسئلة اختبارك
                    </span>

                    <span>
                    <CustomBadge type={"info"} >
                        {/*{questions.length}*/}
                        {" "}
                        سؤال

                    </CustomBadge>
                    </span>

                </div>
                <PrimaryButton>سؤال جديد</PrimaryButton>

            </div>
            <div className={"mt-20 mx-10"}>
                <div className={"container"}>
                    {participantsQuery.data && (
                        <CustomDataTable columns={columns} data={participantsQuery.data} />
                    )}
                </div>

            </div>

        </div>

)

}
