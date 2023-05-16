import { FormikProps } from 'formik'
import React from 'react'
import { FormInitialValues } from './AddDidManagementWrapper'
import ATMBreadCrumbs, { BreadcrumbType } from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: ' Did Management',
        path: '/did',
    },
    {
        label: 'Add Did Management',
    },
]

const AddDidManagements = ({ formikProps, apiStatus }: Props) => {
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
                <ATMPageHeading> Add New User </ATMPageHeading>
            </div>

            <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                    {/* Form Heading */}
                    <div className="text-xl font-medium"> User Details</div>

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
                            Add User
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="grow py-8 px-3 ">
                    <div className="grid grid-cols-3 gap-4">
                        {/* FirstName */}
                        <ATMTextField
                            name="didNumber"
                            value={values.didNumber}
                            label="Did Number"
                            placeholder="Did Number"
                            onChange={(e) =>
                                setFieldValue('didNumber', e.target.value)
                            }
                        />
                            
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    )
}

export default AddDidManagements
