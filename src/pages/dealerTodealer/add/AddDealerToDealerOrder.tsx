/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:AddSaleOrder.tsx
// Type: Add Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from './AddDealerToDealerOrderWrapper'
// import { useGetAllWareHouseByDealerIdQuery } from 'src/services/DealerWarehouseService'

// |-- Redux --|
import { AppDispatch } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useParams } from 'react-router-dom'
import { showToast } from 'src/utils'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { handleValidNumber } from 'src/utils/methods/numberMethods'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: {
        dealerOptions: SelectOption[]
        productGroupOptions: SelectOption[]
    }
    productPriceOptions: any
    apiStatus: boolean
}

const AddDealerToDealerOrder = ({
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
            path: `${
                params.dealerId
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

    useEffect(() => {
        const val: any = productPriceOptions?.find(
            (e: any) => e['value'] === productGroup
        )

        if (val) {
            setFieldValue(`productDetails[${i}].rate`, val['label'])
        } else {
            setFieldValue(`productDetails[${i}].rate`, '')
        }
    }, [productGroup])

    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className=" h-[calc(100vh-55px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading>Dealer To Dealer</ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            Dealer To Dealer Details
                        </div>
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
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-9 px-3 ">
                        <div className="grid grid-cols-3 gap-3">
                            <ATMTextField
                                name="dtdNumber"
                                value={values.dtdNumber}
                                label="Dealer To Dealer No."
                                placeholder="enter dtd number"
                                className="mt-0 rounded"
                                onChange={(e) =>
                                    handleValidNumber(e) &&
                                    handleSetFieldValue(
                                        'dtdNumber',
                                        e.target.value
                                    )
                                }
                            />

                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    name="fromDealerId"
                                    label="From Dealer"
                                    value={values?.fromDealerId}
                                    options={dropdownOptions.dealerOptions}
                                    onChange={(e) => {
                                        if (values?.toDealerId === e) {
                                            showToast(
                                                'error',
                                                'you can not select the same dealer'
                                            )
                                        } else {
                                            handleSetFieldValue(
                                                'fromDealerId',
                                                e
                                            )
                                        }
                                    }}
                                />
                            </div>

                            <div className="-mt-2">
                                <ATMSelectSearchable
                                    name="toDealerId"
                                    label="To Dealer"
                                    value={values?.toDealerId}
                                    options={dropdownOptions.dealerOptions}
                                    onChange={(e) => {
                                        if (values?.fromDealerId === e) {
                                            showToast(
                                                'error',
                                                'you can not select the same dealer'
                                            )
                                        } else {
                                            handleSetFieldValue('toDealerId', e)
                                        }
                                    }}
                                />
                            </div>
                            <div className="-mt-2">
                                <ATMTextArea
                                    label="Remark"
                                    name="remark"
                                    placeholder="enter remark"
                                    value={values?.remark}
                                    minRows={4}
                                    className="rounded"
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
                            Add ProductGroup to sale order
                        </div>

                        <FieldArray name="productDetails">
                            {({ push, remove }) => {
                                return (
                                    <>
                                        <div className="flex flex-col gap-y-5">
                                            {values?.productDetails?.map(
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
                                                                    name={`productDetails[${index}].productGroupId`}
                                                                    value={
                                                                        productGroupId
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        console.log(
                                                                            'COSMOS',
                                                                            e
                                                                        )
                                                                        if (
                                                                            !values?.productDetails?.find(
                                                                                (
                                                                                    f
                                                                                ) =>
                                                                                    f.productGroupId ===
                                                                                    e
                                                                            )
                                                                        ) {
                                                                            setFieldValue(
                                                                                `productDetails[${index}].productGroupId`,
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
                                                                    name={`productDetails[${index}].rate`}
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
                                                                    name={`productDetails[${index}].quantity`}
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
                                                                            `productDetails[${index}].quantity`,
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
                                                                .productDetails
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

export default AddDealerToDealerOrder
