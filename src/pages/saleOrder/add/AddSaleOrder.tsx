/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from './AddSaleOrderWrapper'
import { HiPlus } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllWareHouseByDealerIdQuery } from 'src/services/WareHoouseService'
import { setDealerWarehouse } from 'src/redux/slices/warehouseSlice'
import { AppDispatch, RootState } from 'src/redux/store'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: {
        dealerOptions: SelectOption[]
        warehouseOptions: SelectOption[]
        productGroupOptions: SelectOption[]
    }
    productPriceOptions: []
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Sale Order',
        path: '/sale-order',
    },
    {
        label: 'Add Sale Order',
    },
]

const AddSaleOrder = ({
    formikProps,
    dropdownOptions,
    apiStatus,
    productPriceOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps

    //console.log(productPriceOptions)

    const dispatch = useDispatch<AppDispatch>()
    const [dealerId, setDealerId] = useState('')
    const [productGroup, setProductGroup] = useState('')
    const [i, setI] = useState(0)

    const dealerWarehouse: any = useSelector(
        (state: RootState) => state.warehouse
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId = userData?.companyId

    const { data, isLoading, isFetching } = useGetAllWareHouseByDealerIdQuery({
        companyId,
        dealerId,
    })

    useEffect(() => {
        if (dealerId !== '' && !isLoading && !isFetching) {
            dispatch(setDealerWarehouse(data?.data))
        }
    }, [data, isLoading, isFetching, dealerId, dispatch])

    const dealerWarehouseOptions = dealerWarehouse?.dealerWarehouse?.map(
        (ele: any) => {
            return {
                label: ele.wareHouseName,
                value: ele._id,
            }
        }
    )

    useEffect(() => {
        const val: any = productPriceOptions?.find(
            (e) => e['key'] === productGroup
        )

        if (val) {
            setFieldValue(`productSalesOrder[${i}].rate`, val['value'])
        }
        //alert( i)
    }, [productGroup])

    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New Sale Order </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium"> SO Details </div>
                        {/* BUTTON - Add SO */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                Add SO
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-4 gap-4">
                            {/* SO Number */}
                            <ATMTextField
                                name="soNumber"
                                value={values.soNumber}
                                label="SO Number"
                                placeholder="SO Number"
                                onChange={(e) =>
                                    setFieldValue('soNumber', e.target.value)
                                }
                            />

                            {/* Dealer */}
                            <ATMSelect
                                name="dealerId"
                                value={values.dealerId}
                                onChange={(e) => {
                                    setFieldValue('dealerId', e.target.value)
                                    setDealerId(e.target.value)
                                }}
                                options={dropdownOptions.dealerOptions}
                                label="Dealer"
                            />

                            {/* Dealer Warehouse */}
                            <ATMSelect
                                name="dealerWareHouseId"
                                value={values.dealerWareHouseId}
                                onChange={(e) =>
                                    setFieldValue(
                                        'dealerWareHouseId',
                                        e.target.value
                                    )
                                }
                                options={dealerWarehouseOptions}
                                label="Dealer Warehouse"
                            />
                            {/* Warehouse */}
                            <ATMSelect
                                name="companyWareHouseId"
                                value={values.companyWareHouseId}
                                onChange={(e) =>
                                    setFieldValue(
                                        'companyWareHouseId',
                                        e.target.value
                                    )
                                }
                                options={dropdownOptions.warehouseOptions}
                                label="Warehouse"
                            />
                        </div>
                    </div>

                    {/*  Sales Order  */}
                    <div className="px-3">
                        <div className=" text-lg pb-2 font-medium text-primary-main">
                            Add ProductGroup to sale order
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
                                                            <div className="flex-1">
                                                                <ATMSelect
                                                                    name={`productSalesOrder[${index}].productGroupId`}
                                                                    value={
                                                                        productGroupId
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setFieldValue(
                                                                            `productSalesOrder[${index}].productGroupId`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )

                                                                        setI(0)
                                                                        setProductGroup(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                        setI(
                                                                            index
                                                                        )
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
                                                                    ) => {}}
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
                                                                        setFieldValue(
                                                                            `productSalesOrder[${index}].quantity`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }}
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
                                                        rate: null,
                                                        quantity: null,
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
