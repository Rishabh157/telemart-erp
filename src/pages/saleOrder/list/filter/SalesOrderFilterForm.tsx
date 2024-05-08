import { FormikProps } from 'formik'
import { useLocation } from 'react-router-dom'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { SaleOrderStatus } from 'src/models/SaleOrder.model'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import { SalesOrderFormInitialValuesFilterWithLabel } from './SalesOrderFilterWrapper'

type Props = {
    formikProps: FormikProps<SalesOrderFormInitialValuesFilterWithLabel>
    onReset: () => void
    open: boolean
    onClose: () => void
}

const SalesOrderFilterForm = ({
    open,
    formikProps,
    onReset,
    onClose,
}: Props) => {
    const { values, setFieldValue, isSubmitting, handleSubmit } = formikProps
    const { pathname } = useLocation()
    const path = pathname.split('/')[1]
    const isDealerPath = path === 'dealers'
    const { options: dealerOptions } = useCustomOptions({
        useEndPointHook: useGetAllDealersQuery(''),
        keyName: ['firstName', 'lastName'],
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
                    label="Dealer "
                    selectLabel="Select Dealer"
                    name="schemeId"
                    isDisabled={isDealerPath}
                    value={values.dealerId.value}
                    options={dealerOptions}
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('dealerId', {
                            fieldName: 'Dealer Name',
                            label: e.label,
                            value: e.value,
                        })
                    }}
                />

                <ATMTextField
                    label="Invoice No"
                    name="invoiceNumber"
                    value={values.invoiceNumber.value}
                    onChange={(e) => {
                        setFieldValue('invoiceNumber', {
                            fieldName: 'Invoice NO',
                            label: e.target.value,
                            value: e.target.value,
                        })
                    }}
                />

                <ATMSelectSearchable
                    label="status"
                    selectLabel="Select status"
                    name="status"
                    value={values.status.value}
                    options={[
                        {
                            label: 'DISPATCHED',
                            value: SaleOrderStatus.dispatched,
                        },
                        {
                            label: 'NOT DISPATCHED',
                            value: SaleOrderStatus.not_dispatched,
                        },
                        {
                            label: 'COMPLETED',
                            value: SaleOrderStatus.complete,
                        },
                    ]}
                    isValueWithLable
                    onChange={(e) => {
                        setFieldValue('status', {
                            fieldName: 'status',
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

export default SalesOrderFilterForm
