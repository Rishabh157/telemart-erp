/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { FormikProps, FieldArray } from 'formik'
// import { MdDeleteOutline } from "react-icons/md";
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from './EditSaleOrderWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllWareHouseByDealerIdQuery } from 'src/services/WareHoouseService'
import { setDealerWarehouse } from 'src/redux/slices/warehouseSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

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
        label: 'Update Sale Order',
    },
]

const EditSaleOrder = ({
    formikProps,
    dropdownOptions,
    apiStatus,
    productPriceOptions,
}: Props) => {
    dropdownOptions = {
        ...dropdownOptions,
    }

    //console.log(productPriceOptions)

    const { values, setFieldValue } = formikProps

    const dispatch = useDispatch<AppDispatch>()
    const [dealerId, setDealerId] = useState('')
    const [productGroup, setProductGroup] = useState('')
    const [price, setPrice] = useState('')

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
        const val = productPriceOptions?.find((e) => e['key'] === productGroup)

        if (val) {
            setFieldValue(`productSalesOrder.rate`, val['value'])
        }
    }, [productGroup])

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
                                Update SO
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
                                    handleSetFieldValue(
                                        'soNumber',
                                        e.target.value
                                    )
                                }
                            />

                            {/* Dealer */}
                            <ATMSelectSearchable
                                name="dealerId"
                                value={values?.dealerId}
                                onChange={(e) => {
                                    handleSetFieldValue('dealerId', e)
                                    setDealerId(e)
                                }}
                                options={dropdownOptions.dealerOptions}
                                label="Dealer"
                                selectLabel="Select Dealer"
                            />

                            {/* Dealer Warehouse */}
                            <ATMSelectSearchable
                                name="dealerWareHouseId"
                                value={values.dealerWareHouseId}
                                onChange={(e) =>
                                    handleSetFieldValue('dealerWareHouseId', e)
                                }
                                options={dealerWarehouseOptions}
                                label="Dealer Warehouse"
                                selectLabel="Select Dealer Warehouse"
                            />
                            {/* Warehouse */}
                            <ATMSelectSearchable
                                name="companyWareHouseId"
                                value={values.companyWareHouseId}
                                onChange={(e) =>
                                    handleSetFieldValue('companyWareHouseId', e)
                                }
                                options={dropdownOptions.warehouseOptions}
                                label="Warehouse"
                                selectLabel="Select Warehouse"
                            />
                        </div>
                    </div>

                    {/*  Sales Order  */}
                    <div className="px-3">
                        <div className=" text-lg pb-2 font-medium text-primary-main">
                            Update ProductGroup to sale order
                        </div>

                        <FieldArray name="productSalesOrder">
                            {({ push, remove }) => {
                                return (
                                    <>
                                        <div className="flex flex-col gap-y-5 py-3">
                                            {/* {values.productSalesOrder?.map(
                                            (item: any, index: number) => { */}
                                            {/* const { productGroupId, rate, quantity } = item; */}
                                            {/* // return ( */}
                                            <div className="flex gap-3 items-end pb-5">
                                                {/* Product Name */}
                                                <div className="flex-1">
                                                    <ATMSelectSearchable
                                                        name={`productSalesOrder.productGroupId`}
                                                        value={
                                                            values
                                                                ?.productSalesOrder
                                                                ?.productGroupId ||
                                                            ''
                                                        }
                                                        onChange={(e) => {
                                                            handleSetFieldValue(
                                                                `productSalesOrder.productGroupId`,
                                                                e
                                                            )
                                                            handleSetFieldValue(
                                                                `productSalesOrder.rate`,
                                                                ''
                                                            )
                                                            setProductGroup(e)
                                                            setPrice('')
                                                        }}
                                                        selectLabel=" Select Product Group"
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
                                                        disabled={true}
                                                        name={`productSalesOrder.rate`}
                                                        value={
                                                            values?.productSalesOrder?.rate?.toString() ||
                                                            ''
                                                        }
                                                        label="Rate"
                                                        placeholder="Rate"
                                                        onChange={(e) =>
                                                            handleSetFieldValue(
                                                                `productSalesOrder.rate`,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>

                                                {/* Quantity */}
                                                <div className="flex-1 ">
                                                    <ATMTextField
                                                        type="number"
                                                        min={0}
                                                        name={`productSalesOrder.quantity`}
                                                        value={
                                                            values?.productSalesOrder?.quantity?.toString() ||
                                                            ''
                                                        }
                                                        label="Quantity"
                                                        placeholder="Quantity"
                                                        onChange={(e) => {
                                                            handleSetFieldValue(
                                                                `productSalesOrder.quantity`,
                                                                e.target.value
                                                            )
                                                            handleSetFieldValue(
                                                                `productSalesOrder.rate`,
                                                                price
                                                            )
                                                        }}
                                                    />
                                                </div>
                                            </div>
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

export default EditSaleOrder
