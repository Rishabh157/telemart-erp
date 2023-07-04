/// ==============================================
// Filename:Test.tsx
// Type: Test Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, {  useState } from 'react'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ATMTagsInput from 'src/components/UI/atoms/formFields/ATMTagsInput/ATMTagsInput'

const Test = () => {
    const [tags, setTags] = useState<any[]>([])

    return (
        <SideNavLayout>
            <div className="h-full flex w-full">
                <div className="w-full">
                    {/* <ATMSelect
            options={[
              { value: "ocean", label: "Ocean",color: "#00B8D9"},
              { value: "blue", label: "Blue", color: "#0052CC"},
              { value: "purple", label: "Purple", color: "#5243AA"},
              { value: "red", label: "Red", color: "#FF5630"},
              { value: "orange", label: "Orange", color: "#FF8B00"},
              { value: "yellow", label: "Yellow", color: "#FFC400"},
              { value: "green", label: "Green", color: "#36B37E"},
              { value: "forest", label: "Forest", color: "#00875A"},
              { value: "slate", label: "Slate", color: "#253858"},
              { value: "silver", label: "Silver", color: "#666666"},
            ]}
            // onSelect={(newValue) => { setSelectValue(newValue) }}
            // renderValue={(selected) => selected.value?.name}
            // options={[{name: ""}]}
          /> */}
                </div>

                <ATMTagsInput tags={tags} setTags={(value) => setTags(value)} />
            </div>

            <div>
                <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    First name
                </label>
                <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                />
            </div>
        </SideNavLayout>
    )
}

export default Test
