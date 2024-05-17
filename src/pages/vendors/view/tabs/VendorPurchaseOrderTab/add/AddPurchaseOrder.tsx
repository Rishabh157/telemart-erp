// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
// import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddPurchaseOrderTabWrapper'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { useParams } from 'react-router-dom'
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
    const parmas = useParams()
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Vendore Purchase-order',
            path: `${`/vendors/${parmas.vendorId}/purchase-order`}`,
        },
        {
            label: 'Add Purchase Order',
        },
    ]
    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New Purchase Order </ATMPageHeading>
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
                                Add PO
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-3 gap-4">
                            {/* PO Code */}
                            <ATMTextField
                                extraClassField="mt-1"
                                labelClass="pt-1 text-slate-700 text-sm font-medium"
                                name="poCode"
                                value={values.poCode}
                                label="PO"
                                placeholder="PO"
                                textTransform="uppercase"
                                onChange={(e) =>
                                    setFieldValue('poCode', e.target.value)
                                }
                            />

                            {/* Vendor */}
                            <ATMSelectSearchable
                                name="vendorId"
                                isDisabled
                                value={values.vendorId}
                                onChange={(e) => setFieldValue('vendorId', e)}
                                options={dropdownOptions.vendorOptions}
                                label="Vendor"
                                componentClass="mt-1"
                            />

                            {/* Warehouse */}
                            <ATMSelectSearchable
                                name="wareHouseId"
                                value={values.wareHouseId}
                                onChange={(e) =>
                                    setFieldValue('wareHouseId', e)
                                }
                                options={dropdownOptions.warehouseOptions}
                                label="Warehouse"
                                componentClass="mt-1"
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
                                                                <ATMSelectSearchable
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
