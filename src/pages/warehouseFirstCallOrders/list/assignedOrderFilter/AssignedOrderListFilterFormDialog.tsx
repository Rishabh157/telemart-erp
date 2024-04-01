import React, { useState, useEffect } from 'react'
import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { FormInitialValues } from './AssignedOrderListFilterFormDialogWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'

// hooks
import useStateDistricts from 'src/hooks/useDistrictsByState'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetAllState } from 'src/hooks/useGetAllState'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

// models
import { SelectOption } from 'src/models/FormField/FormField.model'
import { StateListResponse } from 'src/models/State.model'
import { DistrictListResponse } from 'src/models/District.model'
import { SchemeListResponse } from 'src/models/scheme.model'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { CallCenterMasterListResponse } from 'src/models'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    onReset: () => void
    open: boolean
    onClose: () => void
}

const AssignedOrderListFilterFormDialog = ({
    open,
    formikProps,
    onReset,
    onClose,
}: Props) => {
    const { values, setFieldValue, isSubmitting, handleSubmit } = formikProps
    const { userData } = useGetLocalStorage()
    // options
    const [allSchemes, setAllSchemes] = useState<SelectOption[]>([])
    const [allState, setAllState] = useState<SelectOption[]>([])
    const [allDistrict, setAllDistrict] = useState<SelectOption[]>([])
    const [allCallCenter, setAllCallCenter] = useState<SelectOption[]>([])

    // Hooks
    const {
        isLoading: isSchemesLoading,
        isFetching: isSchemesFetching,
        data: schemesData,
    } = useGetSchemeQuery(userData?.companyId, {
        skip: !userData?.companyId,
    })
    const { state, isLoading } = useGetAllState()
    const { stateDistricts, isDataLoading } = useStateDistricts(values?.stateId)

    const {
        isLoading: isCallCenterLoading,
        isFetching: isCallCenterFetching,
        data: callCenterData,
    } = useGetAllCallCenterMasterQuery(userData?.companyId, {
        skip: !userData?.companyId,
    })

    // set call center managers
    useEffect(() => {
        if (!isCallCenterLoading && !isCallCenterFetching) {
            const allCallCenterListOption: SelectOption[] =
                callCenterData?.data?.map(
                    (ele: CallCenterMasterListResponse) => {
                        return {
                            label: ele?.callCenterName,
                            value: ele?._id,
                        }
                    }
                )
            setAllCallCenter(allCallCenterListOption)
        }
    }, [isCallCenterLoading, isCallCenterFetching, callCenterData])

    // set schemes
    useEffect(() => {
        if (!isSchemesLoading && !isSchemesFetching) {
            const allSchemesListOption: SelectOption[] = schemesData?.data?.map(
                (ele: SchemeListResponse) => {
                    return {
                        label: ele?.schemeName,
                        value: ele?._id,
                    }
                }
            )
            setAllSchemes(allSchemesListOption)
        }
    }, [isSchemesLoading, isSchemesFetching, schemesData])

    // set states
    useEffect(() => {
        if (!isLoading) {
            const allStateListOption: SelectOption[] = state?.map(
                (ele: StateListResponse) => {
                    return {
                        label: ele?.stateName,
                        value: ele?._id,
                    }
                }
            )
            setAllState(allStateListOption)
        }
    }, [isLoading, state])

    // set districts
    useEffect(() => {
        if (!isDataLoading) {
            const allDistrictListOption: SelectOption[] = stateDistricts?.map(
                (ele: DistrictListResponse) => {
                    return {
                        label: ele?.districtName,
                        value: ele?._id,
                    }
                }
            )
            setAllDistrict(allDistrictListOption)
        }
    }, [isDataLoading, stateDistricts])

    return (
        <div className="flex flex-col gap-4 px-4 py-2">
            {/* Heading & Clear Button */}
            <div className="flex justify-between items-center sticky top-0 z-50 bg-white">
                <div className="text-xl font-medium"> Filter </div>
                <button
                    type="button"
                    className="text-red-600 hover:text-red-400 font-medium"
                    onClick={onReset}
                >
                    Clear Filters
                </button>
            </div>

            <div className="grid grid-cols-2 gap-x-6">
                <ATMSelectSearchable
                    label="Scheme"
                    selectLabel="Select scheme"
                    name="schemeId"
                    value={values.schemeId}
                    options={allSchemes}
                    isLoading={isSchemesLoading}
                    onChange={(e) => {
                        setFieldValue('schemeId', e || '')
                    }}
                />

                {/* Order Type */}
                <ATMSelectSearchable
                    label="Order Type"
                    isDisabled
                    selectLabel="Select order type"
                    name="orderType"
                    value={values.orderType}
                    options={[
                        {
                            label: 'amazone',
                            value: '774909789',
                        },
                        {
                            label: 'mg1',
                            value: '767768976',
                        },
                    ]}
                    // isLoading={isLoading}
                    onChange={(e) => {
                        setFieldValue('orderType', e || '')
                    }}
                />

                <ATMSelectSearchable
                    label="State"
                    selectLabel="Select state"
                    name="stateId"
                    value={values.stateId}
                    options={allState}
                    isLoading={isLoading}
                    onChange={(e) => {
                        setFieldValue('stateId', e || '')
                    }}
                />

                <ATMSelectSearchable
                    label="District"
                    selectLabel="Select district"
                    name="districtId"
                    value={values.districtId}
                    options={allDistrict}
                    isLoading={isDataLoading}
                    onChange={(e) => {
                        setFieldValue('districtId', e || '')
                    }}
                />

                {/* From */}
                <div className="mt-4">
                    <ATMDatePicker
                        label="Date From"
                        name="startDate"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.startDate}
                        onChange={(newValue) =>
                            setFieldValue('startDate', newValue)
                        }
                    />
                </div>

                {/* To */}
                <div className="mt-4">
                    <ATMDatePicker
                        label="Date To"
                        name="endDate"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.endDate}
                        minDate={values?.startDate}
                        onChange={(newValue) =>
                            setFieldValue('endDate', newValue)
                        }
                    />
                </div>
                {/* Callback date */}
                <div className="mt-4">
                    <ATMDatePicker
                        label="Callback From"
                        name="callBackFrom"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.callBackFrom}
                        onChange={(newValue) =>
                            setFieldValue('callBackFrom', newValue)
                        }
                    />
                </div>
                <div className="mt-4">
                    <ATMDatePicker
                        label="Callback To"
                        name="callBackTo"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.callBackTo}
                        minDate={values?.callBackFrom}
                        onChange={(newValue) =>
                            setFieldValue('callBackTo', newValue)
                        }
                    />
                </div>

                {/* Order Type */}
                <ATMSelectSearchable
                    label="Call Center Manager"
                    selectLabel="Select Call Center Manager"
                    name="callCenterManagerId"
                    textTransform="capitalize"
                    value={values.callCenterManagerId}
                    isLoading={isCallCenterLoading}
                    options={allCallCenter}
                    onChange={(e) => {
                        setFieldValue('callCenterManagerId', e || '')
                    }}
                />

                <div className="flex gap-x-8">
                    <ATMSwitchButton
                        name="languageBarrier"
                        value={values.languageBarrier}
                        label="Language Barrier"
                        onChange={(value: any) => {
                            setFieldValue('languageBarrier', value)
                        }}
                    />
                    <ATMSwitchButton
                        name="isPnd"
                        value={values.isPnd}
                        label="Pnd Orders"
                        onChange={(value: any) => {
                            setFieldValue('isPnd', value)
                        }}
                    />
                </div>
            </div>

            {/* Is Active Filter */}
            {/* <ATMRadioButtonGroup
                name="isActive"
                label="User Status"
                required={false}
                value={values.isActive}
                options={[
                    {
                        label: 'Active',
                        value: 'ACTIVE',
                    },
                    {<
                        label: 'Deactive',
                        value: 'DE_ACTIVATE',
                    },
                ]}
                onChange={(newValue: any) => {
                    setFieldValue('isActive', newValue)
                }}
            /> */}

            {/* Apply & Cancel Buttons */}
            <div className="flex gap-2  sticky bottom-0 bg-white mt-4">
                <ATMLoadingButton
                    className="bg-slate-300 w-1/2 hover:bg-gray-200 transition-all h-[40px] border-none text-slate-700 font-medium"
                    onClick={onClose}
                >
                    Cancel
                </ATMLoadingButton>

                <ATMLoadingButton
                    type="submit"
                    className="h-[40px] w-1/2 hover:bg-[#396396]"
                    isLoading={isSubmitting}
                    onClick={() => handleSubmit()}
                >
                    Apply
                </ATMLoadingButton>
            </div>
        </div>
    )
}

export default AssignedOrderListFilterFormDialog
