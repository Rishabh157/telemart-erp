import { FormikProps } from 'formik'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
// models
import { WebLeadsFormInitialValuesFilterWithLabel } from '../WebLeadsOnlineListingWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

type Props = {
    formikProps: FormikProps<WebLeadsFormInitialValuesFilterWithLabel>
    onReset: () => void
    open: boolean
    onClose: () => void
}

const WebLeadsOrderListingFilterForm = ({
    open,
    formikProps,
    onReset,
    onClose,
}: Props) => {
    const { values, setFieldValue, isSubmitting, handleSubmit } = formikProps
    // const { userData } = useGetLocalStorage()

    // Hooks
    // const { options: schemeOptions } = useCustomOptions({
    //     useEndPointHook: useGetSchemeQuery(''),
    //     keyName: 'schemeName',
    //     value: '_id',
    // })

    // const { options: callCenterOptions } = useCustomOptions({
    //     useEndPointHook: useGetAllCallCenterMasterQuery(userData?.companyId, {
    //         skip: !userData?.companyId,
    //     }),
    //     keyName: 'callCenterName',
    //     value: '_id',
    // })

    // const { options: districtOptions } = useCustomOptions({
    //     useEndPointHook: useGetAllDistrictQuery(''),
    //     keyName: 'districtName',
    //     value: '_id',
    // })

    // const { options: tehsilOptions } = useCustomOptions({
    //     useEndPointHook: useGetAllTehsilByDistrictQuery(
    //         values.districtId.value,
    //         {
    //             skip: !values.districtId.value,
    //         }
    //     ),
    //     keyName: 'tehsilName',
    //     value: '_id',
    // })
    const statusOptions = [
        {
            label: 'PENDING',
            value: 'PENDING',
        },
        {
            label: 'FAKE',
            value: 'FAKE',
        },
        {
            label: 'COMPLETE',
            value: 'COMPLETE',
        },
        {
            label: 'INQUIRY',
            value: 'INQUIRY',
        },
    ]
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

                <ATMSelectSearchable
                    label="Lead Status"
                    selectLabel="Select status"
                    name="leadStatus"
                    value={values?.leadStatus?.value}
                    isValueWithLable
                    options={statusOptions || []}
                    onChange={(e) => {
                        setFieldValue('leadStatus', {
                            fieldName: 'leadStatus',
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

export default WebLeadsOrderListingFilterForm
