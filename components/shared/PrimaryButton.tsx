import Link from "next/link";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import React from "react";

interface Props extends React.ComponentProps<'button'> {
    href?: string

}

export default ({href, className, ...props}: Props) => {

    return href ? (
            <Link href={href}>

                <Button className={`bg-primary hover:bg-primary hover:text-white   text-white font-bold ${className}`}
                        {...props}
                >{props.children}</Button>

            </Link>
        )
        :
        (
            <Button className={cn('bg-primary  text-white hover:bg-primary hover:text-white font-bold', className)}
                    {...props}
            >{props.children}</Button>
        )

}
