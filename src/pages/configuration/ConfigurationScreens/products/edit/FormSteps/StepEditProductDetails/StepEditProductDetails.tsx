/// ==============================================
// Filename:StepEditProductDetails.tsx
// Type: Edit Component
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
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditProductWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
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

type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
}

const StepEditProductDetails = ({ formikProps, dropdownOptions }: Props) => {
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
        <div className="px-7 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 gap-y-5">
                {/* Product Code */}

                <ATMTextField
                    name="product_code"
                    value={values.product_code}
                    onChange={(e) =>
                        handleSetFieldValue('product_code', e.target.value)
                    }
                    label="Product Code"
                    placeholder="Product Code"
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                {/* Product Name */}
                <ATMTextField
                    name="product_name"
                    value={values.product_name}
                    onChange={(e) =>
                        handleSetFieldValue('product_name', e.target.value)
                    }
                    label="Product Name"
                    placeholder="Product Name"
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                {/* Product Category */}
                <div className="-mt-2">
                    <ATMSelectSearchable
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
                <div className="-mt-2">
                    <ATMSelectSearchable
                        name="product_sub_category"
                        value={values.product_sub_category}
                        onChange={(e) =>
                            handleSetFieldValue('product_sub_category', e)
                        }
                        label="Product Sub Category"
                        options={dropdownOptions.productSubCategoryOPtions}
                    />
                </div>

                <div className="-mt-2">
                    {/* Product Sub Category */}
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
                    className="shadow bg-white rounded"
                    isSubmitting={isSubmitting}
                />

                {/* Dimensions */}
                <div>
                    <label className="text-slate-700 font-medium">
                        {' '}
                        Dimensions (in cm){' '}
                    </label>
                    <div className="flex gap-2 -mt-2  mb-6">
                        {/* Height */}
                        <ATMTextField
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
                            className="shadow bg-white rounded"
                            isSubmitting={isSubmitting}
                        />

                        {/* Weight */}
                        <ATMTextField
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
                            className="shadow bg-white rounded"
                            isSubmitting={isSubmitting}
                        />

                        {/* Depth */}
                        <ATMTextField
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
                            className="shadow bg-white rounded"
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="-mt-10 pb-4">
                <ATMTextArea
                    name="description"
                    value={values.description}
                    onChange={(newValue) =>
                        handleSetFieldValue('description', newValue)
                    }
                    label="Description"
                    placeholder="Description"
                    className="shadow bg-white rounded mt-0"
                    minRows={3}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    )
}

export default StepEditProductDetails
