import React, { useEffect } from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './EditInitialCallThreeWrapper'
import { FormikProps } from 'formik'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useGetAllinitialCallerTwoByIdQuery } from 'src/services/configurations/InitialCallerTwoServices'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { setAllItems as setAllItemsdisposition } from 'src/redux/slices/configuration/initialCallerTwoSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useGetAllinitialCallerOneQuery } from 'src/services/configurations/InitialCallerOneServices'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownoptions: {
        initialCallOneOptions: SelectOption[]
        initialCallTwoOptions?: SelectOption[]
        complainttypeOptions: SelectOption[]
        smstypeOptions: SelectOption[]
        returntypeOptions: SelectOption[]
        emailTypeOptions: SelectOption[]
    }
}

const EditInitialCallThree = ({
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
            label: 'Edit',
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
                    label: ele?.initialCallName,
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
                label: ele.initialCallName,
                value: ele._id,
            }
        }),
    }

    useEffect(() => {
        if (!dispositionisFetching && !dispositionisLoading) {
            dispatch(setAllItemsdisposition(dispositionData?.data || []))
        }
    }, [dispositionData, dispositionisLoading, dispositionisFetching, dispatch])

    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
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
                        <ATMPageHeading>Edit </ATMPageHeading>
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
                                    Update
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
                                        options={
                                            dropdownoptions.complainttypeOptions
                                        }
                                        onChange={(newValue: any) => {
                                            handleSetFieldValue(
                                                'callType',
                                                newValue
                                            )
                                        }}
                                    />
                                </div>

                                {/* languageName */}
                                <ATMTextField
                                    name="initialCallName"
                                    value={values.initialCallName}
                                    required
                                    label="Initial Call Name"
                                    placeholder="Name"
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
                                    onChange={(value) => {
                                        handleSetFieldValue(
                                            'initialCallOneId',
                                            value
                                        )
                                    }}
                                />
                                <ATMSelectSearchable
                                    options={
                                        dropdownoptions.initialCallTwoOptions ||
                                        []
                                    }
                                    name="initialCallTwoId"
                                    required
                                    value={values.initialCallTwoId}
                                    label="Initial Call Two"
                                    onChange={(value) =>
                                        handleSetFieldValue(
                                            'initialCallTwoId',
                                            value
                                        )
                                    }
                                />
                                <ATMSelectSearchable
                                    options={dropdownoptions.returntypeOptions}
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
                                    options={dropdownoptions.smstypeOptions}
                                    name="smsType"
                                    required
                                    value={values.smsType}
                                    label="SMS Type"
                                    onChange={(value) =>
                                        handleSetFieldValue('smsType', value)
                                    }
                                />

                                <ATMSelectSearchable
                                    options={dropdownoptions.emailTypeOptions}
                                    name="emailType"
                                    required
                                    value={values.emailType}
                                    label="Email Type"
                                    onChange={(e) =>
                                        handleSetFieldValue('emailType', e)
                                    }
                                />

                                <div className="mt-2 flex gap-x-8">
                                    <ATMCheckbox
                                        label="Pnd"
                                        extraClasses=""
                                        required
                                        labelClasses="select-none"
                                        checked={values.isPnd}
                                        onChange={(e) =>
                                            setFieldValue('isPnd', e)
                                        }
                                    />

                                    <ATMCheckbox
                                        label="Cancel Flag"
                                        extraClasses=""
                                        required
                                        labelClasses="select-none"
                                        checked={values.cancelFlag}
                                        onChange={(e) =>
                                            setFieldValue('cancelFlag', e)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditInitialCallThree
