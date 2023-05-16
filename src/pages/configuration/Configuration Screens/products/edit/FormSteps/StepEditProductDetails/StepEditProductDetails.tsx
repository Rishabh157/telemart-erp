import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditProductWrapper'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'

type DropdownOptions = {
    productSubCategoryOPtions: SelectOption[]
    productCategoryOPtions: SelectOption[]
    productGroupOPtions: SelectOption[]
}

type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
}

const StepEditProductDetails = ({ formikProps, dropdownOptions }: Props) => {
    const { values, setFieldValue } = formikProps

    return (
        <div className="py-6 px-7 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 gap-y-5">
                {/* Product Code */}
                <ATMTextField
                    name="product_code"
                    value={values.product_code}
                    onChange={(e) =>
                        setFieldValue('product_code', e.target.value)
                    }
                    label="Product Code"
                    placeholder="Product Code"
                    className="shadow bg-white rounded"
                />

                {/* Product Name */}
                <ATMTextField
                    name="product_name"
                    value={values.product_name}
                    onChange={(e) =>
                        setFieldValue('product_name', e.target.value)
                    }
                    label="Product Name"
                    placeholder="Product Name"
                    className="shadow bg-white rounded"
                />

                {/* Product Category */}
                <ATMSelect
                    name="product_category"
                    value={values.product_category}
                    onChange={(e) =>
                        setFieldValue('product_category', e.target.value)
                    }
                    label="Product Category"
                    options={dropdownOptions.productCategoryOPtions}
                />

                {/* Product Sub Category */}
                <ATMSelect
                    name="product_sub_category"
                    value={values.product_sub_category}
                    onChange={(e) =>
                        setFieldValue('product_sub_category', e.target.value)
                    }
                    label="Product Sub Category"
                    options={dropdownOptions.productSubCategoryOPtions}
                />

                {/* Product Sub Category */}
                <ATMSelect
                    name="productGroup"
                    value={values.productGroup}
                    onChange={(e) =>
                        setFieldValue('productGroup', e.target.value)
                    }
                    label="Product Group"
                    options={dropdownOptions.productGroupOPtions}
                />

                {/* Product Weight */}
                <ATMTextField
                    name="product_weight"
                    value={values.product_weight}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            setFieldValue('product_weight', String(inputValue))
                        }
                    }}
                    label="Product Weight (in gms)"
                    placeholder="Product Weight"
                    className="shadow bg-white rounded"
                />

                {/* Dimensions */}
                <div>
                    <label className="text-slate-700 font-medium">
                        {' '}
                        Dimensions{' '}
                    </label>
                    <div className="flex gap-2 mt-2">
                        {/* Height */}
                        <ATMTextField
                            name="dimensions.height"
                            value={values.dimensions.height}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    setFieldValue(
                                        'dimensions.height',
                                        inputValue
                                    )
                                }
                            }}
                            placeholder="H"
                            className="shadow bg-white rounded"
                        />

                        {/* Weight */}
                        <ATMTextField
                            name="dimensions.width"
                            value={values.dimensions.width}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    setFieldValue(
                                        'dimensions.width',
                                        inputValue
                                    )
                                }
                            }}
                            placeholder="W"
                            className="shadow bg-white rounded"
                        />

                        {/* Depth */}
                        <ATMTextField
                            name="dimensions.depth"
                            value={values.dimensions.depth}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    setFieldValue(
                                        'dimensions.depth',
                                        inputValue
                                    )
                                }
                            }}
                            placeholder="D"
                            className="shadow bg-white rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div>
                <ATMTextArea
                    name="description"
                    value={values.description}
                    onChange={(newValue) =>
                        setFieldValue('description', newValue)
                    }
                    label="Description"
                    placeholder="Description"
                    className="shadow bg-white rounded"
                    minRows={3}
                />
            </div>
        </div>
    )
}

export default StepEditProductDetails
