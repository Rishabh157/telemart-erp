import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { FormInitialValues } from '../../AddProductWrapper'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

type DropdownOptions = {
    productSubCategoryOPtions: SelectOption[]
    productCategoryOPtions: SelectOption[]
    productGroupOPtions: SelectOption[]
}

type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
}

const StepAddProductDetails = ({ formikProps, dropdownOptions }: Props) => {
    const { values, setFieldValue } = formikProps

    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

    return (
        <div className="px-7 flex flex-col gap-5">
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
                    isSubmitting={isSubmitting}
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
                    isSubmitting={isSubmitting}
                />

                {/* Product Category */}
                <div className="-mt-2">
                    <ATMSelectSearchable
                        name="product_category"
                        value={values.product_category}
                        onChange={(e) => setFieldValue('product_category', e)}
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
                            setFieldValue('product_sub_category', e)
                        }
                        label="Product Sub Category"
                        options={dropdownOptions.productSubCategoryOPtions}
                        
                    />
                </div>

                {/* Product Sub Category */}
                <div className="-mt-2">
                    <ATMSelectSearchable
                        name="productGroup"
                        value={values.productGroup}
                        onChange={(e) => setFieldValue('productGroup', e)}
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
                            setFieldValue('product_weight', String(inputValue))
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
                        Dimensions (in mm)
                    </label>
                    <div className="flex gap-2 -mt-2 mb-6">
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
                            isSubmitting={isSubmitting}
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
                            isSubmitting={isSubmitting}
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
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="-mt-6 mb-10">
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
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    )
}

export default StepAddProductDetails
