/// ==============================================
// Filename:AddAssetsAllocation.tsx
// Type: Add Component
// Last Updated: JUNE 22, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

const AddAsstesAllocation = () => {
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Assets Allocation',
            path: '/assets/assets-allocation',
        },
        {
            label: 'Add ',
        },
    ]
    // const dispatch = useDispatch()
    // const handleSetFieldValue = (name: string, value: string) => {
    //     setFieldValue(name, value)
    //     dispatch(setFieldCustomized(true))
    // }
    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details</div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                // onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow pt-2 pb-9 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Field1 */}

                            {/* Field 3 */}
                            <ATMTextField
                                name=""
                                value={''}
                                label="Name"
                                placeholder="Name"
                                onChange={()=>{}}
                                // onChange={() =>handleSetFieldValue("","")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAsstesAllocation
