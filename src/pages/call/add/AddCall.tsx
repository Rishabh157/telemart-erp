import React from 'react'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddCallWrapper'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Call',
        path: '/call',
    },
    {
        label: 'Add ',
    },
]

const AddCall = ({ formikProps, apiStatus }: Props) => {
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
                        <div className="text-xl font-medium">
                            {' '}
                     Details
                        </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow pt-2 pb-9  px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Field1 */}

                            {/* Field 3 */}
                            <ATMTextField
                                name="name"
                                value={values.name}
                                label="Name"
                                placeholder=" Name"
                                onChange={(e) =>
                                    setFieldValue('name', e.target.value)
                                }
                            />

                            {/* Field 3 */}
                            <ATMTextField
                                name="schemeId"
                                value={values.schemeId}
                                label="Scheme"
                                onChange={(e) =>
                                    setFieldValue('schemeId', e.target.value)
                                }
                            />
                              <ATMDatePicker
                                        name="startDate"
                                        value={values.startDate}
                                        dateTimeFormat="MM/DD/YY ddd"
                                        label="Start Date"
                                        onChange={(newValue) =>
                                            setFieldValue(
                                                "startDate",newValue)}
                             />
                                <ATMDatePicker
                                        name="endDate"
                                        value={values.startDate}
                                        dateTimeFormat="MM/DD/YY ddd"
                                        label="End Date"
                                        onChange={(newValue) =>
                                            setFieldValue(
                                                "endDate",newValue)}
                             />
                        </div>
                          
                    </div>
                        
                    </div>
                </div>
            </div>
        
    )
}

export default AddCall
