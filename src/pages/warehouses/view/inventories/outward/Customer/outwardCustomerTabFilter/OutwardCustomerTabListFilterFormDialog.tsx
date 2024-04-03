import React from 'react'
import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { FormInitialValues } from './OutwardCustomerTabListFilterFormDialogWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { orderStatusOptionsType } from 'src/utils/constants/customeTypes'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    onReset: () => void
    open: boolean
    onClose: () => void
}

const OutwardCustomerTabListFilterFormDialog = ({
    open,
    formikProps,
    onReset,
    onClose,
}: Props) => {
    const { values, setFieldValue, isSubmitting, handleSubmit } = formikProps

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
                    isDisabled
                    label="Courier Name"
                    selectLabel="Select Courier"
                    name="courierId"
                    value={values.courierId}
                    options={[]}
                    isLoading={false}
                    onChange={(e) => {
                        setFieldValue('courierId', e || '')
                    }}
                />

                {/* Order Type */}
                <ATMSelectSearchable
                    label="Order Status"
                    selectLabel="Select order status"
                    name="orderStatus"
                    value={values.orderStatus}
                    options={orderStatusOptionsType()}
                    // isLoading={isLoading}
                    onChange={(e) => {
                        setFieldValue('orderStatus', e || '')
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

                {/* From */}
                <div className="mt-4">
                    <ATMDatePicker
                        disabled
                        label="Date Range From"
                        name="startDate"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={''}
                        onChange={(newValue) => {
                            // setFieldValue('startDate', newValue)
                        }}
                    />
                </div>

                {/* To */}
                <div className="mt-4">
                    <ATMDatePicker
                        disabled
                        label="Date Range To"
                        name="endDate"
                        textTransform="capitalize"
                        className="mt-0"
                        dateTimeFormat="DD/MM/YYYY"
                        value={''}
                        minDate={''}
                        onChange={(newValue) => {
                            // setFieldValue('endDate', newValue)
                        }}
                    />
                </div>
            </div>

            {/* Apply & Cancel Buttons */}
            <div className="flex gap-2  sticky bottom-0 bg-white mt-6">
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

export default OutwardCustomerTabListFilterFormDialog
