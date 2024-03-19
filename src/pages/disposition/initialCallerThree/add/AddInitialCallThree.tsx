import { FormikProps } from 'formik'
import React, { useEffect } from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddInitialCallThreeWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { setAllItems as setAllItemsdisposition } from 'src/redux/slices/configuration/initialCallerTwoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useGetAllinitialCallerTwoByIdQuery } from 'src/services/configurations/InitialCallerTwoServices'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
import { useGetAllinitialCallerOneQuery } from 'src/services/configurations/InitialCallerOneServices'
import {
    smstypeOptions,
    emailTypeOptions,
    complaintTypeOptions,
    returnTypeOptions,
} from 'src/utils/constants/customeTypes'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownoptions: {
        initialCallOneOptions: SelectOption[]
        initialCallTwoOptions?: SelectOption[]
    }
}

const AddInitialCallThree = ({
    formikProps,
    apiStatus,
    dropdownoptions,
}: Props) => {
    const { values, setFieldValue } = formikProps
    const [initialCalleOneOption, setInitialCalleOneOption] = React.useState<
        any[]
    >([])
    const dispatch = useDispatch()
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Initial Call Three',
            path: '/dispositions/initialcall-three',
        },
        {
            label: 'Add ',
        },
    ]

    const { allItems: allItemsDisposition }: any = useSelector(
        (state: RootState) => state?.initialCallerTwo
    )
    const {
        data: dispositionData,
        isFetching: dispositionisFetching,
        isLoading: dispositionisLoading,
    } = useGetAllinitialCallerTwoByIdQuery(
        {
            id: formikProps.values.initialCallOneId,
            callType: formikProps.values.callType,
        },
        {
            skip: !(
                formikProps.values.initialCallOneId &&
                formikProps.values.callType
            ),
        }
    )

    const { data, isFetching, isLoading } = useGetAllinitialCallerOneQuery(
        values.callType,
        {
            skip: !values.callType,
        }
    )

    useEffect(() => {
        if (!isLoading && !isFetching) {
            const filterOption = data?.data?.map((ele: any) => {
                return {
                    label: ele?.initialCallDisplayName,
                    value: ele?._id,
                }
            })
            setInitialCalleOneOption(filterOption)
        }
    }, [data, isLoading, isFetching, dispatch])

    dropdownoptions = {
        ...dropdownoptions,
        initialCallTwoOptions: allItemsDisposition?.map((ele: any) => {
            return {
                label: ele.initialCallDisplayName,
                value: ele._id,
            }
        }),
    }

    useEffect(() => {
        if (!dispositionisFetching && !dispositionisLoading) {
            dispatch(setAllItemsdisposition(dispositionData?.data))
        }
    }, [dispositionData, dispositionisLoading, dispositionisFetching, dispatch])

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
                <ATMPageHeading> Add </ATMPageHeading>
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
                            onClick={() => {
                                formikProps.handleSubmit()
                            }}
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
                        <div className="mt-2">
                            <ATMSelectSearchable
                                required
                                name="callType"
                                labelSpan="mb-2"
                                label="Call Type"
                                componentClass="mt-2"
                                value={values.callType}
                                options={complaintTypeOptions()}
                                onChange={(newValue: any) => {
                                    handleSetFieldValue('callType', newValue)
                                }}
                            />
                        </div>

                        {/* languageName */}
                        <ATMTextField
                            name="initialCallName"
                            required
                            value={values.initialCallName}
                            label="Initial Call Name"
                            placeholder="Name"
                            labelClass="text-slate-700 text-sm font-medium mt-1"
                            className="mt-1 rounded"
                            onChange={(e) =>
                                handleSetFieldValue(
                                    'initialCallName',
                                    e.target.value
                                )
                            }
                        />
                        <ATMSelectSearchable
                            options={initialCalleOneOption}
                            name="initialCallOneId"
                            required
                            value={values.initialCallOneId}
                            label="Initial Call One"
                            labelClass="text-slate-700 text-sm font-medium"
                            componentClass="mt-4 rounded"
                            onChange={(value) => {
                                handleSetFieldValue('initialCallOneId', value)
                            }}
                        />
                        <ATMSelectSearchable
                            options={
                                dropdownoptions.initialCallTwoOptions || []
                            }
                            name="initialCallTwoId"
                            required
                            value={values.initialCallTwoId}
                            label="Initial Call Two"
                            onChange={(value) =>
                                handleSetFieldValue('initialCallTwoId', value)
                            }
                        />
                        <ATMSelectSearchable
                            options={returnTypeOptions()}
                            name="returnType"
                            required
                            value={values.returnType}
                            label="Return Type"
                            onChange={(value) =>
                                handleSetFieldValue('returnType', value)
                            }
                            isMulti
                            isAllSelect
                        />
                        <ATMSelectSearchable
                            options={smstypeOptions()}
                            name="smsType"
                            required
                            value={values.smsType}
                            label="SMS Type"
                            onChange={(value) =>
                                handleSetFieldValue('smsType', value)
                            }
                        />

                        <ATMSelectSearchable
                            options={emailTypeOptions()}
                            name="emailType"
                            required
                            value={values.emailType}
                            label="Email Type"
                            onChange={(e) =>
                                handleSetFieldValue('emailType', e)
                            }
                        />

                        <div className="flex mt-2 gap-x-8">
                            <ATMCheckbox
                                label="Pnd"
                                extraClasses=""
                                required
                                labelClasses="select-none"
                                checked={values.isPnd}
                                onChange={(e) => setFieldValue('isPnd', e)}
                            />

                            <ATMCheckbox
                                label="Cancel Flag"
                                extraClasses=""
                                required
                                labelClasses="select-none"
                                checked={values.cancelFlag}
                                onChange={(e) => setFieldValue('cancelFlag', e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddInitialCallThree
