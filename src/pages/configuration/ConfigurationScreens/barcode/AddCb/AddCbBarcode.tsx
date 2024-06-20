/// ==============================================
// Filename:AddCbBarcode.tsx
// Type: ADD Component
// Last Updated: JUNE 24, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddCbWrapper'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { useDispatch } from 'react-redux'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    cartonBoxOption: SelectOption[]
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Barcode',
        path: '/configurations/barcode',
    },
    {
        label: 'Add Barcode',
    },
]

const AddCbBarcode = ({ formikProps, apiStatus, cartonBoxOption }: Props) => {
    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="h-[calc(100vh-55px)] overflow-auto">
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Product Group </ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            {' '}
                            Product Group
                        </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-3 py-8 grow ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Product Group  */}
                            <ATMSelect
                                name="cartonBox"
                                value={values.cartonBox}
                                label="Carton Box"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'cartonBox',
                                        e.target.value
                                    )
                                }
                                options={cartonBoxOption}
                            />

                            {/* Quantity  */}
                            <ATMTextField
                                name="quantity"
                                value={values.quantity}
                                label="Quantity"
                                placeholder="Quantity"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'quantity',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCbBarcode
