import Link from "next/link";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import React from "react";

interface Props extends React.ComponentProps<'button'> {
    href?: string
    color? :"primary" | "danger" | 'base'
}

export default function PrimaryButton ({href, className,color ,  ...props}: Props)  {

    function getColor() {
        switch (color) {
            case "danger" :
                return "bg-red-500 text-white hover:text-white hover:bg-red-600"
            case "base" :
                return "bg-white text-black hover:bg-slate-100 hover:text-black"

            case "primary" :
            default:
                return "bg-primary hover:bg-primary hover:text-white text-white"
        }

    }

    return href ? (
            <Link href={href}>

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
