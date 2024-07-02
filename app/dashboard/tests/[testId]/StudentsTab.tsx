import PrimaryButton from "@/components/shared/PrimaryButton";
import CustomBadge from "@/components/CustomBadge";
import {ColumnDef} from "@tanstack/react-table";
import CustomDataTable from "@/components/shared/CustomDataTable";
import {useQuery} from "@tanstack/react-query";
import {useApi} from "@/hooks/useApi";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CreatableSelect from "react-select/creatable";
import React, {KeyboardEventHandler, useEffect, useState} from "react";
import {z} from "zod";
import {LoaderIcon, TrashIcon} from "lucide-react";
import {Close} from "@radix-ui/react-dialog";
import {BsThreeDots, BsThreeDotsVertical} from "react-icons/bs";
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

    const [emails , setEmails] = useState<string[]>([])

    const api = useApi()

    const participantsQuery = useQuery<Participant[]>({
        queryFn:() => api.get(`/home/exams/${testId}/participants`).then(res => res.data.data),
        queryKey: ['exams' , "id"],
    })

    console.log(participantsQuery.data)

    function formatInviteStatus(status:string) {
        switch (status) {
            case "pending":
                return "تم ارسال الدعوة"
            case "accepted":
                return "تم قبول الدعوة"
            case "declined":
            default:
                return "تم رفض الدعوة"
        }

    }

    function formatInviteStatusClass(status:string) {
        switch (status) {
            case "pending":
                return "info"
            case "accepted":
                return "success"
            case "declined":
            default:
                return "danger"
        }

    }

    const [emailValidationMessage, setEmailValidationMessage] = useState<string>("")

    const [inputValue, setInputValue] = React.useState('');

    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState<boolean>(false)
    const [isSendingIvitations, setIsSendingIvitations] = useState<boolean>(false)
    // const [value, setValue] = React.useState<readonly Option[]>([]);


    const createOption = (label: string) => ({
        label,
        value: label,
    });



    function validateEmail(email: string) {
        const schema = z.string().email({message: "البريد الالكتروني غير صحيح"})
            .refine((e) => {
                const verifiedEmails = emails.map(v => v.value)
                return !verifiedEmails.includes(e)

            }, "البريد الالكتروني مستخدم بالفعل")
            .refine((e) => {
                if( participantsQuery?.data && participantsQuery?.data?.length > 0){

                const verifiedEmails = participantsQuery.data.map(v => v.email)
                return !verifiedEmails.includes(e)
                }
                return true

            }, "البريد الالكتروني ضمن المشاركين بالفعل")

        const errors = schema.safeParse(email)

        if (errors.success) {
            if (emailValidationMessage) {
                setEmailValidationMessage("")
            }
            return true
        }

        const message = JSON.parse(errors.error.message)[0].message

        setEmailValidationMessage(message)
    }

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (emailValidationMessage) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setEmails((prev) => [...prev, createOption(inputValue)]);
                setInputValue('');
                event.preventDefault();
        }
    };

    async function handleSendInvitations() {
        setIsSendingIvitations(true)
        // setTimeout( ()=> {
        // }, 3000)
        try {
            const res = await api.post(`/home/exams/${testId}/invite`, {
                emails: emails.map(e => e.value),
            })

            if(res.status === 200) {
                setIsInviteDialogOpen(false)
            }

        } catch (e) {
            if(e?.response?.status === 422 && e?.response?.data?.validationError) {
                const validationError = e.response.data.validationError
                if(validationError.emails ) {
                    setEmailValidationMessage(validationError.emails)
                }

            }

        }

        setIsSendingIvitations(false)

    }


    return (
        <div className=" container">

            <div className="flex justify-between items-center">
                <div className={"text-2xl flex gap-4"}>

                    <span>
                    المشاركين في الاختبار
                    </span>

                    <span>
                    <CustomBadge type={"info"} >
                        {participantsQuery.data?.length ?? 0}
                        {" "}
                        مستخدم

                    </CustomBadge>
                    </span>

                </div>
                <PrimaryButton onClick={() => setIsInviteDialogOpen(true)}>دعوة جديدة</PrimaryButton>

            </div>
            <div className={"mt-20 "}>
                <div className={""}>
                    {participantsQuery.data && (
                        <CustomDataTable>
                            <CustomDataTable.Header>
                                <CustomDataTable.HeaderRow>البريد الالكتروني</CustomDataTable.HeaderRow>
                                <CustomDataTable.HeaderRow>حالة الدعوة</CustomDataTable.HeaderRow>
                                <CustomDataTable.HeaderRow>الخيارات</CustomDataTable.HeaderRow>
                            </CustomDataTable.Header>
                            <CustomDataTable.Body columnsLength={participantsQuery.data.length} hasData={participantsQuery.data.length > 0}>
                                {participantsQuery.data.map((p:Participant) => (

                                <CustomDataTable.Row key={p.email}>
                                    <CustomDataTable.Cell>{p.email}</CustomDataTable.Cell>
                                    <CustomDataTable.Cell>
                                        <CustomBadge type={formatInviteStatusClass(p.status)} >
                                            {formatInviteStatus(p.status)}
                                        </CustomBadge>
                                    </CustomDataTable.Cell>

                                    <CustomDataTable.Cell>
                                        <DropdownMenu dir={"rtl"}>
                                            <DropdownMenuTrigger><BsThreeDotsVertical /></DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>الخيارات</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem >
                                                    <div className={"text-red-500 hover:text-red-500 flex gap-1 cursor-pointer"}>
                                                    <span>
                                                        <TrashIcon size={'18'}/>
                                                    </span>

                                                        <span>
                                                        حذف
                                                    </span>

                                                    </div>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </CustomDataTable.Cell>
                                </CustomDataTable.Row>
                                ))}

                            </CustomDataTable.Body>

                        </CustomDataTable>
                        // <CustomDataTable columns={columns} data={participantsQuery.data} />
                    )}
                </div>

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
                            <CreatableSelect
                                isDisabled={isSendingIvitations}
                                components={{
                                    DropdownIndicator: null
                                }}
                                inputValue={inputValue}
                                isMulti
                                isClearable={true}
                                escapeClearsValue={true}
                                menuIsOpen={false}
                                onInputChange={(newValue) => {
                                    if (newValue.trim()) {
                                        validateEmail(newValue)
                                    }
                                    setInputValue(newValue)

                                }}
                                onChange={(newValue) => setEmails(newValue)}
                                onKeyDown={e => handleKeyDown(e)}
                                placeholder="أدخل عنوان البريد الالكترني ثم اضغط على زر Enter"
                                value={emails}
                            />
                            <div className={"flex justify-end items-center mt-8"}>
                                <PrimaryButton
                                    onClick={handleSendInvitations}

                                    disabled={emails.length < 1 || isSendingIvitations || emailValidationMessage}>{
                                    (isSendingIvitations ?
                                            <span><LoaderIcon className={"animate-spin"}/></span>
                                            :
                                            <span>ارسال</span>

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
