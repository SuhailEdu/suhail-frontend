import PrimaryButton from "@/components/shared/PrimaryButton";
import CustomBadge from "@/components/CustomBadge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import CustomTextInput from "@/components/shared/CustomTextInput";
import {Question} from "@/types/exam";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import CreatableSelect from "react-select/creatable";
import {LoaderIcon} from "lucide-react";
import React from "react";

export default function QuestionsTab({questions} : {questions: Question[]}) {
    console.log(questions)

    return (
        <div className=" container">

            <div className="flex justify-between items-center">
                <div className={"text-2xl flex gap-4"}>

                    <span>
                    أسئلة اختبارك
                    </span>

                    <span>
                    <CustomBadge type={"info"} >
                        {questions.length}
                        {" "}
                        سؤال

                    </CustomBadge>
                    </span>

                </div>
                <PrimaryButton>سؤال جديد</PrimaryButton>

            </div>
            <div className={"mt-20 "}>
                <Accordion className={"border rounded-lg"} type="single" collapsible>
                    {questions.map((q , index) => (

                    <AccordionItem  value={q.title} key={q.title}>
                        <AccordionTrigger    className={"bg-slate-100 p-2 h-12"}>{index+1} - {q.title}</AccordionTrigger>
                        <AccordionContent className={"p-2"}>
                            <div className={"text-lg"}>الاختيارات</div>
                            <div className={"flex justify-start gap-10 mt-4 items-center"}>
                                {q.options.map(o => (
                                <div key={o.option} className="flex items-center">
                                    <input
                                        readOnly={true}
                                        checked={o?.is_correct?? false} id="default-radio-2" type="radio" value=""
                                        name="default-radio"
                                        className="w-4 h-4 focus:bg-red-500 text-red-500  "/>
                                    <label htmlFor="default-radio-2"
                                           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        {o.option}
                                    </label>
                                </div>
                                ))}
                            </div>

                        </AccordionContent>
                    </AccordionItem>
                        ))}
                </Accordion>


            </div>

            <Dialog onOpenChange={setIsInviteDialogOpen}  open={isInviteDialogOpen}  >
                <DialogContent  className={"min-h-60"} dir={"rtl"}>
                    {/*<Close >s</Close>*/}
                    <DialogHeader className={"text-right"} dir={"rtl"}>
                        <DialogTitle  className={"text-right"}>أدعو المشاركين في الاختبار</DialogTitle>
                        <DialogDescription>
                            <h3 className={"my-4"}>
                                أدعوا طلابك للمشاركة في الاختبار
                                <span className="text-green-500 mr-1">
                        (اختياري)

                    </span>
                            </h3>

                            <p className="text-red-500">{emailValidationMessage}</p>
                            <div className={"flex justify-end items-center mt-8"}>
                                <PrimaryButton
                                    onClick={handleSendInvitations}

                                    disabled={emails.length < 1 || isSendingIvitations || emailValidationMessage}>{
                                    (isSendingIvitations ?
                                            <span><LoaderIcon className={"animate-spin"}/></span>
                                            :
                                            <span>اضافة</span>

                                    )
                                }</PrimaryButton>

                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>



        </div>

)

}
