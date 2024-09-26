// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FieldArray, FormikProps } from 'formik'
import { HiPlus } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Redux --|
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { showToast } from 'src/utils'

// |-- Types --|
type Props = {
    formikProps: FormikProps<any>
    dropdownOptions: {
        vendorOptions: SelectOption[]
        warehouseOptions: SelectOption[]
        productGroupOptions: SelectOption[]
    }
    productPriceOptions: any
    apiStatus: boolean
}

const AddRTVendor = ({
    formikProps,
    dropdownOptions,
    apiStatus,
    productPriceOptions,
}: Props) => {
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: 'Return To Vendor',
            path: 'return-to-vendor',
        },
        {
            label: 'Add Return To Vendor',
        },
    ]

    const { values, setFieldValue } = formikProps

    const dispatch = useDispatch<AppDispatch>()
    const [productGroup, setProductGroup] = useState('')
    const [i, setI] = useState(0)

    useEffect(() => {
        const val: any = productPriceOptions?.find(
            (e: any) => e['value'] === productGroup
        )

        if (val) {
            setFieldValue(`productSalesOrder[${i}].rate`, val['label'])
        } else {
            setFieldValue(`productSalesOrder[${i}].rate`, 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productGroup])

    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className=" h-[calc(100vh-55px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            {' '}
                            Return To Vendor{' '}
                        </div>
                        {/* BUTTON - Add SO */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounzded py-1 px-5 text-white border border-primary-main ${apiStatus ? 'opacity-50' : ''
                                    }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-2 gap-4">

                            {/* Dealer */}
                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    name="vendorId"
                                    value={values.vendorId}
                                    onChange={(e) => {
                                        handleSetFieldValue('vendorId', e)
                                    }}
                                    options={dropdownOptions?.vendorOptions}
                                    label="Vendor"
                                />
                            </div>
                            {/* Warehouse */}
                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    name="warehouseId"
                                    value={values?.warehouseId}
                                    onChange={(e) =>
                                        handleSetFieldValue('warehouseId', e)
                                    }
                                    options={dropdownOptions.warehouseOptions}
                                    label="Warehouse"
                                />
                            </div>
                            <div className="-mt-3">
                                <ATMTextArea
                                    label="Remark"
                                    name="remark"
                                    placeholder="enter remark"
                                    value={values.remark}
                                    minRows={4}
                                    className="rounded mt-0"
                                    labelClass="text-slate-700 text-sm font-medium"
                                    onChange={(e) => {
                                        handleSetFieldValue('remark', e)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/*  Sales Order  */}
                    <div className="px-3">
                        <div className=" text-lg pb-2 font-medium text-primary-main">
                            Product details
                        </div>

                        <FieldArray name="productSalesOrder">
                            {({ push, remove }) => {
                                return (
                                    <>
                                        <div className="flex flex-col gap-y-5">
                                            {values.productSalesOrder?.map(
                                                (item: any, index: any) => {
                                                    const {
                                                        productGroupId,
                                                        rate,
                                                        quantity,
                                                    } = item
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex gap-3 items-end "
                                                        >
                                                            {/* Product Name */}
                                                            <div className="flex-1 ">
                                                                <ATMSelectSearchable
                                                                    name={`productSalesOrder[${index}].productGroupId`}
                                                                    value={
                                                                        productGroupId
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            !values?.productSalesOrder?.find(
                                                                                (
                                                                                    f: any
                                                                                ) =>
                                                                                    f.productGroupId ===
                                                                                    e
                                                                            )
                                                                        ) {
                                                                            setFieldValue(
                                                                                `productSalesOrder[${index}].productGroupId`,
                                                                                e
                                                                            )
                                                                            setI(
                                                                                0
                                                                            )
                                                                            setProductGroup(
                                                                                e
                                                                            )
                                                                            setI(
                                                                                index
                                                                            )
                                                                        } else {
                                                                            showToast(
                                                                                'error',
                                                                                'Product group Already Added!'
                                                                            )
                                                                        }
                                                                    }}
                                                                    options={
                                                                        dropdownOptions.productGroupOptions
                                                                    }
                                                                    label="Product Group"
                                                                />
                                                            </div>

                                                            {/* Rate */}
                                                            <div className="flex-1">
                                                                <ATMTextField
                                                                    type="number"
                                                                    disabled={
                                                                        true
                                                                    }
                                                                    name={`productSalesOrder[${index}].rate`}
                                                                    value={rate}
                                                                    label="Rate"
                                                                    placeholder="Rate"
                                                                    onChange={(
                                                                        e
                                                                    ) => { }}
                                                                    className="mt-0 rounded"
                                                                />
                                                            </div>

                                                            {/* Quantity */}
                                                            <div className="flex-1">
                                                                <ATMTextField
                                                                    type="number"
                                                                    min={0}
                                                                    name={`productSalesOrder[${index}].quantity`}
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
                                                                    ) => {
                                                                        handleSetFieldValue(
                                                                            `productSalesOrder[${index}].quantity`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }}
                                                                    className="mt-0 rounded"
                                                                />
                                                            </div>

                                                            {/* BUTTON - Delete */}
                                                            {values
                                                                .productSalesOrder
                                                                ?.length >
                                                                1 && (
                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                remove(
                                                                                    index
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
                                        <div className="flex justify-self-start py-9">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    push({
                                                        productGroupId: '',
                                                        rate: 0,
                                                        quantity: 0,
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

export default AddRTVendor
