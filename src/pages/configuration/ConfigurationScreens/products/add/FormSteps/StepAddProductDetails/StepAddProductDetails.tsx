/// ==============================================
// Filename:StepAddProductDetails.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { FormInitialValues } from '../../AddProductWrapper'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type DropdownOptions = {
    productSubCategoryOPtions: SelectOption[]
    productCategoryOPtions: SelectOption[]
    productGroupOPtions: SelectOption[]
}

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
}

const StepAddProductDetails = ({ formikProps, dropdownOptions }: Props) => {
    const { values, setFieldValue } = formikProps

    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | File) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }

    return (
        <div className="flex flex-col gap-5 px-7">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2 gap-y-5">
                {/* Product Code */}
                <ATMTextField
                    required
                    name="product_code"
                    value={values.product_code}
                    onChange={(e) =>
                        handleSetFieldValue('product_code', e.target.value)
                    }
                    label="Product Code"
                    placeholder="Product Code"
                    className="mt-1 bg-white rounded shadow"
                    isSubmitting={isSubmitting}
                />

                {/* Product Name */}
                <ATMTextField
                    required
                    name="product_name"
                    value={values.product_name}
                    onChange={(e) =>
                        handleSetFieldValue('product_name', e.target.value)
                    }
                    label="Product Name"
                    placeholder="Product Name"
                    className="mt-1 bg-white rounded shadow"
                    isSubmitting={isSubmitting}
                />

                {/* Product Category */}
                <div className="-mt-1">
                    <ATMSelectSearchable
                        required
                        name="product_category"
                        value={values.product_category}
                        onChange={(e) =>
                            handleSetFieldValue('product_category', e)
                        }
                        label="Product Category"
                        options={dropdownOptions.productCategoryOPtions}
                    />
                </div>

                {/* Product Sub Category */}
                <div className="-mt-1">
                    <ATMSelectSearchable
                        required
                        name="product_sub_category"
                        value={values.product_sub_category}
                        onChange={(e) =>
                            handleSetFieldValue('product_sub_category', e)
                        }
                        label="Product Sub Category"
                        options={dropdownOptions.productSubCategoryOPtions}
                    />
                </div>

                {/* Product Sub Category */}
                <div className="-mt-1">
                    <ATMSelectSearchable
                        name="productGroup"
                        required
                        value={values.productGroup}
                        onChange={(e) => handleSetFieldValue('productGroup', e)}
                        label="Product Group"
                        options={dropdownOptions.productGroupOPtions}
                    />
                </div>

                {/* Product Weight */}
                <ATMTextField
                    required
                    name="product_weight"
                    value={values.product_weight}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            handleSetFieldValue(
                                'product_weight',
                                String(inputValue)
                            )
                        }
                    }}
                    label="Product Weight (in gms)"
                    placeholder="Product Weight"
                    className="mt-1 bg-white rounded shadow"
                    isSubmitting={isSubmitting}
                />

                {/* Dimensions */}
                <div>
                    <label className="font-medium text-slate-700">
                        {' '}
                        Dimensions (in cm){' '}
                        <span className="ml-1 text-sm text-red-500">*</span>
                    </label>
                    <div className="flex gap-2 mb-6 -mt-2">
                        {/* Height */}
                        <ATMTextField
                            required
                            name="dimensions.height"
                            value={values.dimensions.height}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    handleSetFieldValue(
                                        'dimensions.height',
                                        inputValue
                                    )
                                }
                            }}
                            placeholder="H"
                            className="bg-white rounded shadow"
                            isSubmitting={isSubmitting}
                        />

                        {/* Weight */}
                        <ATMTextField
                            required
                            name="dimensions.width"
                            value={values.dimensions.width}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    handleSetFieldValue(
                                        'dimensions.width',
                                        inputValue
                                    )
                                }
                            }}
                            placeholder="W"
                            className="bg-white rounded shadow"
                            isSubmitting={isSubmitting}
                        />

                        {/* Depth */}
                        <ATMTextField
                            required
                            name="dimensions.depth"
                            value={values.dimensions.depth}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    handleSetFieldValue(
                                        'dimensions.depth',
                                        inputValue
                                    )
                                }
                            }}
                            placeholder="D"
                            className="bg-white rounded shadow"
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="pb-4 -mt-10">
                <ATMTextArea
                    name="description"
                    value={values.description}
                    onChange={(newValue) =>
                        handleSetFieldValue('description', newValue)
                    }
                    label="Description"
                    placeholder="Description"
                    className="mt-0 bg-white rounded shadow"
                    minRows={3}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    )
}

export default StepAddProductDetails
