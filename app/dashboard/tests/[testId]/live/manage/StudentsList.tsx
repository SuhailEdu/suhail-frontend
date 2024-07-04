"use client"
import React from 'react'
import {useApi} from "@/hooks/useApi";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import CustomDataTable from "@/components/shared/CustomDataTable";
import useWebSocket from "react-use-websocket";
import useAuthStore from "@/stores/AuthStore";

interface ParticipantResponse {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    status: string,
    is_online: boolean
}


export default function StudentsList({testId} : {testId: string}) {

    const api = useApi()
    const user = useAuthStore(state => state.user)

    const queryClient = useQueryClient()

    const { sendMessage, lastMessage, readyState }
        = useWebSocket(`http://localhost:4000/ws/live/${testId}/manage` , {
        protocols: [ user.token ?? "" ],
        onError(e) {
            console.log("error", e);
        },
        onMessage(m) {
            console.log(m.data)
            if(m?.data) {
                const data = JSON.parse(m.data)
                switch (data.type) {
                    case "PARTICIPANT_CONNECTED":
                        handleParticipantConnectionChange(data.payload.participant_id , true)
                        return

                    case "PARTICIPANT_DISCONNECTED":
                        handleParticipantConnectionChange(data.payload.participant_id , false)
                        return

                    default:
                        console.log(data)
                }
            }
        },
        // retryOnError:false,
        reconnectInterval: 10,
    });

    const participantsQuery = useQuery<ParticipantResponse[]>({
        queryFn: () => api.get(`/home/exams/${testId}/live/manage/participants`).then(res => res.data.data),
        queryKey: ['exams' , testId , 'live' , 'manage' , 'participants']
    })

    function handleParticipantConnectionChange(participantId: string , isOnline:boolean) {
        queryClient.setQueryData(['exams' , testId , 'live' , 'manage' , 'participants'] , () => {
            let data = participantsQuery.data
            if(data !== undefined && data.length > 0) {
               return  data.map(p => {
                    if(p.id == participantId) {
                        return {
                            ...p,
                            is_online: isOnline
                        }
                    }
                    return p
                })


            }
            return
        })

    }

    return (
        <div className={""}>
            <div className={"text-xl my-4"}>المشاركين</div>
            { participantsQuery.data  && participantsQuery.data.length > 0 && (
                <CustomDataTable>
                            <CustomDataTable.Header>
                                <CustomDataTable.HeaderRow>الاسم </CustomDataTable.HeaderRow>
                                <CustomDataTable.HeaderRow>البريد الالكتروني</CustomDataTable.HeaderRow>
                                <CustomDataTable.HeaderRow>حالة الاتصال</CustomDataTable.HeaderRow>
                            </CustomDataTable.Header>
                            <CustomDataTable.Body isLoading={participantsQuery.isLoading} columnsLength={3} hasData={participantsQuery.data.length > 0}>
                                {participantsQuery.data.map((p) => (

                                <CustomDataTable.Row key={p.id}>
                                    <CustomDataTable.Cell>{p.first_name} {p.last_name}</CustomDataTable.Cell>
                                    <CustomDataTable.Cell>{p.email}</CustomDataTable.Cell>
                                    <CustomDataTable.Cell><div className={`p-2  h-2 w-2 rounded-full ${
                                        p.is_online ? 'bg-green-400' : 'bg-red-400' 
                                    }`}></div></CustomDataTable.Cell>
                                </CustomDataTable.Row>
                                ))}

                            </CustomDataTable.Body>

                        </CustomDataTable>

            )}

        </div>
    )

}
