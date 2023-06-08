import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddSchemeWrapper'
//import { DropdownOptions } from "./StepAddSchemeDetailsWrapper";
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'

type DropdownOptions = {
    productCategoryoption: SelectOption[]
    productSubCategoryOption: SelectOption[]
    //productGroupOptions:SelectOption[];
}
type FieldType = Field<'productCategoryoption' | 'productSubCategoryOption'>

type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: {
        sectionName: string
        fields: FieldType[]
    }[]
    dropdownOptions: DropdownOptions
}

const StepAddSchemeDetails = ({
    formikProps,
    formFields,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps

    return (
        <div className="py-6 px-7 flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-4 gap-y-5">
                {/* Scheme Code */}
                <ATMTextField
                    name={'schemeCode'}
                    value={values.schemeCode}
                    onChange={(e) => {
                        setFieldValue('schemeCode', e.target.value)
                    }}
                    label="Scheme Code"
                    placeholder="Scheme Code"
                    className="shadow bg-white rounded"
                />
                {/* Category */}
                <div className="-mt-2">
                <ATMSelectSearchable
                    name={'category'}
                    value={values.category}
                    onChange={(e) => {
                        setFieldValue('category', e)
                    }}
                    selectLabel="Select Category"
                    label="Category"
                    options={dropdownOptions['productCategoryoption']}
                />
                </div>
                <div className="-mt-2">
                {/* Sub Category */}
                <ATMSelectSearchable
                    name={'subCategory'}
                    value={values.subCategory}
                    onChange={(e) => {
                        setFieldValue('subCategory', e)
                    }}
                    label="Sub Category"
                    selectLabel="Select Sub Category"
                    options={dropdownOptions['productSubCategoryOption']}
                />
                </div>
                {/* Scheme Name */}
                <ATMTextField
                    name={'schemeName'}
                    value={values.schemeName}
                    onChange={(e) => {
                        setFieldValue('schemeName', e.target.value)
                    }}
                    label="Scheme Name"
                    placeholder="Scheme Name"
                    className="shadow bg-white rounded"
                />
                {/* Scheme Price */}
                <ATMTextField
                    name={'schemePrice'}
                    value={values.schemePrice}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            setFieldValue('schemePrice', String(inputValue))
                        }
                    }}
                    label="Scheme Price"
                    placeholder="Scheme Price"
                    className="shadow bg-white rounded"
                />
                {/* Commission */}
                <ATMTextField
                    name={'commission'}
                    value={values.commission}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            setFieldValue('commission', String(inputValue))
                        }
                    }}
                    label="Commission"
                    placeholder="Commission"
                    className="shadow bg-white rounded"
                />
                {/* Dimensions */}
                <div className="mt-2">
                    <label className="text-slate-700 font-medium">
                        {' '}
                        Dimensions{' '}
                    </label>
                    <div className="flex gap-2 ">
                        {/* Height */}
                        <ATMTextField
                            name="dimension.height"
                            value={values.dimension.height}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    setFieldValue(
                                        'dimension.height',
                                        String(inputValue)
                                    )
                                }
                            }}
                            placeholder="H"
                            className="shadow bg-white rounded -mt-6"
                        />
                        {/* Weight */}
                        <ATMTextField
                            name="dimension.width"
                            value={values.dimension.width}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    setFieldValue(
                                        'dimension.width',
                                        String(inputValue)
                                    )
                                }
                            }}
                            placeholder="W"
                            className="shadow bg-white rounded -mt-6"
                        />
                        {/* Depth */}
                        <ATMTextField
                            name="dimension.depth"
                            value={values.dimension.depth}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    setFieldValue(
                                        'dimension.depth',
                                        String(inputValue)
                                    )
                                }
                            }}
                            placeholder="D"
                            className="shadow bg-white rounded -mt-6"
                        />
                    </div>
                </div>
                {/* Weight */}
                <ATMTextField
                    name={'weight'}
                    value={values.weight}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            setFieldValue('weight', String(inputValue))
                        }
                    }}
                    label="Weight"
                    placeholder="Weight"
                    className="shadow bg-white rounded"
                />
                {/* Delivery Charges */}
                <ATMTextField
                    name={'deliveryCharges'}
                    value={values.deliveryCharges}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            setFieldValue('deliveryCharges', String(inputValue))
                        }
                    }}
                    label="Delivery Charges"
                    placeholder="Delivery Charges"
                    className="shadow bg-white rounded"
                />
                {/* Combo Packaging */}
                <div className="mt-1">
                    <ATMSwitchButton
                        name="comboPacking"
                        value={values.comboPacking}
                        onChange={(newValue) =>
                            setFieldValue('comboPacking', newValue)
                        }
                        label="Combo Packaging"
                    />
                </div>
                {/* Start Date */}
                <ATMDatePicker
                    name="startDate"
                    value={values.startDate}
                    onChange={(newValue) => {
                        setFieldValue('startDate', newValue)
                    }}
                    label="Start Date"
                />
                {/* End Date */}
                <ATMDatePicker
                    name="endDate"
                    value={values.endDate}
                    onChange={(newValue) => {
                        setFieldValue('endDate', newValue)
                    }}
                    label="End Date"
                />
            </div>
            {/* Scheme Description */}
            <div>
                <ATMTextArea
                    name={'schemeDescription'}
                    value={values.schemeDescription}
                    onChange={(newValue) => {
                        setFieldValue('schemeDescription', newValue)
                    }}
                    label="Scheme Description"
                    placeholder="Scheme Description"
                    className="shadow bg-white rounded"
                />
            </div>
        </div>
    )
}

export default StepAddSchemeDetails
