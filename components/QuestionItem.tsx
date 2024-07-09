import CustomTextInput from "@/components/shared/CustomTextInput";
import {CheckCircle, HandIcon, InfoIcon, Pencil} from "lucide-react";
import {useState} from "react";
import OptionsQuestionType from "@/app/dashboard/tests/new/OptionsQuestionType";

interface QuestionType {
    title: string,
    id: number,
    type: 'options' | 'yesOrNo' | 'text',
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
    handleQuestionTypeChange: (type: 'options' | 'yesOrNo' | 'text') => void
}

function QuestionItem({  handleQuestionTypeChange , question, handleQuestionTitleChange, handleOptionsChange, removeOption, titleError, optionsError, clearActiveQuestionTooltipError, ...props}: Props) {
    const [selectedType , setSelectedType] = useState<'options' | 'yesOrNo' | 'text'>('options')

    function changeType(type:'options' | 'yesOrNo' | 'text'): void {

        handleQuestionTypeChange(type)
        setSelectedType(type)


    }

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
                        handleQuestionTitleChange(e.target.value)
                    }}

                    hint={<div className="mr-2 mt-1 flex flex-start items-center gap-1 text-green-800">
                        <span><InfoIcon size={15}/></span>
                        <span>اختر عنوانا مناسبا للسؤال</span>
                    </div>}
                />
                <div className={"mt-8"}>
                    <h4>نوع السؤال</h4>
                    <div className="flex items-center justify-start gap-2 flex-wrap mt-4">
                        <div onClick={() => changeType('options')}
                             className={`${selectedType == 'options' ? 'bg-primary text-white'  : 'bg-white text-primary font-bold'}  border text-sm border-primary flex justify-between gap-2 py-2 px-4 rounded-lg  cursor-pointer`}>
                            <span><HandIcon className={""}/></span>
                            <span>اختيارات</span>

                        </div>
                        <div onClick={() => changeType('yesOrNo')} className={` ${selectedType == 'yesOrNo' ? 'bg-primary text-white'  : 'bg-white text-primary font-bold'} border text-sm border-primary flex justify-between gap-2 py-2 px-4 rounded-lg  cursor-pointer`}>
                            <span><CheckCircle className={""}/></span>
                            <span>صح و خطأ</span>

                        </div>
                        <div onClick={() => changeType('text')} className={` ${selectedType == 'text' ? 'bg-primary text-white'  : 'bg-white text-primary font-bold'} border text-sm border-primary flex justify-between gap-2 py-2 px-4 rounded-lg  cursor-pointer`}>
                            <span><Pencil className={""}/></span>
                            <span>سؤال تحريري</span>

                        </div>
                    </div>

                </div>

                <div className="mt-8">
                    {question.type === 'options' && (
                        <OptionsQuestionType
                            options={ question.options} optionsError={optionsError}
                            onOptionChange={(option) => {
                                console.log(option)
                                                        clearActiveQuestionTooltipError()
                                                        handleOptionsChange(option.id, option)
                            }}
                            removeOption={removeOption}


                        />
                    )}


                {/*    <h4>الاختيارات*/}
                {/*        {!question.options.find(o => o.isCorrect) && (*/}

                {/*            <small className='mr-2 text-red-500'>(يرجى تحديد الخيار الصحيح)</small>*/}
                {/*        )}*/}
                {/*    </h4>*/}

                {/*    <div className="flex justify-start flex-col mt-4 gap-4 items-start">*/}

                {/*        {question.options.map(option => (*/}
                {/*            <div key={option.id} className="flex items-center">*/}
                {/*                <input*/}
                {/*                    onChange={e => {*/}

                {/*                        clearActiveQuestionTooltipError()*/}
                {/*                        handleOptionsChange(option.id, {*/}
                {/*                            ...option,*/}
                {/*                            title: option.title,*/}
                {/*                            isCorrect: e.target.checked*/}
                {/*                        })*/}

                {/*                    }}*/}
                {/*                    checked={option.isCorrect} id="default-radio-2" type="radio" value=""*/}
                {/*                    name="default-radio"*/}
                {/*                    className="w-4 h-4 focus:bg-red-500 text-red-500  "/>*/}
                {/*                <label htmlFor="default-radio-2"*/}
                {/*                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">*/}
                {/*                    <CustomTextInput*/}
                {/*                        inputSize={'small'}*/}
                {/*                        required*/}
                {/*                        id="full_name"*/}
                {/*                        type="text"*/}
                {/*                        placeholder='كيف تأكل الأسماك الماء'*/}
                {/*                        value={option.title}*/}
                {/*                        errors={optionsError.find(o => o.id == option.id)?.message ?? ''}*/}
                {/*                        onChange={e => {*/}

                {/*                            clearActiveQuestionTooltipError()*/}
                {/*                            handleOptionsChange(option.id, {*/}
                {/*                                ...option,*/}
                {/*                                title: e.target.value,*/}
                {/*                                isCorrect: option.isCorrect*/}
                {/*                            })*/}
                {/*                        }}*/}
                {/*                    />*/}
                {/*                </label>*/}
                {/*                {question.options.length > 2 && (*/}
                {/*                    <span onClick={() => removeOption(option.id)}*/}
                {/*                          className=" hover:bg-gray-200 w-fit mr-2 rounded-lg cursor-pointer">*/}

                {/*                    <MinusIcon/>*/}
                {/*                </span>*/}
                {/*                )}*/}

                {/*            </div>*/}
                {/*        ))}*/}

                {/*    </div>*/}

                </div>


            </div>
        </>
    )
}

export default QuestionItem;