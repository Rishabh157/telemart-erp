// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddProductGroupWrapper'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Product Group',
        path: '/configurations/product-group',
    },
    {
        label: 'Add ',
    },
]

const AddProductGroup = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
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
                    <ATMPageHeading> Add </ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Details</div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => {
                                    formikProps.handleSubmit()
                                }}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grid gap-4 px-3 pt-2 grow pb-9 ">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Product Group Name  */}
                            <ATMTextField
                                required
                                name="groupName"
                                value={values.groupName}
                                label="Group Name"
                                placeholder="Group Name"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'groupName',
                                        e.target.value
                                    )
                                }
                            />
                            <ATMTextField
                                name="dealerSalePrice"
                                value={values.dealerSalePrice}
                                label="Dealer Sale Price"
                                placeholder="Dealer Sale Price"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'dealerSalePrice',
                                            e.target.value
                                        )
                                    }
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <ATMTextField
                                name="cgst"
                                value={values.cgst}
                                label="Central GST (%)"
                                placeholder="CGST (%)"
                                textTransform=""
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'cgst',
                                            e.target.value
                                        )
                                    }
                                }}
                            />
                            <ATMTextField
                                name="sgst"
                                value={values.sgst}
                                label="State GST (%)"
                                placeholder="SGST (%)"
                                textTransform=""
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'sgst',
                                            e.target.value
                                        )
                                    }
                                }}
                            />
                            <ATMTextField
                                name="utgst"
                                value={values.utgst}
                                label="Union Territory GST (%)"
                                placeholder="UTGST (%)"
                                textTransform=""
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'utgst',
                                            e.target.value
                                        )
                                    }
                                }}
                            />
                            <ATMTextField
                                name="igst"
                                value={values.igst}
                                label="Integrated GST (%)"
                                placeholder=" IGST (%)"
                                textTransform=""
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        handleSetFieldValue(
                                            'igst',
                                            e.target.value
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
export default AddProductGroup
