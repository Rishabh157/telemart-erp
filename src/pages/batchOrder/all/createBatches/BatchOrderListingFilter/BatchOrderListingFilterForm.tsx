import React from 'react'
import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { FormInitialValues } from './BatchOrderListingFilterWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { getOrderStatusOptions } from 'src/utils/constants/customeTypes'
// hooks
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

// models
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllDistrictQuery } from 'src/services/DistricService'
import { useGetAllTehsilByDistrictQuery } from 'src/services/TehsilService'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    onReset: () => void
    open: boolean
    onClose: () => void
}

const BatchOrderListingFilterForm = ({
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

    const { options: districtOptions } = useCustomOptions({
        useEndPointHook: useGetAllDistrictQuery(''),
        keyName: 'districtName',
        value: '_id',
    })

    const { options: tehsilOptions } = useCustomOptions({
        useEndPointHook: useGetAllTehsilByDistrictQuery(values.districtId, {
            skip: !values.districtId,
        }),
        keyName: 'tehsilName',
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
                {/* Order Status & Disposition */}
                <ATMSelectSearchable
                    label="Order Status"
                    selectLabel="Select order status"
                    name="orderStatus"
                    value={values.orderStatus}
                    options={getOrderStatusOptions()}
                    // isLoading={isSchemesLoading}
                    onChange={(e) => {
                        setFieldValue('orderStatus', e || '')
                    }}
                />

                <ATMSelectSearchable
                    label="Disposition"
                    isDisabled
                    selectLabel="Select disposition"
                    name="orderStatus"
                    value={values.orderStatus}
                    options={[]}
                    onChange={(e) => {
                        setFieldValue('orderStatus', e || '')
                    }}
                />

                {/* Scheme & Order Type */}
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

                <ATMSelectSearchable
                    isDisabled
                    label="Delivery Boy"
                    selectLabel="Select delivery boy"
                    name="callCenterManagerId"
                    textTransform="capitalize"
                    value={values.callCenterManagerId}
                    // isLoading={isCallCenterLoading}
                    options={callCenterOptions}
                    onChange={(e) => {
                        setFieldValue('callCenterManagerId', e || '')
                    }}
                />

                {/* District & Tehsil */}
                <ATMSelectSearchable
                    label="District"
                    selectLabel="Select district"
                    name="districtId"
                    value={values.districtId}
                    options={districtOptions}
                    onChange={(e) => {
                        setFieldValue('districtId', e || '')
                    }}
                />
                <ATMSelectSearchable
                    label="Tehsil"
                    selectLabel="Select tehsil"
                    name="tehsilId"
                    value={values.tehsilId}
                    options={tehsilOptions}
                    onChange={(e) => {
                        setFieldValue('tehsilId', e || '')
                    }}
                />

                {/* Order Date From & To */}
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

                {/* Followup Date From & To */}
                <div className="mt-4">
                    <ATMDatePicker
                        label="Folloup Date From"
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
                        label="Folloup Date To"
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

                {/* Order Statue Date & To */}
                <div className="mt-4">
                    <ATMDatePicker
                        disabled
                        label="Status From"
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
                        disabled
                        label="Status To"
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

                {/* First Caller & ____ */}
                <ATMSelectSearchable
                    isDisabled
                    label="First Caller"
                    selectLabel="Select first caller"
                    name="callCenterManagerId"
                    textTransform="capitalize"
                    value={values.callCenterManagerId}
                    // isLoading={isCallCenterLoading}
                    options={callCenterOptions}
                    onChange={(e) => {
                        setFieldValue('callCenterManagerId', e || '')
                    }}
                />
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

export default BatchOrderListingFilterForm
