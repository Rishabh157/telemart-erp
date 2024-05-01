import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { getOrderStatusOptions } from 'src/utils/constants/customeTypes'
import { BatchFormInitialValuesFilterWithLabel } from './BatchOrderListingFilterWrapper'
// hooks
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { useGetSchemeQuery } from 'src/services/SchemeService'

// models
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllCallCenterMasterQuery } from 'src/services/CallCenterMasterServices'
import { useGetAllDistrictQuery } from 'src/services/DistricService'
import { useGetAllTehsilByDistrictQuery } from 'src/services/TehsilService'

type Props = {
    formikProps: FormikProps<BatchFormInitialValuesFilterWithLabel>
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
        useEndPointHook: useGetAllTehsilByDistrictQuery(
            values.districtId.value,
            {
                skip: !values.districtId.value,
            }
        ),
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
                {/* First Caller & Urgent */}
                <div>
                    <ATMCheckbox
                        label="Urgent"
                        inputClasses="h-3 w-3"
                        labelClasses="text-slate-700 text-sm font-medium pt-1 mb-1 select-none"
                        checked={values.isUrgentOrder.value}
                        onChange={(e) => {
                            setFieldValue('isUrgentOrder', {
                                fieldName: 'Urjent',
                                label: e ? 'Yes' : 'NO',
                                value: e,
                            })
                        }}
                    />
                </div>

                <ATMSelectSearchable
                    isDisabled
                    label="First Caller"
                    selectLabel="Select first caller"
                    name="callCenterManagerId"
                    textTransform="capitalize"
                    value={values.callCenterManagerId.value}
                    isValueWithLable
                    options={callCenterOptions}
                    onChange={(e) => {
                        setFieldValue('callCenterManagerId', {
                            fieldName: 'First Caller',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                {/* Order Status & Disposition */}
                <ATMSelectSearchable
                    label="Order Status"
                    selectLabel="Select order status"
                    name="orderStatus"
                    value={values.orderStatus.value}
                    options={getOrderStatusOptions()}
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('orderStatus', {
                            fieldName: 'Order Status',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                {/* Scheme & Order Type */}
                <ATMSelectSearchable
                    label="Scheme"
                    selectLabel="Select scheme"
                    name="schemeId"
                    value={values.schemeId.value}
                    options={schemeOptions}
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('schemeId', {
                            fieldName: 'Scheme',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                {/* District & Tehsil */}
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
                <ATMSelectSearchable
                    label="Tehsil"
                    selectLabel="Select tehsil"
                    name="tehsilId"
                    value={values.tehsilId.value}
                    isValueWithLable
                    options={tehsilOptions}
                    onChange={(e) => {
                        setFieldValue('tehsilId', {
                            fieldName: 'Tehsil',
                            label: e.label,
                            value: e.value,
                        })
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
                        value={values.startDate.value}
                        onChange={(e) =>
                            setFieldValue('startDate', {
                                fieldName: 'Date From',
                                label: 'Date From',
                                value: e,
                            })
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
                        value={values.endDate.value}
                        minDate={values?.startDate.value}
                        onChange={(newValue) =>
                            setFieldValue('endDate', {
                                fieldName: 'Date To',
                                label: 'Date To',
                                value: newValue,
                            })
                        }
                    />
                </div>

                {/* Followup Date From & To */}
                <div className="mt-4">
                    <ATMDatePicker
                        label="Follow up Date From"
                        name="callBackFrom"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.callBackFrom.value}
                        onChange={(newValue) =>
                            setFieldValue('callBackFrom', {
                                fieldName: 'Date From',
                                label: 'Date From',
                                value: newValue,
                            })
                        }
                    />
                </div>
                <div className="mt-4">
                    <ATMDatePicker
                        label="Follow up Date To"
                        name="callBackTo"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.callBackTo.value}
                        minDate={values?.callBackFrom.value}
                        onChange={(newValue) =>
                            setFieldValue('callBackTo', {
                                fieldName: 'Follow up Date To',
                                label: 'Follow up Date To',
                                value: newValue,
                            })
                        }
                    />
                </div>

                {/* Order Statue Date & To */}
                <div className="mt-4">
                    <ATMDatePicker
                        disabled
                        label="Status Date From"
                        name="callBackFrom"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.callBackFrom.value}
                        onChange={(newValue) =>
                            setFieldValue('callBackFrom', {
                                fieldName: 'Follow up Date To',
                                label: 'Follow up Date To',
                                value: newValue,
                            })
                        }
                    />
                </div>
                <div className="mt-4">
                    <ATMDatePicker
                        disabled
                        label="Status Date To"
                        name="callBackTo"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={values.callBackTo.value}
                        minDate={values?.callBackTo}
                        onChange={(newValue) =>
                            setFieldValue('callBackFrom', {
                                fieldName: 'Status Date To',
                                label: 'Status Date To',
                                value: newValue,
                            })
                        }
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

export default BatchOrderListingFilterForm
