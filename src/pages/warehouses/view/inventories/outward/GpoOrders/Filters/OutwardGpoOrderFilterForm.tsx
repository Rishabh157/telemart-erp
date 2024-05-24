import React from 'react'
import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { FormInitialValuesFilterWithLabel } from './OutwardGpoOrderFilterFormWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

type Props = {
    formikProps: FormikProps<FormInitialValuesFilterWithLabel>
    onReset: () => void

    onClose: () => void
}

const orderStatus = [
    {
        label: 'Dispatched',
        value: 'DISPATCHED',
    },
    {
        label: 'Not Dispatched',
        value: 'NOT_DISPATCHED',
    },
    {
        label: 'Complete',
        value: 'COMPLETE',
    },
]

const OutwardGpoOrderFilterForm = ({
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
                        // minDate={values?.startDate}
                        onChange={(newValue) =>
                            setFieldValue('endDate', {
                                fieldName: 'Date to',
                                label: 'Date to',
                                value: newValue,
                            })
                        }
                    />
                </div>

                <ATMTextField
                    name=""
                    type="time"
                    value={values.startTime.value}
                    label="Time From"
                    placeholder="Enter Start Time"
                    className="shadow bg-white rounded w-[50%] "
                    onChange={(e) => {
                        setFieldValue('startTime', {
                            fieldName: 'Time from',
                            label: 'Time from',
                            value: e.target.value,
                        })
                    }}
                />

                <ATMTextField
                    name=""
                    type="time"
                    value={values.endTime.value}
                    label="Time From"
                    placeholder="Enter End Time"
                    className="shadow bg-white rounded w-[50%] "
                    onChange={(e) => {
                        setFieldValue('endTime', {
                            fieldName: 'Time to',
                            label: 'Time to',
                            value: e.target.value,
                        })
                    }}
                />

                <ATMSelectSearchable
                    label="Order Status"
                    selectLabel="Select order status"
                    name="stateId"
                    value={values.orderStatus.value}
                    options={orderStatus}
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('orderStatus', {
                            fieldName: 'orderStatus',
                            label: e.label,
                            value: e.value,
                        })
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

export default OutwardGpoOrderFilterForm
