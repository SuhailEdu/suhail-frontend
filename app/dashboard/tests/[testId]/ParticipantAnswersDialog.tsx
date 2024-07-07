import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useQuery} from "@tanstack/react-query";
import {useApi} from "@/hooks/useApi";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import CustomBadge from "@/components/CustomBadge";
import {LoaderIcon} from "lucide-react";

type Props = {
    testId:string ,
    participantId:string ,
    isOpen:boolean ,
    setIsOpen : (value: boolean) => void,
}

type ParticipantAnswer = {
    exam_id:string ,
    user_id:string ,
    question_id:string ,
    participantId:string ,
    question:string ,
    options:{
        option: string,
        is_correct: boolean,
    }[] ,
    participant_answer:string ,
}
export default function ParticipantAnswersDialog({testId , participantId , isOpen , setIsOpen}:Props) {

    const api = useApi()
    const [correctAnswersCount , setCorrectAnswersCount] = useState(0)
    const [wrongAnswersCount , setWrongAnswersCount] = useState(0)

    const answers = useQuery<ParticipantAnswer[]>({
        queryFn: () => api.get(`/home/exams/${testId}/participants/${participantId}/answers`)
            .then(res => res.data.data),
        queryKey: ["exams" , testId , "participants" , participantId, "answers"],
        enabled: () => isOpen && !!participantId,
        select: (data) => {
            // if(data && data.length > 0) {
            //     setCorrectAnswersCount(correct.length)
            //     setWrongAnswersCount(data.length - correct.length)
            // }
            // data
            // console.log(data)
            // data.
            return data
        }
    } )

    useEffect(() => {
        if(answers.status == "success" && answers.data && answers.data.length > 0) {

            // answers.data.map(a => {
                const correct = answers.data
                    .filter(d => d.options.find(a => a.is_correct)?.option === d.participant_answer)
            setCorrectAnswersCount(correct.length)
            setWrongAnswersCount(answers.data.length - correct.length)
            // })

            console.log(correct.length)

        }

    }, [answers.status]);

    function calculateStats() {
        if(answers.data && answers.data.length > 0) {
        const correct =answers.data.filter(a => a.participant_answer === a.options.find(o => o.is_correct)?.option)
            setCorrectAnswersCount(correct.length)
            setWrongAnswersCount(answers.data.length - correct.length)
        }
    }



    return (
        <Dialog onOpenChange={setIsOpen}  open={isOpen}  >
            <DialogContent className={"min-h-60 min-w-60"} dir={"rtl"}>
                <DialogHeader className={"text-right"} dir={"rtl"}>
                    <DialogTitle className={"text-right"}>عرض درحات المشارك</DialogTitle>
                </DialogHeader>
                {answers.data && answers.data.length > 0 && !answers.isLoading && (
                    <>

                <div className={"flex justify-between items-center "}>
                    <div>
                        <p>عدد الاجابات الصحيحة</p>
                        <p>{correctAnswersCount}</p>
                    </div>
                    <div>
                        <p>عدد الاجابات الخاطئة</p>
                        <p>{wrongAnswersCount}</p>
                    </div>

                </div>
                <div className={""}>
                    {answers.data.map((a , index) => (

                        <Accordion key={a.question_id} className={"border rounded-lg"} type="single" collapsible>

                            <AccordionItem value={a.question} key={a.question_id}>
                                <AccordionTrigger
                                    className={"bg-slate-100 p-2 h-12"}>{index + 1} - {a.question}</AccordionTrigger>
                                <AccordionContent className={"p-2"}>
                                    <div className={"text-lg  flex justify-between items-center mb-1"}>
                                        <div>
                                            الاختيارات
                                        </div>
                                    </div>
                                    <div className={"flex justify-start gap-10  items-center"}>
                                        {a.options.map(o => (
                                            <div key={o.option} className="flex items-center">
                                                <input
                                                    readOnly={true}
                                                    checked={o.is_correct} id="default-radio-2" type="radio"
                                                    value=""
                                                    name="default-radio"
                                                    className="w-4 h-4 focus:bg-red-500 text-red-500  "/>
                                                <label htmlFor="default-radio-2"
                                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    {o.option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={"flex justify-between  mt-4 px-2"}>
                                        <div>

                                            <div className={"text-lg mt-2  flex justify-between items-center"}>
                                                <div>
                                                    اجابة المشارك
                                                </div>
                                            </div>
                                            <div className={"mt-2"}>{a.participant_answer}</div>
                                        </div>
                                        <div>

                                            <div className={"text-lg mt-2  flex justify-between items-center"}>
                                                <div>حالة الاجابة</div>
                                            </div>
                                            <div
                                                className={"mt-2"}>{a.participant_answer == a.options.find(o => o.is_correct)?.option
                                                ? <CustomBadge type={"success"}>صحيحة</CustomBadge>
                                                : <CustomBadge type={"info"}>خاطئة</CustomBadge>

                                            }</div>
                                        </div>

                                    </div>

                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
                    </>
            )}
                {answers.isLoading && (
                    <div className={"flex justify-center items-center"}>
                        <LoaderIcon className={"animate-spin"} />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )

}
