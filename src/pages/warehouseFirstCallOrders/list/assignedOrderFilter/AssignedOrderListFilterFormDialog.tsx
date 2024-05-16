import React from 'react'
import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { FormInitialValuesFilterWithLabel } from './AssignedOrderListFilterFormDialogWrapper'
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
    formikProps: FormikProps<FormInitialValuesFilterWithLabel>
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
        useEndPointHook: useGetAllDistrictByStateQuery(values?.stateId?.value, {
            skip: !values?.stateId?.value,
        }),
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
                    value={values.schemeId.value}
                    options={schemeOptions}
                    isValueWithLable
                    // isLoading={isSchemesLoading}
                    onChange={(e) => {
                        setFieldValue('schemeId', {
                            fieldName: 'Scheme',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />


                <ATMSelectSearchable
                    label="State"
                    selectLabel="Select state"
                    name="stateId"
                    value={values.stateId.value}
                    options={stateOptions}
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('stateId', {
                            fieldName: 'State',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                <ATMSelectSearchable
                    label="District"
                    selectLabel="Select district"
                    name="districtId"
                    value={values.districtId.value}
                    options={districtOptions}
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('districtId', {
                            fieldName: 'District',
                            label: e.label,
                            value: e.value,
                        })
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
                        value={values.startDate.value}
                        onChange={(e) =>
                            setFieldValue('startDate', {
                                fieldName: 'Date From',
                                label: '',
                                value: e,
                            })
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
                        value={values.endDate.value}
                        minDate={values?.startDate}
                        onChange={(newValue) =>
                            setFieldValue('endDate', {
                                fieldName: 'Date to',
                                label: 'Date to',
                                value: newValue,
                            })
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
                        value={values.callBackFrom.value}
                        onChange={(newValue) =>
                            setFieldValue('callBackFrom', {
                                fieldName: 'Callback From',
                                label: 'Callback From',
                                value: newValue,
                            })
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
                        value={values.callBackTo.value}
                        minDate={values?.callBackFrom}
                        onChange={(newValue) =>
                            setFieldValue('callBackTo', {
                                fieldName: 'Callback To',
                                label: 'Callback To',
                                value: newValue,
                            })
                        }
                    />
                </div>

                {/* Order Type */}
                <ATMSelectSearchable
                    label="Call Center Manager"
                    selectLabel="Select Call Center Manager"
                    name="callCenterManagerId"
                    textTransform="capitalize"
                    value={values.callCenterManagerId.value}
                    // isLoading={isCallCenterLoading}
                    isValueWithLable
                    options={callCenterOptions}
                    onChange={(e) => {
                        setFieldValue('callCenterManagerId', {
                            fieldName: 'Call Center Manager',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                <div className="flex gap-x-8">
                    <ATMSwitchButton
                        name="languageBarrier"
                        value={values.languageBarrier.value}
                        label="Language Barrier"
                        onChange={(value: any) => {
                            setFieldValue('languageBarrier', {
                                fieldName: 'language Barrier',
                                label: value ? 'Yes' : 'NO',
                                value: value,
                            })
                        }}
                    />
                    <ATMSwitchButton
                        name="isPnd"
                        value={values.isPnd.value}
                        label="Pnd Orders"
                        onChange={(value: any) => {
                            setFieldValue('isPnd', {
                                fieldName: 'PND',
                                label: value ? 'Yes' : 'NO',
                                value: value,
                            })
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
