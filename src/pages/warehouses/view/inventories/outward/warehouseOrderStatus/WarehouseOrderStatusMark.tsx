// |-- Built-in Dependencies --|

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'

// |-- Redux --|
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { getWarehouseStatus } from 'src/pages/callerpage/components/constants'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import { useGetAllCourierPreferenceQuery } from 'src/services/CourierPreferenceService'
import { getCourierRtoRequestStatusOptions } from 'src/utils/constants/customeTypes'
import { FormInitialValues } from './WarehouseOrderStatusMarkWrapper'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>

    apiStatus: boolean
}

const WarehouseOrderStatusMark = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const { id: warehouseId } = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    const { options: courierOptions } = useCustomOptions({
        useEndPointHook: useGetAllCourierPreferenceQuery(''),
        keyName: 'courierName',
        value: 'courierName',
    })

    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Orders',
            path: `/warehouse/view/${warehouseId}/inward-inventories/courier-return`,
        },
        {
            label: 'Status Marking',
        },
    ]
    return (
        <div className=" h-[calc(100vh-200px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div>
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">Order status</div>

                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${apiStatus ? 'opacity-50' : ''
                                    }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            <ATMSelectSearchable
                                required
                                name="shippingProvider"
                                label="Shipping Provider"
                                value={values?.shippingProvider}
                                componentClass="mt-0"
                                options={courierOptions}
                                onChange={(e) =>
                                    handleSetFieldValue('shippingProvider', e)
                                }
                            />

                            <ATMSelectSearchable
                                required
                                name="orderStatus"
                                label="order Status"
                                value={values?.orderStatus}
                                componentClass="mt-0"
                                options={getWarehouseStatus()}
                                onChange={(e) =>
                                    handleSetFieldValue('orderStatus', e)
                                }
                            />
                            <ATMSelectSearchable
                                isHidden={values?.orderStatus !== 'RTO'}
                                name="requestStatus"
                                label="Request Status"
                                value={values?.requestStatus}
                                componentClass="mt-0"
                                options={getCourierRtoRequestStatusOptions()}
                                onChange={(e) =>
                                    handleSetFieldValue('requestStatus', e)
                                }
                            />

                            <ATMTextArea
                                required
                                name="orderNumber"
                                value={values?.orderNumber}
                                label="Order Number "
                                placeholder="Order numbr"
                                className="rounded"
                                // extraClassField="m-0"
                                onChange={(e) => {
                                    const value = e;
                                    if (/^[\d\n]*$/.test(value)) {  // Regular expression to allow only numbers
                                        handleSetFieldValue('orderNumber', value);
                                    } else {
                                        console.log("Invalid input, only numbers are allowed");
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WarehouseOrderStatusMark
