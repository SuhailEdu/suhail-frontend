import React, {KeyboardEventHandler, useEffect, useState} from 'react'
import {z} from "zod";
// import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import {MultiValue} from "react-select";

interface Option {
    readonly label: string;
    readonly value: string;
}

interface Props extends  React.ComponentProps<'p'>{
    setNextButtonDisabled: Function
    emails: MultiValue<Option>,
    // setEmails: (prev : MultiValue<Option>) => MultiValue<Option>,
    setEmails: React.Dispatch<React.SetStateAction<MultiValue<Option>>>
    validationError?: string
}

export default function InviteStep ({emails, setEmails , validationError, ...props}:Props)  {

    const [emailValidationMessage, setEmailValidationMessage] = useState<string>("")

    const [inputValue, setInputValue] = React.useState('');
    // const [value, setValue] = React.useState<readonly Option[]>([]);


    const createOption = (label: string) => ({
        label,
        value: label,
    });

    useEffect(() => {
        if(validationError) {
            setEmailValidationMessage(validationError);

        }
    }, [validationError]);


    function validateEmail(email: string) {
        const schema = z.string().email({message: "البريد الالكتروني غير صحيح"})
            .refine((e) => {
                const verifiedEmails = emails.map(v => v.value)
                return !verifiedEmails.includes(e)

            }, "البريد الالكتروني مستخدم بالفعل")

        const errors = schema.safeParse(email)

        if (errors.success) {
            if (emailValidationMessage) {
                setEmailValidationMessage("")
                props.setNextButtonDisabled(false)
            }
            return true
        }

        const message = JSON.parse(errors.error.message)[0].message

        setEmailValidationMessage(message)

        props.setNextButtonDisabled(true)
    }

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (emailValidationMessage) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setEmails((prev) => [...prev , createOption(inputValue)]);
                setInputValue('');
                event.preventDefault();
        }
    };

    return (
        <>
            <div className="mb-2 block">
                <h3 className={""}>
                    أدعوا طلابك للمشاركة في الاختبار
                    <span className="text-green-500 mr-1">
                        (اختياري)

                    </span>
                </h3>

                <p className="text-red-500">{emailValidationMessage}</p>
                <CreatableSelect
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
            </div>

        </>
    )
}
