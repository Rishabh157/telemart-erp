/// ==============================================
// Filename:AddItem.tsx
// Type: Add Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddItemWrapper'
import { useDispatch } from 'react-redux'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Items',
        path: '/configurations/item',
    },
    {
        label: 'Add ',
    },
]

const AddItem = ({ formikProps }: Props) => {
    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className=" h-[calc(100vh-55px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Items </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                onClick={() => formikProps.handleSubmit()}
                                className="bg-primary-main rounded py-1 px-5 text-white border border-primary-main "
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow pb-9 pt-2 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* itemCode */}
                            <ATMTextField
                                required
                                name="itemCode"
                                value={values.itemCode}
                                label="Item Code"
                                placeholder="Item Code"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'itemCode',
                                        e.target.value
                                    )
                                }
                            />
                            {/* itemName */}
                            <ATMTextField
                                required
                                name="itemName"
                                value={values.itemName}
                                label="Item Name"
                                placeholder="Item Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'itemName',
                                        e.target.value
                                    )
                                }
                            />
                            {/* itemWeight */}
                            <ATMTextField
                                required
                                name="itemWeight"
                                value={values.itemWeight}
                                label="Item Weight (in gms)"
                                placeholder="Item Weight"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'itemWeight',
                                            inputValue
                                        )
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItem
