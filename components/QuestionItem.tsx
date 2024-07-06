import CustomTextInput from "@/components/shared/CustomTextInput";
import {InfoIcon, MinusIcon} from "lucide-react";

interface QuestionType {
    title: string,
    id: number,
    options: QuestionOptionType[]
}

interface QuestionOptionType {
    id: number,
    title: string
    isCorrect: boolean
}

interface Props {
    question: QuestionType,
    handleQuestionTitleChange: (value: string) => void,
    handleOptionsChange: (optionId: number, option: QuestionOptionType) => void
    removeOption: (optionId: number) => void
    titleError: string
    optionsError: { id: number, message: string }[]
    clearActiveQuestionTooltipError: () => void
}

function QuestionItem({question, handleQuestionTitleChange, handleOptionsChange, removeOption, titleError, optionsError, clearActiveQuestionTooltipError, ...props}: Props) {

    return (
        <>
            <div className="w-full md:w-1/2 text-xl my-8 ">

                <CustomTextInput
                    inputSize={'large'}
                    required
                    label="عنوان السؤال"
                    id="full_name"
                    type="text"
                    placeholder='كيف تأكل الأسماك الماء'
                    value={question.title}
                    errors={titleError}
                    onChange={(e) => {
                        clearActiveQuestionTooltipError()
                        handleQuestionTitleChange(e.currentTarget.value)
                    }}

                    // onBlur={e => validateTitle(e.currentTarget.value)}
                    hint={<div className="mr-2 mt-1 flex flex-start items-center gap-1 text-green-800">
                        <span><InfoIcon size={15}/></span>
                        <span>اختر عنوانا مناسبا للسؤال</span>
                    </div>}
                />

                <div className="mt-8">


                    <h4>الاختيارات
                        {!question.options.find(o => o.isCorrect) && (

                            <small className='mr-2 text-red-500'>(يرجى تحديد الخيار الصحيح)</small>
                        )}
                    </h4>

                    <div className="flex justify-start flex-col mt-4 gap-4 items-start">

                        {question.options.map(option => (
                            <div key={option.id} className="flex items-center">
                                <input
                                    onChange={e => {

                                        clearActiveQuestionTooltipError()
                                        handleOptionsChange(option.id, {
                                            ...option,
                                            title: option.title,
                                            isCorrect: e.currentTarget.checked
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

                                            clearActiveQuestionTooltipError()
                                            handleOptionsChange(option.id, {
                                                ...option,
                                                title: e.currentTarget.value,
                                                isCorrect: option.isCorrect
                                            })
                                        }}
                                    />
                                </label>
                                {question.options.length > 2 && (
                                    <span onClick={() => removeOption(option.id)}
                                          className=" hover:bg-gray-200 w-fit mr-2 rounded-lg cursor-pointer">

                                    <MinusIcon/>
                                </span>
                                )}

                            </div>
                        ))}

                    </div>

                </div>


            </div>
        </>
    )
}

export default QuestionItem;