/* eslint-disable react-hooks/exhaustive-deps */

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { FieldArray, FormikProps } from 'formik'
import { HiPlus } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import { useParams } from 'react-router-dom'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { AppDispatch } from 'src/redux/store'
import { useGetWareHousesByCompanyIdQuery } from 'src/services/WareHouseService'
import { showToast } from 'src/utils'
import { FormInitialValues } from './AddWarehouseToComapnyTransferWrapper'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: {
        companyOption: SelectOption[]
        warehouseOptions: SelectOption[]
        productGroupOptions: SelectOption[]
    }
    productPriceOptions: any
    apiStatus: boolean
}

const AddWarehouseToComapnyTransfer = ({
    formikProps,
    dropdownOptions,
    apiStatus,
    productPriceOptions,
}: Props) => {
    const params = useParams()
    // Breadcrumbs
    const breadcrumbs: BreadcrumbType[] = [
        {
            label: `${params.dealerId ? 'WTC transfer' : 'WTC  Transfer'}`,
            path: `${
                params.dealerId
                    ? `/dealers/${params.dealerId}/warehouse-to-company`
                    : '/warehouse-to-company'
            }`,
        },
        {
            label: 'Add warehouse transfer',
        },
    ]

    const { values, setFieldValue } = formikProps

    const dispatch = useDispatch<AppDispatch>()
    const [productGroup, setProductGroup] = useState('')
    const [i, setI] = useState(0)

    const { options: selectedCompanyWarehouseOption } = useCustomOptions({
        useEndPointHook: useGetWareHousesByCompanyIdQuery(values?.toCompanyId, {
            skip: !values?.toCompanyId,
        }),
        keyName: 'wareHouseName',
        value: '_id',
    })

    useEffect(() => {
        const val: any = productPriceOptions?.find(
            (e: any) => e['value'] === productGroup
        )

        if (val) {
            setFieldValue(`productSalesOrder[${i}].rate`, val['label'])
        } else {
            setFieldValue(`productSalesOrder[${i}].rate`, '')
        }
    }, [productGroup])

    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className=" h-[calc(100vh-55px)] overflow-auto">
            <div className="flex flex-col gap-2 p-4 ">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> warehouse transfer </ATMPageHeading>
                </div>

                <div className="max-h-full bg-white bg-no-repeat bg-cover border rounded shadow grow bg-1 bg-form-bg">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            {' '}
                            Warwhouse Transfer Details{' '}
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
                    <div className="px-3 grow py-9 ">
                        <div className="grid grid-cols-4 gap-4">
                            {/* SO Number */}
                            <ATMTextField
                                required
                                name="wtcNumber"
                                value={values.wtcNumber}
                                label="Warehouse transfer No."
                                placeholder="WTC Number"
                                onChange={(e) =>
                                    handleSetFieldValue(
                                        'wtcNumber',
                                        e.target.value
                                    )
                                }
                                className="rounded"
                            />

                            {/* from Warehouse */}
                            <ATMSelectSearchable
                                required
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

                            <ATMSelectSearchable
                                required
                                name="toCompanyId"
                                value={values.toCompanyId}
                                onChange={(e) => {
                                    handleSetFieldValue('toCompanyId', e)
                                }}
                                options={dropdownOptions.companyOption}
                                label="to Company"
                                selectLabel="Select company"
                            />
                            {/* to Warehouse */}
                            <ATMSelectSearchable
                                required
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
                                options={selectedCompanyWarehouseOption}
                                label="To Warehouse"
                                selectLabel="Select Warehouse"
                            />

                            <div className="-mt-2">
                                <ATMTextArea
                                    label="Remark"
                                    placeholder="enter remark"
                                    className="rounded mt-0"
                                    labelClass="text-slate-700  text-sm font-medium"
                                    minRows={4}
                                    name="remark"
                                    value={values.remark}
                                    onChange={(e) =>
                                        handleSetFieldValue('remark', e)
                                    }
                                    // options={dropdownOptions.warehouseOptions}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Sales Order  */}
                <div className="px-3">
                    <div className="pb-2 text-lg font-medium text-primary-main">
                        Add ProductGroup to Warehouse company
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
                                                        className="flex items-end gap-3 "
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
                                                                        setI(0)
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
                                                                disabled={true}
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
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }}
                                                                className="mt-0 rounded"
                                                            />
                                                        </div>

                                                        {/* BUTTON - Delete */}
                                                        {values
                                                            .productSalesOrder
                                                            ?.length > 1 && (
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        remove(
                                                                            index
                                                                        )
                                                                    }}
                                                                    className="p-2 text-white bg-red-500 rounded"
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
                                            className="flex items-center px-2 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded-full "
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
        // </div>
    )
}

export default AddWarehouseToComapnyTransfer
