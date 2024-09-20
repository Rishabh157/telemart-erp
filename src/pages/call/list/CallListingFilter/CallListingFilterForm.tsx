import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { CallListFilterFormValues } from './CallListingFilterWrapper'
// hooks

// models
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAlldispositionTwoQuery } from 'src/services/configurations/DispositionTwoServices'
import { useGetAllDispositionThreeByDisTwoIdQuery } from 'src/services/configurations/DispositionThreeServices'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'

type Props = {
    formikProps: FormikProps<CallListFilterFormValues>
    onReset: () => void
    open: boolean
    onClose: () => void
}

const CallListingFilterForm = ({
    open,
    formikProps,
    onReset,
    onClose,
}: Props) => {
    const { values, setFieldValue, isSubmitting, handleSubmit } = formikProps

    const { options: dispositionTwoOptions } = useCustomOptions({
        useEndPointHook: useGetAlldispositionTwoQuery(''),
        keyName: 'dispositionDisplayName',
        value: '_id',
    })

    const { options: dispositionThreeOptions } = useCustomOptions({
        useEndPointHook: useGetAllDispositionThreeByDisTwoIdQuery(values?.dispositionOneId?.value, {
            skip: !values?.dispositionOneId?.value
        }),
        keyName: 'dispositionDisplayName',
        value: '_id',
    })

    return (
        <div className="flex flex-col gap-4 px-4 py-2 h-[40vh]">
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

                {/* District & Tehsil */}
                <ATMSelectSearchable
                    label="Disposition One"
                    selectLabel="Select disposition one"
                    name="dispositionOneId"
                    isValueWithLable
                    value={values.dispositionOneId.value}
                    options={dispositionTwoOptions}
                    onChange={(e) => {
                        setFieldValue('dispositionOneId', {
                            fieldName: 'Disposition One',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                <ATMSelectSearchable
                    label="Disposition Two"
                    selectLabel="Select disposition two"
                    name="dispositionTwoId"
                    value={values.dispositionTwoId.value}
                    isValueWithLable
                    options={dispositionThreeOptions}
                    onChange={(e) => {
                        setFieldValue('dispositionTwoId', {
                            fieldName: 'Disposition Two',
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

                {/* <ATMSelectSearchable
                    label="Company Type"
                    selectLabel="Select company type"
                    name="companyType"
                    value={values.companyType.value}
                    isValueWithLable
                    options={companyTypeOptions()}
                    onChange={(e) => {
                        setFieldValue('companyType', {
                            fieldName: 'Company Type',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                /> */}

            </div>

            {/* Apply & Cancel Buttons */}
            <div className="flex gap-2 sticky bottom-0 bg-white mt-4">
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

export default CallListingFilterForm
