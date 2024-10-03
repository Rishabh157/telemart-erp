import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { VendorListFilterFormValues } from './VendorListingFilterWrapper'
// hooks

// models
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { useGetAllDistrictByStateQuery } from 'src/services/DistricService'
import { useGetAllStateQuery } from 'src/services/StateService'
import { companyTypeOptions } from 'src/utils/constants/customeTypes'

type Props = {
    formikProps: FormikProps<VendorListFilterFormValues>
    onReset: () => void
    open: boolean
    onClose: () => void
}

const VendorListingFilterForm = ({
    open,
    formikProps,
    onReset,
    onClose,
}: Props) => {
    const { values, setFieldValue, isSubmitting, handleSubmit } = formikProps

    const { options: stateOption, isOptionsLoading: isStateOptionLoading } = useCustomOptions({
        useEndPointHook: useGetAllStateQuery(''),
        keyName: 'stateName',
        value: '_id',
    })

    const { options: districtOptions } = useCustomOptions({
        useEndPointHook: useGetAllDistrictByStateQuery(
            values.stateId.value,
            {
                skip: !values.stateId.value,
            }
        ),
        keyName: 'districtName',
        value: '_id',
    })

    return (
        <div className="flex flex-col gap-4 px-4 py-2 h-[40vh] justify-between">
            {/* Heading & Clear Button */}
            <div>
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
                        label="State"
                        selectLabel="Select state"
                        name="stateId"
                        isValueWithLable
                        value={values.stateId.value}
                        options={stateOption}
                        isLoading={isStateOptionLoading}
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
                        isValueWithLable
                        options={districtOptions}
                        onChange={(e) => {
                            setFieldValue('districtId', {
                                fieldName: 'District',
                                label: e.label,
                                value: e.value,
                            })
                        }}
                    />

                    <ATMSelectSearchable
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

export default VendorListingFilterForm
