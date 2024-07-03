"use client"
import React from 'react'
import {useApi} from "@/hooks/useApi";
import {useQuery} from "@tanstack/react-query";
import CustomDataTable from "@/components/shared/CustomDataTable";

interface ParticipantResponse {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    status: string,
}


export default function StudentsList({testId} : {testId: string}) {

    const api = useApi()


    const participantsQuery = useQuery<ParticipantResponse[]>({
        queryFn: () => api.get(`/home/exams/${testId}/live/manage/participants`).then(res => res.data.data),
        queryKey: ['exams' , testId , 'live' , 'manage' , 'participants']
    })

    console.log(participantsQuery.data)

    return (
        <div className={""}>
            <div className={"text-xl my-4"}>المشاركين</div>
            { participantsQuery.data  && participantsQuery.data.length > 0 && (
                <CustomDataTable>
                            <CustomDataTable.Header>
                                <CustomDataTable.HeaderRow>الاسم </CustomDataTable.HeaderRow>
                                <CustomDataTable.HeaderRow>البريد الالكتروني</CustomDataTable.HeaderRow>
                            </CustomDataTable.Header>
                            <CustomDataTable.Body isLoading={participantsQuery.isLoading} columnsLength={3} hasData={participantsQuery.data.length > 0}>
                                {participantsQuery.data.map((p) => (

                                <CustomDataTable.Row key={p.id}>
                                    <CustomDataTable.Cell>{p.first_name} {p.last_name}</CustomDataTable.Cell>
                                    <CustomDataTable.Cell>{p.email}</CustomDataTable.Cell>
                                </CustomDataTable.Row>
                                ))}

                            </CustomDataTable.Body>

                        </CustomDataTable>

            )}

        </div>
    )

}
