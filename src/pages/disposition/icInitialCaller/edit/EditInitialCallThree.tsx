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

    const dispatch = useDispatch()
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Intial Call Three',
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
        formikProps.values.initialCallOneId,
        { skip: !formikProps.values.initialCallOneId }
    )

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
                                {/* languageName */}
                                <ATMTextField
                                    name="initialCallName"
                                    value={values.initialCallName}
                                    label="Initial Call Name"
                                    placeholder="Name"
                                    onChange={(e) =>
                                        setFieldValue(
                                            'initialCallName',
                                            e.target.value
                                        )
                                    }
                                />
                                <ATMSelectSearchable
                                    options={
                                        dropdownoptions.initialCallOneOptions ||
                                        []
                                    }
                                    name="initialCallOneId"
                                    required
                                    value={values.initialCallOneId}
                                    label="Initial Call One"
                                    onChange={(value) => {
                                        console.log(value)
                                        setFieldValue('initialCallOneId', value)
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
                                        setFieldValue('initialCallTwoId', value)
                                    }
                                />
                                <ATMSelectSearchable
                                    options={dropdownoptions.returntypeOptions}
                                    name="returnType"
                                    required
                                    value={values.returnType}
                                    label="Return Type"
                                    onChange={(value) =>
                                        setFieldValue('returnType', value)
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
                                        setFieldValue('smsType', value)
                                    }
                                />

                                <ATMSelectSearchable
                                    options={dropdownoptions.emailTypeOptions}
                                    name="emailType"
                                    value={values.emailType}
                                    label="Email Type"
                                    onChange={(e) =>
                                        setFieldValue('emailType', e)
                                    }
                                />
                                <ATMSelectSearchable
                                    options={
                                        dropdownoptions.complainttypeOptions
                                    }
                                    name="complaintType"
                                    value={values.complaintType}
                                    label="Complaint Type"
                                    onChange={(e) =>
                                        setFieldValue('complaintType', e)
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

export default EditInitialCallThree
