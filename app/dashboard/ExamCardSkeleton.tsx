import React from "react";
import {Skeleton} from "@/components/ui/skeleton";


function ExamCardSkeleton({children}:any) {

    return (
        <div className="flex flex-col justify-center m-auto space-y-3">
                        <Skeleton className="   h-44 w-full rounded-xl"/>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]"/>
                            <Skeleton className="h-4 w-[200px]"/>
                        </div>
                    </div>
        // <h1>hk</h1>
    )
}

export default ExamCardSkeleton;