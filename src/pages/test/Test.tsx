import React, { useState } from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'

const options = [
    {
        label: <div className='text-primary-main' > Option1 </div>,
        value: {
            name: "Option1",
            age: 24
        }
    },
    {
        label: "Option 2",
        value: {
            name: "Option 2",
            age: 23
        }
    },
    {
        label: "Option 3",
        value: {
            name: "Option 3",
            age: 22
        }
    }
]



const Test = () => {

    const [selectValue, setSelectValue] = useState("")

    return (
        <SideNavLayout>
            <div className='h-full flex items-end w-full' >
                <div className='w-full' >

                    <ATMSelect
                        value={selectValue}
                        onSelect={(newValue) => { setSelectValue(newValue) }}
                        options={options}
                        renderValue={(selected) => selected.value?.name}
                    />
                </div>
            </div>
        </SideNavLayout>
    )
}

export default Test



