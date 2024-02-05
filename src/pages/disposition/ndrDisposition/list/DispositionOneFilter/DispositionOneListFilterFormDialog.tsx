import React from 'react'
import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import { FormInitialValues } from './DispositionOneListFilterFormDialogWrapper'
import ATMRadioButtonGroup from 'src/components/UI/atoms/ATMRadioButtonGroup/ATMRadioButtonGroup'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    onReset: () => void
    onClose: () => void
}

const DispositionOneListFilterFormDialog = ({
    formikProps,
    onReset,
    onClose,
}: Props) => {
    const { values, setFieldValue, isSubmitting, handleSubmit } = formikProps

    return (
        <div className="flex flex-col gap-4 px-4 py-2">
            {/* Heading & Clear Button */}
            <div className="flex justify-between items-center sticky top-0 z-50">
                <div className="text-xl font-medium"> Filter </div>
                <button
                    type="button"
                    className="text-red-600 hover:text-red-400 font-medium"
                    onClick={onReset}
                >
                    Clear Filters
                </button>
            </div>

            {/* Is Active Filter */}
            <ATMRadioButtonGroup
                name="isActive"
                label="Disposition Status"
                required={false}
                value={values.isActive}
                options={[
                    {
                        label: 'Active',
                        value: 'ACTIVE',
                    },
                    {
                        label: 'Deactive',
                        value: 'DE_ACTIVATE',
                    },
                ]}
                onChange={(newValue: any) => {
                    setFieldValue('isActive', newValue)
                }}
            />

            {/* Apply & Cancel Buttons */}
            <div className="flex flex-col gap-2  sticky bottom-0 bg-white mt-4">
                <div>
                    <ATMLoadingButton
                        type="submit"
                        className="h-[40px]"
                        isLoading={isSubmitting}
                        onClick={() => handleSubmit()}
                    >
                        Apply
                    </ATMLoadingButton>
                </div>

                <div>
                    <ATMLoadingButton
                        className="bg-slate-300 hover:bg-gray-200 transition-all h-[40px] border-none text-slate-700 font-medium"
                        onClick={onClose}
                    >
                        Cancel
                    </ATMLoadingButton>
                </div>
            </div>
        </div>
    )
}

export default DispositionOneListFilterFormDialog
