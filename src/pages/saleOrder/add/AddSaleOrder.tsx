// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from './AddSaleOrderWrapper'
import { useGetAllWareHouseByDealerIdQuery } from 'src/services/DealerWarehouseService'

// |-- Redux --|
import { AppDispatch, RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useParams } from 'react-router-dom'
import { showToast } from 'src/utils'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: {
        dealerOptions: SelectOption[]
        warehouseOptions: SelectOption[]
        productGroupOptions: SelectOption[]
    }
    productPriceOptions: any
    apiStatus: boolean
}

const AddSaleOrder = ({
    formikProps,
    dropdownOptions,
    apiStatus,
    productPriceOptions,
}: Props) => {
    const params = useParams()
    // Breadcrumbs
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: `${params.dealerId ? ' Dealers Sale Order' : 'Sale Order'}`,
            path: `${params.dealerId
                ? `/dealers/${params.dealerId}/sale-order`
                : '/sale-order'
                }`,
        },
        {
            label: 'Add Sale Order',
        },
    ]

    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch<AppDispatch>()
    const [productGroup, setProductGroup] = useState('')
    const [i, setI] = useState(0)

    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId = userData?.companyId

    const { options: dealerWarehouseOptions } = useCustomOptions({
        useEndPointHook: useGetAllWareHouseByDealerIdQuery(
            {
                companyId,
                dealerId: values?.dealerId,
            },
            {
                skip: !values.dealerId,
            }
        ),
        keyName: 'wareHouseName',
        value: '_id',
    })

    useEffect(() => {
        const val: any = productPriceOptions?.find((e: any) => e['value'] === productGroup)

        if (val) {
            setFieldValue(`productSalesOrder[${i}].rate`, val['label'])
        } else {
            setFieldValue(`productSalesOrder[${i}].rate`, 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productGroup])

    useEffect(() => {
        if (values?.dealerId) {
            setFieldValue(`dealerWareHouseId`, dealerWarehouseOptions?.[0]?.value)
        }
    }, [values.dealerId, dealerWarehouseOptions, setFieldValue])

    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="h-[calc(100vh-55px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div>
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Sale Order </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">SO Details</div>
                        {/* BUTTON - Add SO */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${apiStatus ? 'opacity-50' : ''}`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-3 gap-3">
                            {/* Dealer */}
                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    required
                                    label="Dealer"
                                    name="dealerId"
                                    value={values.dealerId}
                                    options={dropdownOptions.dealerOptions}
                                    onChange={(e) => {
                                        handleSetFieldValue('dealerId', e)

                                        if (e === '') {
                                            return handleSetFieldValue('dealerWareHouseId', '')
                                        }
                                    }}
                                />
                            </div>
                            {/* Dealer Warehouse */}
                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    required
                                    name="dealerWareHouseId"
                                    label="Dealer Warehouse"
                                    value={values.dealerWareHouseId}
                                    options={dealerWarehouseOptions}
                                    onChange={(e) => handleSetFieldValue('dealerWareHouseId', e)}
                                />
                            </div>
                            {/* Warehouse */}
                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    required
                                    name="companyWareHouseId"
                                    label="Company Warehouse"
                                    value={values.companyWareHouseId}
                                    options={dropdownOptions.warehouseOptions}
                                    onChange={(e) => handleSetFieldValue('companyWareHouseId', e)}
                                />
                            </div>

                            <ATMDatePicker
                                required
                                name="expectedDeliveryDate"
                                value={values.expectedDeliveryDate}
                                label="Expected Delivery Date"
                                onChange={(newValue) => {
                                    handleSetFieldValue(
                                        'expectedDeliveryDate',
                                        newValue
                                    )
                                }}
                            />
                        </div>
                    </div>

                    {/*  Sales Order  */}
                    <div className="px-3">
                        <div className=" text-lg pb-2 font-medium text-primary-main">
                            Add Product Group In Sale order
                        </div>

                        <FieldArray name="productSalesOrder">
                            {({ push, remove }) => {
                                return (
                                    <>
                                        <div className="flex flex-col gap-y-5">
                                            {values.productSalesOrder?.map(
                                                (item, index) => {
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
                                                                    required
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
                                                                                    f
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
                                                                    required
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
                                                                    required
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

export default AddSaleOrder
