/// ==============================================
// Filename:AddPurchaseOrder.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import { showToast } from 'src/utils'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddPurchaseOrderWrapper'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

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
        label: 'Add Purchase Order',
    },
]

const AddPurchaseOrder = ({
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
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="h-[calc(100vh-55px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Purchase Order </ATMPageHeading>
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
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* PO Code */}
                         

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
                                    label=" Inward Warehouse(Company)"
                                />
                            </div>
                        </div>
                    </div>

                    {/*  Items  */}
                    <div className="px-3">
                        <div className=" text-lg pb-2 font-medium text-primary-main">
                            Add item to purchase order
                        </div>

                        <FieldArray name="purchaseOrder">
                            {({ push, remove }) => {
                                return (
                                    <>
                                        <div className="flex flex-col gap-y-9">
                                            {values.purchaseOrder?.map(
                                                (item, itemIndex) => {
                                                    const {
                                                        itemId,
                                                        rate,
                                                        quantity,
                                                        estReceivingDate,
                                                    } = item

                                                    return (
                                                        <div
                                                            key={itemIndex}
                                                            className="flex gap-3 items-end  "
                                                        >
                                                            {/* Item Name */}
                                                            <div className="flex-[3_3_0%] -mt-4">
                                                                <ATMSelectSearchable
                                                                    name={`purchaseOrder[${itemIndex}].itemId`}
                                                                    value={
                                                                        itemId
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            !values?.purchaseOrder?.find(
                                                                                (
                                                                                    f
                                                                                ) =>
                                                                                    f.itemId ===
                                                                                    e
                                                                            )
                                                                        ) {
                                                                            setFieldValue(
                                                                                `purchaseOrder[${itemIndex}].itemId`,
                                                                                e
                                                                            )
                                                                        } else {
                                                                            showToast(
                                                                                'error',
                                                                                'Item is Already Selected!'
                                                                            )
                                                                        }
                                                                    }}
                                                                    options={
                                                                        dropdownOptions.itemOptions
                                                                    }
                                                                    label="Item Name"
                                                                />
                                                            </div>

                                                            {/* Rate */}
                                                            <div className="flex-[2_2_0%] ">
                                                                <ATMTextField
                                                                    type="number"
                                                                    min={0}
                                                                    name={`purchaseOrder[${itemIndex}].rate`}
                                                                    value={
                                                                        rate ===
                                                                        0
                                                                            ? ''
                                                                            : rate?.toString()
                                                                    }
                                                                    label="Rate"
                                                                    placeholder="Rate"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSetFieldValue(
                                                                            `purchaseOrder[${itemIndex}].rate`,
                                                                            e
                                                                                .target
                                                                                .value
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
                                                                    name={`purchaseOrder[${itemIndex}].quantity`}
                                                                    value={
                                                                        quantity ===
                                                                        0
                                                                            ? ''
                                                                            : quantity?.toString()
                                                                    }
                                                                    label="Quantity"
                                                                    placeholder="Quantity"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSetFieldValue(
                                                                            `purchaseOrder[${itemIndex}].quantity`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="rounded"
                                                                />
                                                            </div>

                                                            {/* Est. Receiving Date */}
                                                            <div className="flex-[3_3_0%]">
                                                                <ATMDatePicker
                                                                    name={`purchaseOrder[${itemIndex}].estReceivingDate`}
                                                                    value={
                                                                        estReceivingDate
                                                                    }
                                                                    label="Est. Receiving Date"
                                                                    onChange={(
                                                                        newValue
                                                                    ) =>
                                                                        handleSetFieldValue(
                                                                            `purchaseOrder[${itemIndex}].estReceivingDate`,
                                                                            newValue
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            {/* BUTTON - Delete */}
                                                            {values
                                                                .purchaseOrder
                                                                ?.length >
                                                                1 && (
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            remove(
                                                                                itemIndex
                                                                            )
                                                                        }}
                                                                        className="p-2 bg-red-500 text-white rounded"
                                                                    >
                                                                        <MdDeleteOutline className="text-2xl" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>

                                        {/* BUTTON - Add More Product */}
                                        <div className="flex justify-self-start py-7">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    push({
                                                        itemId: '',
                                                        rate: 0,
                                                        quantity: 0,
                                                        estReceivingDate: '',
                                                    })
                                                }
                                                className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                                            >
                                                <HiPlus size="20" /> Add More
                                            </button>
                                        </div>
                                    </>
                                )
                            }}
                        </FieldArray>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPurchaseOrder
