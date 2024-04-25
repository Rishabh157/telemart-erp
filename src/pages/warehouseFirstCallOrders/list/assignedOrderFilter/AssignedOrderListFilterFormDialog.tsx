import React from 'react'
import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { FormInitialValues } from './AssignedOrderListFilterFormDialogWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'

// hooks
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

// models
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'
import { useGetAllStateQuery } from 'src/services/StateService'

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

    // Hooks
    const { options: schemeOptions } = useCustomOptions({
        useEndPointHook: useGetSchemeQuery(''),
        keyName: 'schemeName',
        value: '_id',
    })

    const { options: callCenterOptions } = useCustomOptions({
        useEndPointHook: useGetAllCallCenterMasterQuery(userData?.companyId, {
            skip: !userData?.companyId,
        }),
        keyName: 'callCenterName',
        value: '_id',
    })

    const { options: stateOptions } = useCustomOptions({
        useEndPointHook: useGetAllStateQuery(''),
        keyName: 'stateName',
        value: '_id',
    })

    const { options: districtOptions } = useCustomOptions({
        useEndPointHook: useGetAllDistrictByStateQuery(values.stateId),
        keyName: 'districtName',
        value: '_id',
    })

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
                    options={schemeOptions}
                    // isLoading={isSchemesLoading}
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
                    options={stateOptions}
                    // isLoading={isLoading}
                    onChange={(e) => {
                        setFieldValue('stateId', e || '')
                    }}
                />

                <ATMSelectSearchable
                    label="District"
                    selectLabel="Select district"
                    name="districtId"
                    value={values.districtId}
                    options={districtOptions}
                    // isLoading={isDataLoading}
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
                    // isLoading={isCallCenterLoading}
                    options={callCenterOptions}
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
