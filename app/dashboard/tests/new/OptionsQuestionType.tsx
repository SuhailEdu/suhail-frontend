import React from 'react'
import CustomTextInput from "@/components/shared/CustomTextInput";
import {MinusIcon} from "lucide-react";

interface Props  {
    options: Option[],
    optionsError: { id: number, message: string }[],
    onOptionChange: (option: Option) => void,
    removeOption: (optionId: number) => void,
}

interface Option {
    id: number,
    title: string
    isCorrect: boolean
}

  function OptionsQuestionType({options , optionsError , onOptionChange , removeOption} : Props) {

    return (
        <div className="mt-8">


            <h4>الاختيارات
                {!options.find(o => o.isCorrect) && (

                    <small className='mr-2 text-red-500'>(يرجى تحديد الخيار الصحيح)</small>
                )}
            </h4>

            <div className="flex justify-start flex-col mt-4 gap-4 items-start">

                {options.map(option => (
                    <div key={option.id} className="flex items-center">
                        <input
                            onChange={e => {
                                onOptionChange({
                                        ...option,
                                        isCorrect: e.target.checked
                                })
                            }}
                            checked={option.isCorrect} id="default-radio-2" type="radio" value=""
                            name="default-radio"
                            className="w-4 h-4 focus:bg-red-500 text-red-500  "/>
                        <label htmlFor="default-radio-2"
                               className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            <CustomTextInput
                                inputSize={'small'}
                                required
                                id="full_name"
                                type="text"
                                placeholder='كيف تأكل الأسماك الماء'
                                value={option.title}
                                errors={optionsError.find(o => o.id == option.id)?.message ?? ''}
                                onChange={e => {

                                    onOptionChange({
                                        ...option,
                                        title: e.target.value,
                                    } )

                                }}
                            />
                        </label>
                        {options.length > 0 && (
                            <span onClick={() => removeOption(option.id)}
                                  className=" hover:bg-gray-200 w-fit mr-2 rounded-lg cursor-pointer">

                                    <MinusIcon/>
                                </span>
                        )}
                    </div>
                ))}

            </div>

        </div>
    )
}

export default OptionsQuestionType

