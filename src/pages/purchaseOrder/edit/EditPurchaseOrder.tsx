/// ==============================================
// Filename:EditPurchaseOrder.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

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

    //console.log(values?.purchaseOrder)
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="px-4 h-[calc(100vh-55px)] bg-white">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Edit Purchase Order </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium"> PO Details </div>

                        {/* BUTTON - Add SO */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-8 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* PO Code */}
                            <ATMTextField
                                name="poCode"
                                value={values.poCode}
                                label="PO Code"
                                placeholder="PO Code"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'poCode',
                                        e.target.value
                                    )
                                }
                                className="mt-0 rounded"
                            />

                            {/* Vendor */}
                            <div className="-mt-2">
                                <ATMSelectSearchable
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
                                    name="wareHouseId"
                                    value={values.wareHouseId}
                                    onChange={(e) =>
                                        handleSetFieldValue('wareHouseId', e)
                                    }
                                    options={dropdownOptions.warehouseOptions}
                                    label="Warehouse"
                                />
                            </div>
                            <div className="flex-[3_3_0%] -mt-2">
                                <ATMSelectSearchable
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
                                    value={
                                        values.purchaseOrder.rate?.toString() ||
                                        ''
                                    }
                                    label="Rate"
                                    placeholder="Rate"
                                    onChange={(e) =>
                                        handleSetFieldValue(
                                            `purchaseOrder.rate`,
                                            e.target.value
                                        )
                                    }
                                    className="mt-0 rounded"
                                />
                            </div>

                            {/* Quantity */}
                            <div className="flex-[2_2_0%]">
                                <ATMTextField
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
                                            e.target.value
                                        )
                                    }
                                    className="mt-0 rounded"
                                />
                            </div>

                            {/* Est. Receiving Date */}
                            <div className="flex-[3_3_0%]">
                                <ATMDatePicker
                                    name={`purchaseOrder.estReceivingDate`}
                                    value={
                                        values.purchaseOrder.estReceivingDate
                                    }
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
