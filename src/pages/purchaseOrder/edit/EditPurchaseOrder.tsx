// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
//import { MdDeleteOutline } from 'react-icons/md'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './EditPurchaseOrderWrapper'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
//import { HiPlus } from 'react-icons/hi'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    vendorOptions: any[]
    warehouseOptions: any[]
    itemOptions: any[]
    apiStatus: boolean
}
export type DropdownOptions = {
    vendorOptions: SelectOption[]
    warehouseOptions: SelectOption[]
    itemOptions: SelectOption[]
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Purchase-order',
        path: '/purchase-order',
    },
    {
        label: 'Update Purchase Order',
    },
]

const EditPurchaseOrder = ({
    formikProps,
    vendorOptions,
    warehouseOptions,
    itemOptions,
    apiStatus,
}: Props) => {
    const dropdownOptions: DropdownOptions = {
        vendorOptions,
        warehouseOptions,
        itemOptions,
    }
    const dispatch = useDispatch()
    const { values, setFieldValue } = formikProps

    const handleSetFieldValue = (name: string, value: string | boolean | number) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="px-4 h-[calc(100vh-55px)] bg-white">
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Edit Purchase Order </ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium"> PO Details </div>

                        {/* BUTTON - Add SO */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${apiStatus ? 'disabled:opacity-25' : ''
                                    }`}
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-3 py-8 grow ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* PO Code */}

                            {/* Vendor */}
                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    required
                                    name="vendorId"
                                    value={values.vendorId}
                                    onChange={(e) =>
                                        handleSetFieldValue('vendorId', e)
                                    }
                                    options={dropdownOptions.vendorOptions}
                                    label="Vendor"
                                />
                            </div>

                            {/* Warehouse */}
                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    required
                                    name="wareHouseId"
                                    value={values.wareHouseId}
                                    onChange={(e) =>
                                        handleSetFieldValue('wareHouseId', e)
                                    }
                                    options={dropdownOptions.warehouseOptions}
                                    label=" Inward Warehouse(Company)"
                                />
                            </div>
                            <div className="flex-[3_3_0%] -mt-2">
                                <ATMSelectSearchable
                                    required
                                    name={`purchaseOrder.itemId`}
                                    value={values?.purchaseOrder?.itemId}
                                    onChange={(e) =>
                                        handleSetFieldValue(
                                            `purchaseOrder.itemId`,
                                            e
                                        )
                                    }
                                    options={dropdownOptions.itemOptions}
                                    label="Item Name"
                                />
                            </div>

                            {/* Rate */}
                            <div className="flex-[2_2_0%]">
                                <ATMTextField
                                    type="number"
                                    min={0}
                                    name={`purchaseOrder.rate`}
                                    value={values.purchaseOrder.rate}
                                    label="Rate"
                                    placeholder="Rate"
                                    onChange={(e) =>
                                        handleSetFieldValue(
                                            `purchaseOrder.rate`,
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="mt-0 rounded"
                                />
                            </div>

                            {/* Quantity */}
                            <div className="flex-[2_2_0%]">
                                <ATMTextField
                                    required
                                    type="number"
                                    min={0}
                                    name={`purchaseOrder.quantity`}
                                    value={
                                        values.purchaseOrder.quantity?.toString() ||
                                        ''
                                    }
                                    label="Quantity"
                                    placeholder="Quantity"
                                    onChange={(e) =>
                                        handleSetFieldValue(
                                            `purchaseOrder.quantity`,
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="mt-0 rounded"
                                />
                            </div>

                            {/* Est. Receiving Date */}
                            <div className="flex-[3_3_0%] mt-4">
                                <ATMDatePicker
                                    // required
                                    labelClass="text-slate-700  text-sm font-medium mb-1"
                                    name={`purchaseOrder.estReceivingDate`}
                                    value={values.purchaseOrder.estReceivingDate}
                                    label="Est. Receiving Date"
                                    onChange={(newValue) =>
                                        handleSetFieldValue(
                                            `purchaseOrder.estReceivingDate`,
                                            newValue
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPurchaseOrder
