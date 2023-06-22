import React from 'react'
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddPurchaseOrderWrapper'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { HiPlus } from 'react-icons/hi'

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

    const { values, setFieldValue } = formikProps

    return (
        <div className=" h-[calc(100vh-55px)] overflow-auto">
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
                            <ATMTextField
                                name="poCode"
                                value={values.poCode}
                                label="PO Code"
                                placeholder="PO Code"
                                onChange={(e) =>
                                    setFieldValue('poCode', e.target.value)
                                }
                                className="mt-0 rounded"
                            />

                            {/* Vendor */}
                            <ATMSelect
                                name="vendorId"
                                value={values.vendorId}
                                onChange={(e) =>
                                    setFieldValue('vendorId', e.target.value)
                                }
                                options={dropdownOptions.vendorOptions}
                                label="Vendor"
                            />

                            {/* Warehouse */}
                            <ATMSelect
                                name="wareHouseId"
                                value={values.wareHouseId}
                                onChange={(e) =>
                                    setFieldValue('wareHouseId', e.target.value)
                                }
                                options={dropdownOptions.warehouseOptions}
                                label="Warehouse"
                            />
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
                                                            <div className="flex-[3_3_0%]">
                                                                <ATMSelect
                                                                    name={`purchaseOrder[${itemIndex}].itemId`}
                                                                    value={
                                                                        itemId
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setFieldValue(
                                                                            `purchaseOrder[${itemIndex}].itemId`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    options={
                                                                        dropdownOptions.itemOptions
                                                                    }
                                                                    label="Item Name"
                                                                />
                                                            </div>

                                                            {/* Rate */}
                                                            <div className="flex-[2_2_0%]">
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
                                                                        setFieldValue(
                                                                            `purchaseOrder[${itemIndex}].rate`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
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
                                                                        setFieldValue(
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
                                                                        setFieldValue(
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
