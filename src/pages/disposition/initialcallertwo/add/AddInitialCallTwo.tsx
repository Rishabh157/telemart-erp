import React, { useState, useEffect } from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddInitialCallTwoWrapper'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useDispatch } from 'react-redux'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useGetAllinitialCallerOneQuery } from 'src/services/configurations/InitialCallerOneServices'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddInitialCallTwo = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const [initicalCallOneOptions, setiniticalCallOneOptions] = useState<
        SelectOption[]
    >([])
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Initial Call',
            path: '/dispositions/initialCall-two',
        },
        {
            label: 'Add',
        },
    ]
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    const { data, isFetching, isLoading } = useGetAllinitialCallerOneQuery(
        values.callType,
        {
            skip: !values.callType,
        }
    )

    useEffect(() => {
        if (!isFetching && !isLoading) {
            const filterOption = data?.data?.map((ele: any) => {
                return {
                    label: ele.initialCallName,
                    value: ele._id,
                }
            })
            setiniticalCallOneOptions(filterOption || [])
        }
    }, [isFetching, isLoading, data, dispatch])

    return (
        <>
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
                                <div className="mt-2">
                                    <ATMSelectSearchable
                                        name="callType"
                                        labelSpan="mb-2"
                                        label="Call Type"
                                        componentClass="mt-2"
                                        value={values.callType}
                                        options={[
                                            {
                                                label: 'Complaint',
                                                value: 'COMPLAINT',
                                            },
                                            {
                                                label: 'Inquiry',
                                                value: 'INQUIRY',
                                            },
                                        ]}
                                        onChange={(newValue: any) => {
                                            handleSetFieldValue(
                                                'callType',
                                                newValue
                                            )
                                        }}
                                    />
                                </div>

                                {/* initialcall one */}
                                <ATMSelectSearchable
                                    options={initicalCallOneOptions}
                                    name="initialCallOneId"
                                    value={values.initialCallOneId}
                                    label="Initial Call One"
                                    onChange={(e) =>
                                        handleSetFieldValue(
                                            'initialCallOneId',
                                            e
                                        )
                                    }
                                />
                                <ATMTextField
                                    name="initialCallName"
                                    value={values.initialCallName}
                                    placeholder="Name"
                                    label="Initial Call  Name"
                                    onChange={(e) =>
                                        handleSetFieldValue(
                                            'initialCallName',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddInitialCallTwo
