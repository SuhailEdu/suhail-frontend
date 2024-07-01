
import {useState} from 'react'
export default function DashboardMenu()  {

    const [selectedOption , setSelectedOption] = useState('all')

    function isSelected(option: string) {
        return option == selectedOption ? 'border-black' : 'border-none'
    }

    return (

    <div className="my-8">
        <div className='flex justify-start border-b-2 '>
            <p onClick={() => setSelectedOption('all')} className={`border-b-2 ${isSelected('all')} px-4 cursor-pointer`} >الكل</p>
            <p onClick={() => setSelectedOption('others')} className={`border-b-2 ${isSelected('others')} px-4 cursor-pointer`}>اختبارات الاخرين</p>
            <p onClick={() => setSelectedOption('mine')} className={`border-b-2 ${isSelected('mine')} px-4 cursor-pointer`}>اختباراتك</p>
        </div>
    </div>
    )
}
