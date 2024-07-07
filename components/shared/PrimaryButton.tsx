import Link from "next/link";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import React from "react";

interface Props extends React.ComponentProps<'button'> {
    href?: string,
    prefetch?: boolean,
    color? :"primary" | "danger" | 'base'
}

export default function PrimaryButton ({href, className,color ,  ...props}: Props)  {

    function getColor() {
        switch (color) {
            case "danger" :
                return "bg-white border-2 text-bold border-red-500 text-red-500 hover:text-white hover:bg-red-600"
            case "base" :
                return "bg-white text-black hover:bg-slate-100 hover:text-black"

            case "primary" :
            default:
                return "bg-primary hover:bg-primary hover:text-white text-white"
        }

    }

    return href ? (
            <Link prefetch={false} href={href}>

                <Button className={` ${getColor()}  ${className}`}
                        {...props}
                >{props.children}</Button>

            </Link>
        )
        :
        (
            <Button className={cn(`${getColor()} `, className)}
                    {...props}
            >{props.children}</Button>
        )

}
