/// ==============================================
// Filename:AddInfluencer.tsx
// Type: ADD Component
// Last Updated: JULY 06, 2023
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
import { FormInitialValues } from './AddInfluencerWrapper'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'


// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Influencer',
        path: '/all-websites/influencers-management',
    },
    {
        label: 'Add ',
    },
]

const AddInfluencer = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <div className="">
            <div className="p-4 flex flex-col gap-4  ">
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
                            <ATMSelectSearchable
                                options={[]}
                                name="schemeId"
                                value={values.schemeId}
                                label="Scheme"
                                onChange={(e) => setFieldValue('schemeId', e)}
                            />
                            <div className="mt-4">
                                <ATMDatePicker
                                    name="startDate"
                                    value={values.startDate}
                                    dateTimeFormat="MM/DD/YY ddd"
                                    label="Start Date"
                                    onChange={(newValue) =>
                                        setFieldValue('startDate', newValue)
                                    }
                                />
                            </div>
                            <ATMDatePicker
                                name="endDate"
                                value={values.endDate}
                                dateTimeFormat="MM/DD/YY ddd"
                                label="End Date"
                                onChange={(newValue) =>
                                    setFieldValue('endDate', newValue)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddInfluencer
