import React from 'react'
import { FormInitialValues } from './ChangeCourierRequestStatusWrapper'
import { FormikProps } from 'formik'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { getCourierRtoRequestStatusOptions } from 'src/utils/constants/customeTypes'
import { showToast } from 'src/utils'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const ChangeCourierReturnRequestStatus = ({
    formikProps,
    apiStatus,
}: Props) => {
    const { values, setFieldValue } = formikProps
    return (
        <div className="h-[calc(40vh-55px)]">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">
                            Change Request Status
                        </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={values.requestStatus === values.currentStatus ? true : apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${values.requestStatus === values.currentStatus || apiStatus ? 'opacity-50' : ''
                                    }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-2 pb-8 px-3 ">
                        <div className="grid grid-cols-1 gap-4">
                            <ATMSelectSearchable
                                required
                                label="Status"
                                name="requestStatus"
                                value={values.requestStatus}
                                options={getCourierRtoRequestStatusOptions()}
                                selectLabel="Select status"
                                onChange={(e) => {
                                    if (values.requestStatus !== e) {
                                        setFieldValue('requestStatus', e)
                                    } else {
                                        showToast('error', 'Already Selected')
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

export default ChangeCourierReturnRequestStatus
