"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from "react";

interface CustomTextInputProps {
    label?: string
    errors?: string
    hint?: React.HTMLProps<'div'>
    labelClass?: string
    size?: 'small' | 'medium' | 'large'
}

type Props = CustomTextInputProps & React.HTMLProps<HTMLInputElement>

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const CustomDataTable = function CustomDataTable({children}:React.PropsWithChildren){

    return (
        <div className="rounded-md border">
            <Table dir={"rtl"}>
                {children}

            </Table>
        </div>
    )
}

CustomDataTable.Header = function Header ({children}: Props) {
    return (

        <TableHeader>
                <TableRow>
                    {children}
                </TableRow>
        </TableHeader>
    )

}
CustomDataTable.HeaderRow = function HeaderRow ({children}: Props) {
    return (
                    <TableHead className={"text-right bg-slate-50"}>
                        {children}
                    </TableHead>
    )

}
CustomDataTable.Body = function HeaderRow ({children , hasData , columnsLength , ...props}: React.PropsWithChildren<{hasData:boolean , columnsLength:number}>) {
    return (
        <TableBody>
            {hasData ? (
                <>
                    {children}
                </>

            ): (

                <TableRow>
                    <TableCell colSpan={columnsLength} className="h-24 text-center">
                       لا يوجد نتائج.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    )

}
CustomDataTable.Row = function HeaderRow ({children , ...props}: React.PropsWithChildren) {
    return (
        <TableRow
            {...props}
            // data-state={row.getIsSelected() && "selected"}
        >
            {children}
        </TableRow>
    )

}
CustomDataTable.Cell = function HeaderRow ({children , ...props}: React.HTMLProps<'td'>) {
    return (
        <TableCell {...props}>
            {children}
        </TableCell>
    )

}

export default CustomDataTable
