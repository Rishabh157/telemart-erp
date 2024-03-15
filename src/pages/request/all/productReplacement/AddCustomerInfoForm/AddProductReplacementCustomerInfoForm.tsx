// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
// import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddProductReplacementCustomerInfoFormWrapper'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { handleValidNumber } from 'src/utils/methods/numberMethods'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { ProductGroupListResponse } from 'src/models/ProductGroup.model'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useGetLocalStorage } from 'src/hooks/useGetLocalStorage'
import { useGetAllSchemeListByPgiQuery } from 'src/services/SchemeService'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

const AddProductReplacementCustomerInfoForm = ({
    formikProps,
    apiStatus,
}: Props) => {
    const [productGroupOptions, setProductGroupOptions] = useState<any[]>([])
    const [schemeGroupOptions, setSchemeGroupOptions] = useState<any[]>([])

    const { values, setFieldValue } = formikProps
    const { userData } = useGetLocalStorage()

    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    //product data
    const {
        data: productGroupData,
        isLoading: isProductGroupLoading,
        isFetching: isProductGroupFetching,
    } = useGetAllProductGroupQuery(userData?.companyId, {
        skip: !userData?.companyId,
    })

    useEffect(() => {
        if (!isProductGroupLoading && !isProductGroupFetching) {
            if (productGroupData?.status) {
                const productGroupOptionsList: any =
                    productGroupData?.data?.map(
                        (products: ProductGroupListResponse) => {
                            return {
                                label: products?.groupName,
                                value: products?._id,
                            }
                        }
                    )
                setProductGroupOptions(productGroupOptionsList)
            }
        }
    }, [productGroupData, isProductGroupLoading, isProductGroupFetching])

    // GET Schemes list by companyId and productsGroupId
    const {
        data: schemeListData,
        isFetching: isSchemeListFetching,
        isLoading: isSchemeListLoading,
    } = useGetAllSchemeListByPgiQuery(
        {
            companyId: userData?.companyId,
            productGroupId: values?.productGroupId,
        },
        {
            skip: !values?.productGroupId || !userData?.companyId,
        }
    )

    useEffect(() => {
        if (!isSchemeListFetching && !isSchemeListLoading) {
            const schemeList = schemeListData?.data?.map((products: any) => {
                return {
                    label: products?.schemeName,
                    value: products?._id,
                }
            })
            setSchemeGroupOptions(schemeList)
        }
    }, [schemeListData, isSchemeListFetching, isSchemeListLoading])

    return (
        <div className="h-[calc(60vh-20px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat pb-4">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            Add Customer Information
                        </div>

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
                        <div className="grid grid-cols-2 gap-4">
                            <ATMTextField
                                name="customerNumber"
                                value={values?.customerNumber}
                                label="Customer Number"
                                placeholder="Enter customer number"
                                className="mt-0 rounded"
                                onChange={(e) =>
                                    handleValidNumber(e) &&
                                    handleSetFieldValue(
                                        'customerNumber',
                                        e.target.value
                                    )
                                }
                            />

                            <ATMTextField
                                name="alternateNumber"
                                value={values?.alternateNumber}
                                label="Alternate Number"
                                placeholder="enter alternate number"
                                className="mt-0 rounded"
                                onChange={(e) =>
                                    handleValidNumber(e) &&
                                    handleSetFieldValue(
                                        'alternateNumber',
                                        e.target.value
                                    )
                                }
                            />

                            {/* Product Group */}
                            <ATMSelectSearchable
                                label="Product Group"
                                name="productGroupId"
                                selectLabel="Select product"
                                value={values.productGroupId || ''}
                                options={productGroupOptions || []}
                                onChange={(e) => {
                                    handleSetFieldValue('productGroupId', e)
                                }}
                            />

                            {/* Scheme */}
                            <ATMSelectSearchable
                                label="Scheme"
                                name="replacedSchemeId"
                                selectLabel="Select scheme"
                                defaultValue=""
                                value={values?.replacedSchemeId || ''}
                                options={schemeGroupOptions}
                                isValueWithLable
                                onChange={(e) => {
                                    handleSetFieldValue(
                                        'replacedSchemeId',
                                        e?.value
                                    )
                                    handleSetFieldValue(
                                        'replacedSchemeLabel',
                                        e?.label
                                    )
                                }}
                            />

                            <div className="-mt-3">
                                <ATMTextArea
                                    minRows={4}
                                    name="ccRemark"
                                    value={values?.ccRemark}
                                    labelClass="text-sm text-slate-700 font-medium -mb-3"
                                    className="rounded"
                                    label="Customer Remark "
                                    placeholder="Enter customer remark"
                                    onChange={(newValue) =>
                                        handleSetFieldValue(
                                            'ccRemark',
                                            newValue
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProductReplacementCustomerInfoForm
