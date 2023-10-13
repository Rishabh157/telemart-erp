/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:EditWarehouseTransfer.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
// import { MdDeleteOutline } from "react-icons/md";
import {
    useDispatch,
    //  useSelector
} from 'react-redux'
import { HiPlus } from 'react-icons/hi'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from './EditWarehouseTransferWrapper'
// import { useGetAllWareHouseByDealerIdQuery } from 'src/services/DealerWarehouseService'

// |-- Redux --|
// import { setDealerWarehouse } from 'src/redux/slices/warehouseSlice'
import {
    AppDispatch,
    //  RootState
} from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { showToast } from 'src/utils'
import { MdDeleteOutline } from 'react-icons/md'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'

// |-- Types --|
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
        label: 'Warehouse transfer',
        path: '/warehouse-transfer',
    },
    {
        label: 'Edit',
    },
]

const EditWarehouseTransfer = ({
    formikProps,
    dropdownOptions,
    apiStatus,
    productPriceOptions,
}: Props) => {
    dropdownOptions = {
        ...dropdownOptions,
    }

    const { values, setFieldValue } = formikProps
    const [i, setI] = useState(0)
    const dispatch = useDispatch<AppDispatch>()
    // const [dealerId, setDealerId] = useState('')
    const [productGroup, setProductGroup] = useState('')

    // const dealerWarehouse: any = useSelector(
    //     (state: RootState) => state.warehouse
    // )
    // // const { userData } = useSelector((state: RootState) => state?.auth)
    // const companyId = userData?.companyId

    // const { data, isLoading, isFetching } = useGetAllWareHouseByDealerIdQuery(
    //     {
    //         companyId,
    //         dealerId: values?.dealerId,
    //     },
    //     {
    //         skip: !values.dealerId,
    //     }
    // )

    // useEffect(() => {
    //     if (!isLoading && !isFetching) {
    //         dispatch(setDealerWarehouse(data?.data))
    //     }
    // }, [data, isLoading, isFetching, dispatch])

    // const dealerWarehouseOptions = dealerWarehouse?.dealerWarehouse?.map(
    //     (ele: any) => {
    //         return {
    //             label: ele.wareHouseName,
    //             value: ele._id,
    //         }
    //     }
    // )

    useEffect(() => {
        const val: any = productPriceOptions?.find(
            (e) => e['key'] === productGroup
        )

        if (val) {
            setFieldValue(`productSalesOrder[${i}].rate`, val['value'])
        } else {
            setFieldValue(`productSalesOrder[${i}].rate`, '')
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
                    <ATMPageHeading> Warehouse Transfer </ATMPageHeading>
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
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-4 gap-4">
                            {/* SO Number */}
                            <ATMTextField
                                name="wtNumber"
                                value={values.wtNumber}
                                label="Warehouse Transfer Number"
                                placeholder="WT Number"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'wtNumber',
                                        e.target.value
                                    )
                                }
                            />

                            {/* from Warehouse */}
                            <ATMSelectSearchable
                                name="fromWarehouseId"
                                value={values.fromWarehouseId}
                                onChange={(e) => {
                                    if (values.toWarehouseId.match(e)) {
                                        showToast(
                                            'error',
                                            'warehouse same as to warehouse'
                                        )
                                        return
                                    }
                                    handleSetFieldValue('fromWarehouseId', e)
                                }}
                                options={dropdownOptions.warehouseOptions}
                                label="From warehouse (company)"
                                selectLabel="Select Warehouse"
                            />
                            {/* to Warehouse */}
                            <ATMSelectSearchable
                                name="toWarehouseId"
                                value={values?.toWarehouseId}
                                onChange={(e) => {
                                    if (values.fromWarehouseId.match(e)) {
                                        showToast(
                                            'error',
                                            'warehouse same as from warehouse'
                                        )
                                        return
                                    }
                                    handleSetFieldValue('toWarehouseId', e)
                                }}
                                options={dropdownOptions.warehouseOptions}
                                label="To Warehouse"
                                selectLabel="Select Warehouse"
                            />
                            <div className="-mt-2">
                                <ATMTextArea
                                    minRows={1}
                                    name="remark"
                                    value={values.remark}
                                    onChange={(e) =>
                                        handleSetFieldValue('remark', e)
                                    }
                                    label="remark"
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

export default EditWarehouseTransfer
