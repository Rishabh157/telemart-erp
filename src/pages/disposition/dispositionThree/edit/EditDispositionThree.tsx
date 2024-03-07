import React, { useState, useEffect } from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './EditDispositionThreeWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useDispatch } from 'react-redux'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import {
    smstypeOptions,
    priorityOptions,
    emailTypeOptions,
    whatsappTypeOptions,
    applicableCriteriaOptionsType,
} from 'src/utils/constants/customeTypes'
import { useGetDispostionTwoByOneQuery } from 'src/services/configurations/DispositionTwoServices'
import { DispositionTwoListResponse } from 'src/models/configurationModel/DispositionTwo.model'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        DispotionOneOptions: SelectOption[]
        // DispositionTwoOptions: SelectOption[]
    }
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: ' Disposition Three',
        path: '/dispositions/disposition-three',
    },
    {
        label: 'Edit',
    },
]

const EditDispositionThree = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps
    const [dispositionTwoOptions, setDispositionTwoOptions] = useState<any[]>(
        []
    )

    dropdownOptions = {
        ...dropdownOptions,
    }
    const dispatch = useDispatch()

    const {
        isLoading: isDTLoading,
        isFetching: isDTFetching,
        data: DtData,
    } = useGetDispostionTwoByOneQuery(values.dispositionOneId, {
        skip: !values.dispositionOneId,
    })

    useEffect(() => {
        if (!isDTLoading && !isDTFetching) {
            const filteredDispositionTwo = DtData?.data?.map(
                (dispositionTwo: DispositionTwoListResponse) => {
                    return {
                        label: dispositionTwo.dispositionDisplayName,
                        value: dispositionTwo._id,
                    }
                }
            )

            setDispositionTwoOptions(filteredDispositionTwo || [])
        }
    }, [isDTLoading, isDTFetching, DtData])

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
                <ATMPageHeading>Edit</ATMPageHeading>
            </div>

            <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                    {/* Form Heading */}
                    <div className="text-xl font-medium">Details</div>

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
                            Update
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="grow py-8 px-3 ">
                    <div className="grid grid-cols-3 gap-4">
                        {/* FirstName */}
                        <ATMTextField
                            readOnly
                            disabled
                            name="dispositionName"
                            value={values.dispositionDisplayName}
                            label="Disposition Name"
                            required
                            placeholder="Disposition Name"
                            onChange={(e) => {
                                handleSetFieldValue(
                                    'dispositionName',
                                    e.target.value
                                )
                            }}
                        />
                        <ATMSelectSearchable
                            name="dispositionOneId"
                            required
                            value={values.dispositionOneId}
                            onChange={(e) =>
                                handleSetFieldValue('dispositionOneId', e)
                            }
                            options={dropdownOptions.DispotionOneOptions}
                            label="Disposition One"
                        />

                        <div className="">
                            <ATMSelectSearchable
                                name="dispositionTwoId"
                                required
                                value={values.dispositionTwoId}
                                onChange={(e) =>
                                    handleSetFieldValue('dispositionTwoId', e)
                                }
                                options={dispositionTwoOptions}
                                label="Disposition Two"
                            />
                        </div>

                        <ATMSelectSearchable
                            name="smsType"
                            value={values.smsType}
                            onChange={(e) => handleSetFieldValue('smsType', e)}
                            options={smstypeOptions()}
                            label="SMS Type"
                        />

                        <ATMSelectSearchable
                            name="emailType"
                            value={values.emailType}
                            onChange={(e) =>
                                handleSetFieldValue('emailType', e)
                            }
                            options={emailTypeOptions()}
                            label="Email Type"
                        />
                        <ATMSelectSearchable
                            name="whatsApp"
                            value={values.whatsApp}
                            onChange={(e) => handleSetFieldValue('whatsApp', e)}
                            options={whatsappTypeOptions()}
                            label="Whatsapp Template"
                        />

                        <ATMSelectSearchable
                            name="priority"
                            value={values.priority}
                            onChange={(e) => handleSetFieldValue('priority', e)}
                            options={priorityOptions()}
                            label="Priority"
                        />

                        <ATMSelectSearchable
                            name="applicableCriteria"
                            required
                            value={values.applicableCriteria}
                            onChange={(e) =>
                                handleSetFieldValue('applicableCriteria', e)
                            }
                            options={applicableCriteriaOptionsType()}
                            label="Applicable Criteria"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDispositionThree
