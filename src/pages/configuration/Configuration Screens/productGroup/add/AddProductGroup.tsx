import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddProductGroupWrapper'

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
                    <div className="grow pb-9 pt-2 px-3 ">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Product Group Name  */}
                            <ATMTextField
                                name="groupName"
                                value={values.groupName}
                                label="Group Name"
                                placeholder="Group Name"
                                onChange={(e) =>
                                    setFieldValue('groupName', e.target.value)
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
                                        setFieldValue(
                                            'dealerSalePrice',
                                            e.target.value
                                        )
                                    }
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {/* <ATMTextField
                                name="gst"
                                value={values.gst}
                                label="Good Services Taxes"
                                placeholder="GST Per(%)"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        setFieldValue('gst', e.target.value)
                                    }
                                }}
                            /> */}
                            <ATMTextField
                                name="cgst"
                                value={values.cgst}
                                label=" Central GST (%)"
                                placeholder="CGST (%)"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        setFieldValue('cgst', e.target.value)
                                    }
                                }}
                            />
                            <ATMTextField
                                name="sgst"
                                value={values.sgst}
                                label="State GST (%)"
                                placeholder="SGST (%)"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        setFieldValue('sgst', e.target.value)
                                    }
                                }}
                            />
                            <ATMTextField
                                name="utgst"
                                value={values.utgst}
                                label="Union Territory GST (%)"
                                placeholder="UTGST (%)"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        setFieldValue('utgst', e.target.value)
                                    }
                                }}
                            />
                            <ATMTextField
                                name="igst"
                                value={values.igst}
                                label="Integrated GST (%)"
                                placeholder=" IGST (%)"
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (!isNaN(Number(inputValue))) {
                                        setFieldValue('igst', e.target.value)
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
