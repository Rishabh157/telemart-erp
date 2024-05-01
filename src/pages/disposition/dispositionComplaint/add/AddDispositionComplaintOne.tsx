// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddDispositionComplaintWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import {
    smstypeOptions,
    emailTypeOptions,
    priorityOptions,
} from 'src/utils/constants/customeTypes'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { handleValidCharchater } from 'src/utils/methods/charchterMethods'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddDispositionComplaint = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Disposition Comaplaint',
            path: '/dispositions/disposition-complaint',
        },
        {
            label: 'Add ',
        },
    ]
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
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
                    <div className="text-xl font-medium"> Details </div>

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
                <div className="grow py-8 px-3 ">
                    <div className="grid grid-cols-3 gap-4">
                        {/* languageName */}
                        <ATMTextField
                            required
                            name="dispositionName"
                            value={values.dispositionName}
                            label="Disposition Name"
                            placeholder="Name"
                            onChange={(e: any) => {
                                // Check if the pressed key is backspace
                                if (
                                    e.nativeEvent.inputType ===
                                    'deleteContentBackward'
                                ) {
                                    // If backspace, remove the last character
                                    handleSetFieldValue(
                                        'dispositionName',
                                        e.target.value
                                    )
                                } else {
                                    // If not backspace, perform character validation
                                    if (!values.dispositionName) {
                                        handleSetFieldValue(
                                            'dispositionName',
                                            e.target.value
                                        )
                                    } else {
                                        handleValidCharchater(e) &&
                                            handleSetFieldValue(
                                                'dispositionName',
                                                e.target.value
                                            )
                                    }
                                }
                            }}
                        />
                        <ATMSelectSearchable
                            required
                            options={emailTypeOptions()}
                            name="emailType"
                            value={values.emailType}
                            label="Email Type"
                            onChange={(e) =>
                                handleSetFieldValue('emailType', e)
                            }
                        />
                        <ATMSelectSearchable
                            required
                            options={smstypeOptions()}
                            name="smsType"
                            value={values.smsType}
                            label="SMS Type "
                            onChange={(e) => handleSetFieldValue('smsType', e)}
                        />
                        <ATMSelectSearchable
                            required
                            options={priorityOptions()}
                            name="priority"
                            value={values.priority}
                            label="Priority"
                            onChange={(e) => handleSetFieldValue('priority', e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDispositionComplaint
