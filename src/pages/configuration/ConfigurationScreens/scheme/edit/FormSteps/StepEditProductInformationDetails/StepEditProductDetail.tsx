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
        <div >
            <FieldArray name="productInformation">
                {({ push, remove }) => (
                    <div >
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
                                        <div className="flex items-center justify-between">
                                            <div className="pb-2 text-lg font-medium text-primary-main ">
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
                                                    className="p-1 text-white bg-red-500 rounded"
                                                >
                                                    <MdDeleteOutline className="text-2xl" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-5 gap-4 gap-y-5">
                                            {/* Product Group */}
                                            <div className="col-span-2">
                                                <ATMSelectSearchable
                                                    required
                                                    name={`productInformation[${productIndex}].productGroup`}
                                                    value={productGroup}
                                                    isValueWithLable
                                                    onChange={(e) => {
                                                        handleSetFieldValue(
                                                            `productInformation[${productIndex}].productGroup`,
                                                            e?.value
                                                        )
                                                        handleSetFieldValue(
                                                            `productInformation[${productIndex}].productGroupName`,
                                                            e?.label
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
                                                required
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
                                                className="bg-white rounded shadow"
                                            />

                                            {/* MRP */}
                                            <ATMTextField
                                                required
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
                                                className="bg-white rounded shadow"
                                            />

                                            {/* POP  */}
                                            <ATMTextField
                                                required
                                                name={`productInformation[${productIndex}].pop`}
                                                value={pop.toString()}
                                                onChange={(e) => {
                                                    handleSetFieldValue(
                                                        `productInformation[${productIndex}].pop`,
                                                        e.target.value
                                                    )
                                                }}
                                                label="Product Offer Price (POP)"
                                                placeholder="Product Offer Price"
                                                className="bg-white rounded shadow"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        )}

                        <div className="flex p-5 justify-self-start">
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
                                className="flex items-center px-2 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded-full "
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
