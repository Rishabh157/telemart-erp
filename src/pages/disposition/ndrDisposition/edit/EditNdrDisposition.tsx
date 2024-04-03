import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './EditNdrDispositionWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import {
    smstypeOptions,
    emailTypeOptions,
    priorityOptions,
    ndrSubDispositionsTypeOptions,
    rtoAttemptTypeOptions,
} from 'src/utils/constants/customeTypes'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const EditNdrDisposition = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'NDR Disposition',
            path: '/dispositions/ndr-disposition',
        },
        {
            label: 'Edit',
        },
    ]
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="flex flex-col gap-2 p-4 ">
            {/* Breadcrumbs */}
            <div className="">
                <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page Heading */}
            <div className="pt-1">
                <ATMPageHeading>Edit </ATMPageHeading>
            </div>

            <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
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
                            Update
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="px-3 py-8 grow ">
                    <div className="grid grid-cols-3 gap-4">
                        {/* languageName */}
                        <ATMTextField
                            required
                            readOnly
                            disabled
                            name="dispositionName"
                            value={values.dispositionName}
                            label="Disposition Name"
                            placeholder="Name"
                            onChange={(e) =>
                                handleSetFieldValue(
                                    'dispositionName',
                                    e.target.value
                                )
                            }
                        />
                        <ATMSelectSearchable
                            required
                            options={smstypeOptions()}
                            name="smsType"
                            value={values.smsType}
                            label="Sms Type"
                            onChange={(e) => handleSetFieldValue('smsType', e)}
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
                            name="priority"
                            value={values.priority}
                            label="Priority"
                            options={priorityOptions()}
                            onChange={(e) => handleSetFieldValue('priority', e)}
                        />
                        <ATMSelectSearchable
                            required
                            isMulti
                            options={ndrSubDispositionsTypeOptions()}
                            name="subDispositions"
                            value={values.subDispositions}
                            label="Sub Disposition"
                            onChange={(e) =>
                                handleSetFieldValue('subDispositions', e)
                            }
                        />

                        <ATMSelectSearchable
                            required
                            options={rtoAttemptTypeOptions()}
                            name="rtoAttempt"
                            value={values.rtoAttempt}
                            label="Rto Attempt"
                            onChange={(e) =>
                                handleSetFieldValue('rtoAttempt', e)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditNdrDisposition
