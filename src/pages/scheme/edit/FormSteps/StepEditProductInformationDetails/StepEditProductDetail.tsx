/// ==============================================
// Filename:StepEditProductDetails.tsx
// Type: Edit Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditSchemeWrapper'
import { DropdownOptions } from './StepEditProductDetailWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
}

const StepEditProductDetail = ({ formikProps, dropdownOptions }: Props) => {
    const { values, setFieldValue } = formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="">
            <FieldArray name="productInformation">
                {({ push, remove }) => (
                    <div className="">
                        {values.productInformation?.map(
                            (product, productIndex) => {
                                const {
                                    productGroup,
                                    productQuantity,
                                    mrp,
                                    pop,
                                } = product

                                return (
                                    <div
                                        key={productIndex}
                                        className={`flex flex-col gap-3 py-6 px-7 ${
                                            productIndex !==
                                                values.productInformation
                                                    .length -
                                                    1 && 'border-b'
                                        }  border-slate-300 `}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="text-primary-main text-lg pb-2 font-medium ">
                                                Product Information #
                                                {productIndex + 1}
                                            </div>
                                            {/* Delete Button */}
                                            {values.productInformation?.length >
                                                1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        remove(productIndex)
                                                    }
                                                    className="p-1 bg-red-500 text-white rounded"
                                                >
                                                    <MdDeleteOutline className="text-2xl" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-5 gap-4 gap-y-5">
                                            {/* Product Group */}
                                            <div className="col-span-2 -mt-2">
                                                <ATMSelectSearchable
                                                    name={`productInformation[${productIndex}].productGroup`}
                                                    value={productGroup}
                                                    onChange={(e) => {
                                                        handleSetFieldValue(
                                                            `productInformation[${productIndex}].productGroup`,
                                                            e
                                                        )
                                                    }}
                                                    label="Product Group"
                                                    selectLabel="Select Product Group"
                                                    options={
                                                        dropdownOptions.productGroupOptions
                                                    }
                                                />
                                            </div>

                                            {/* Product Quantity */}
                                            <ATMTextField
                                                name={`productInformation[${productIndex}].productQuantity`}
                                                value={productQuantity.toString()}
                                                onChange={(e) => {
                                                    handleSetFieldValue(
                                                        `productInformation[${productIndex}].productQuantity`,
                                                        e.target.value
                                                    )
                                                }}
                                                label="Product Quantity"
                                                placeholder="Product Quantity"
                                                className="shadow bg-white rounded"
                                            />

                                            {/* MRP */}
                                            <ATMTextField
                                                name={`productInformation[${productIndex}].mrp`}
                                                value={mrp.toString()}
                                                onChange={(e) => {
                                                    handleSetFieldValue(
                                                        `productInformation[${productIndex}].mrp`,
                                                        e.target.value
                                                    )
                                                }}
                                                label="MRP"
                                                placeholder="MRP"
                                                className="shadow bg-white rounded"
                                            />

                                            {/* POP  */}
                                            <ATMTextField
                                                name={`productInformation[${productIndex}].pop`}
                                                value={pop.toString()}
                                                onChange={(e) => {
                                                    handleSetFieldValue(
                                                        `productInformation[${productIndex}].pop`,
                                                        e.target.value
                                                    )
                                                }}
                                                label="POP"
                                                placeholder="Product Offer Price"
                                                className="shadow bg-white rounded"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        )}

                        <div className="flex justify-self-start p-5">
                            <button
                                type="button"
                                onClick={() =>
                                    push({
                                        productGroup: '',
                                        productQuantity: '',
                                        mrp: 0,
                                        pop: 0,
                                    })
                                }
                                className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                            >
                                <HiPlus size="20" /> Add More
                            </button>
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    )
}

export default StepEditProductDetail
