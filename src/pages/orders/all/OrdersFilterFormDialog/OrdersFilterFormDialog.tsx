import React, { useState, useEffect } from 'react'
import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { FormInitialValues } from './OrdersFilterFormDialogWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'

// hooks
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetAllDeliveryBoy } from 'src/hooks/useGetAllDeliveryBoy'
import { useGetAllDistricts } from 'src/hooks/useGetAllDistricts'
import useTehsilByDistrict from 'src/hooks/useTehsilByDistrict'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'

// models
import { SelectOption } from 'src/models/FormField/FormField.model'
import { DistrictListResponse } from 'src/models/District.model'
import { SchemeListResponse } from 'src/models/scheme.model'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { CallCenterMasterListResponse } from 'src/models'
import { TehsilListResponse } from 'src/models/Tehsil.model'
import { orderStatusOptionsType } from 'src/utils/constants/customeTypes'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    onReset: () => void
    open: boolean
    onClose: () => void
}

const OrdersFilterFormDialog = ({
    open,
    formikProps,
    onReset,
    onClose,
}: Props) => {
    const { values, setFieldValue, isSubmitting, handleSubmit } = formikProps
    // console.log('values: ', values)
    const { userData } = useGetLocalStorage()
    // options
    const [allSchemes, setAllSchemes] = useState<SelectOption[]>([])
    const [allDelivery, setAllDelivery] = useState<SelectOption[]>([])
    const [allDistrict, setAllDistrict] = useState<SelectOption[]>([])
    const [allTehsil, setAllTehsil] = useState<SelectOption[]>([])
    const [allCallCenter, setAllCallCenter] = useState<SelectOption[]>([])

    // Hooks
    const {
        isLoading: isSchemesLoading,
        isFetching: isSchemesFetching,
        data: schemesData,
    } = useGetSchemeQuery(userData?.companyId, {
        skip: !userData?.companyId,
    })
    const { allDeliveryBoy, isLoading: isDeliveryBoyLoading } =
        useGetAllDeliveryBoy()
    const { districts, isLoading } = useGetAllDistricts()

    const { tehsilBydistrict, isDataLoading } = useTehsilByDistrict(
        values?.districtId
    )

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

    // set all districts
    useEffect(() => {
        if (!isLoading) {
            const allDistrictsOptions: SelectOption[] = districts?.map(
                (ele: DistrictListResponse) => {
                    return {
                        label: ele?.districtName,
                        value: ele?._id,
                    }
                }
            )
            setAllDistrict(allDistrictsOptions)
        }
    }, [isLoading, districts])

    // set tehsils by district
    useEffect(() => {
        if (!isDataLoading) {
            const allTehsilOptions: SelectOption[] = tehsilBydistrict?.map(
                (ele: TehsilListResponse) => {
                    return {
                        label: ele?.tehsilName,
                        value: ele?._id,
                    }
                }
            )
            setAllTehsil(allTehsilOptions)
        }
    }, [isDataLoading, tehsilBydistrict])

    // set tehsils by district
    useEffect(() => {
        if (!isDeliveryBoyLoading) {
            const allDeliveryBoyOptions: SelectOption[] = allDeliveryBoy?.map(
                (ele: TehsilListResponse) => {
                    return {
                        label: ele?.tehsilName,
                        value: ele?._id,
                    }
                }
            )
            setAllDelivery(allDeliveryBoyOptions)
        }
    }, [allDeliveryBoy, isDeliveryBoyLoading])

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

                {/* Order Status*/}
                <ATMSelectSearchable
                    label="Order Status"
                    selectLabel="Select order status"
                    textTransform="capitalize"
                    name="orderStatus"
                    value={values.orderStatus}
                    options={orderStatusOptionsType()}
                    onChange={(e) => {
                        setFieldValue('orderStatus', e || '')
                    }}
                />

                {/* Delivery Boy */}
                <ATMSelectSearchable
                    isDisabled
                    label="Delivery Boy"
                    selectLabel="Select delivery boy"
                    name="deliveryBoyId"
                    textTransform="capitalize"
                    value={values.deliveryBoyId}
                    isLoading={isDeliveryBoyLoading}
                    options={allDelivery}
                    onChange={(e) => {
                        setFieldValue('deliveryBoyId', e || '')
                    }}
                />

                {/* Dispositions */}
                <ATMSelectSearchable
                    label="Dispositions"
                    selectLabel="Select disposition"
                    name="dispositionId"
                    textTransform="capitalize"
                    value={values.dispositionId}
                    isLoading={isCallCenterLoading}
                    options={allCallCenter}
                    onChange={(e) => {
                        setFieldValue('dispositionId', e || '')
                    }}
                />

                {/* District */}
                <ATMSelectSearchable
                    label="District"
                    selectLabel="Select district"
                    name="districtId"
                    value={values.districtId}
                    options={allDistrict}
                    isLoading={isLoading}
                    onChange={(e) => {
                        setFieldValue('districtId', e || '')
                    }}
                />

                {/* Tehsil */}
                <ATMSelectSearchable
                    label="Tehsil"
                    selectLabel="Select tehsil"
                    name="tehsilId"
                    value={values.tehsilId}
                    options={allTehsil}
                    isLoading={isDataLoading}
                    onChange={(e) => {
                        setFieldValue('tehsilId', e || '')
                    }}
                />

                {/* Order Date From */}
                <div className="mt-4">
                    <ATMDatePicker
                        label="Order Date From"
                        name="startDate"
                        placeholder="dd/mm/yyyy"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.startDate}
                        onChange={(newValue) =>
                            setFieldValue('startDate', newValue)
                        }
                    />
                </div>

                {/* Order Date To */}
                <div className="mt-4">
                    <ATMDatePicker
                        label="Order Date To"
                        name="endDate"
                        placeholder="dd/mm/yyyy"
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

                {/* Status Date From */}
                <div className="mt-4">
                    <ATMDatePicker
                        disabled
                        label="Status Date From"
                        name="orderStatusFrom"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.orderStatusFrom}
                        onChange={(newValue) =>
                            setFieldValue('orderStatusFrom', newValue)
                        }
                    />
                </div>

                {/* Status Date To */}
                <div className="mt-4">
                    <ATMDatePicker
                        disabled
                        label="Status Date To"
                        name="orderStatusTo"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.orderStatusTo}
                        minDate={values?.orderStatusFrom}
                        onChange={(newValue) =>
                            setFieldValue('orderStatusTo', newValue)
                        }
                    />
                </div>

                {/* Followup Date From */}
                <div className="mt-4">
                    <ATMDatePicker
                        disabled
                        label="Follow Up Date From"
                        name="folloUpDateFrom"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.folloUpDateFrom}
                        onChange={(newValue) =>
                            setFieldValue('folloUpDateFrom', newValue)
                        }
                    />
                </div>

                {/* Followup Date To */}
                <div className="mt-4">
                    <ATMDatePicker
                        disabled
                        label="Follow Up Date To"
                        name="folloUpDateTo"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.folloUpDateTo}
                        minDate={values?.folloUpDateFrom}
                        onChange={(newValue) =>
                            setFieldValue('folloUpDateTo', newValue)
                        }
                    />
                </div>

                {/* First Caller */}
                <ATMSelectSearchable
                    isDisabled
                    label="First Caller"
                    selectLabel="Select first caller"
                    name="districtId"
                    value={values.districtId}
                    options={allDistrict}
                    isLoading={isLoading}
                    onChange={(e) => {
                        setFieldValue('districtId', e || '')
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

export default OrdersFilterFormDialog
