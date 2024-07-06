import {Label} from "flowbite-react";
import React, {ReactNode} from "react";
import {Input} from "@/components/ui/input";

interface CustomTextInputProps {
    label?: string
    errors?: string
    hint?: ReactNode
    labelClass?: string
    inputSize?: 'small' | 'medium' | 'large'
}

type Props = CustomTextInputProps & React.InputHTMLAttributes<HTMLInputElement>

export default function CustomTextInput({errors, inputSize, labelClass, hint, label, required, ...props}: Props)  {

    function getSize() {
        if (inputSize == undefined) {
            return ''

        }
        switch (inputSize) {
            case 'small':
                return 'text-md'
            case 'medium':
                return 'text-lg'
            case 'large':
                return 'text-xl'
            default:
                return ''
        }

    }

    return (
        <div>
            {label && (
                <div className="mb-2 block">
                    <Label className={getSize()} color={errors ? 'failure' : 'default'} htmlFor={props.id}>
                        {label} {" "}
                        {required && (
                            <span className="text-red-500">*</span>
                        )}
                    </Label>
                </div>
            )}

            <Input color={errors ? 'failure' : 'default'}
                   className={`  ${errors && 'border border-red-500'}`}
                   id={props.id} type={props.type} placeholder={props.placeholder}  {...props}/>
            {errors && (
                <small className="text-red-500">{errors}</small>
            )}
            {!errors && hint && (
                <small className="text-gray-600">{hint}</small>
            )}
        </div>
    )
}
