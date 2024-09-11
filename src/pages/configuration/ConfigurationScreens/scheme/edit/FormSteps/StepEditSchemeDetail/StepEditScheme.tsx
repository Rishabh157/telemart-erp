// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditSchemeWrapper'
//import { DropdownOptions } from "./StepEditSchemeDetailsWrapper";
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'

// |-- Redux --|
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
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
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
}

const StepEditScheme = ({
    formikProps,
    formFields,
    dropdownOptions,
    setSelectedCategory,
}: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="flex flex-col gap-5 py-6 px-7">
            <div className="grid grid-cols-3 gap-4 gap-y-5">
                {/* Category */}
                <div className="-mt-2">
                    <ATMSelectSearchable
                        required
                        name={'category'}
                        value={values.category}
                        onChange={(e) => {
                            handleSetFieldValue('category', e)
                            setSelectedCategory(e)
                        }}
                        label="Category"
                        selectLabel="Select Category"
                        options={dropdownOptions['productCategoryoption']}
                    />
                </div>
                <div className="-mt-2">
                    {/* Sub Category */}
                    <ATMSelectSearchable
                        required
                        name={'subCategory'}
                        value={values.subCategory}
                        onChange={(e) => {
                            handleSetFieldValue('subCategory', e)
                        }}
                        label="Sub Category"
                        selectLabel="Select Sub Category"
                        options={dropdownOptions['productSubCategoryOption']}
                    />
                </div>
                {/* Scheme Name */}
                <ATMTextField
                    extraClassField="mt-3"
                    required
                    name={'schemeName'}
                    value={values.schemeName}
                    onChange={(e) => {
                        handleSetFieldValue('schemeName', e.target.value)
                    }}
                    label="Scheme Name"
                    placeholder="Scheme Name"
                    className="bg-white rounded shadow"
                />
                {/* Scheme Price */}
                <ATMTextField
                    required
                    name={'schemePrice'}
                    value={values.schemePrice}
                    onChange={(e) => {
                        handleSetFieldValue('schemePrice', e.target.value)
                    }}
                    label="Scheme Price"
                    placeholder="Scheme Price"
                    className="bg-white rounded shadow"
                />
                {/* Commission */}
                <ATMTextField
                    required
                    name={'commission'}
                    value={values.commission}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            handleSetFieldValue(
                                'commission',
                                String(inputValue)
                            )
                        }
                    }}
                    label="Dealer Commission"
                    placeholder=" Dealer Commission"
                    className="bg-white rounded shadow"
                />
                {/* Dimensions */}
                <div className="mt-5">
                    <label className="font-medium text-slate-700 ">
                        Dimensions (in cm):
                        <span className="ml-1 text-sm text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                        {/* Height */}
                        <ATMTextField
                            required
                            name="dimension.height"
                            value={values.dimension.height}
                            extraClassField="mt-0"
                            onChange={(e) =>
                                handleSetFieldValue(
                                    'dimension.height',
                                    e.target.value
                                )
                            }
                            placeholder="Height"
                            className="bg-white rounded shadow"
                        />
                        {/* Weight */}
                        <ATMTextField
                            required
                            name="dimension.width"
                            value={values.dimension.width}
                            extraClassField="mt-0"
                            onChange={(e) =>
                                handleSetFieldValue(
                                    'dimension.width',
                                    e.target.value
                                )
                            }
                            placeholder="Width"
                            className="bg-white rounded shadow"
                        />
                        {/* Depth */}
                        <ATMTextField
                            required
                            name="dimension.depth"
                            value={values.dimension.depth}
                            extraClassField="mt-0"
                            onChange={(e) =>
                                handleSetFieldValue(
                                    'dimension.depth',
                                    e.target.value
                                )
                            }
                            placeholder="Depth"
                            className="bg-white rounded shadow"
                        />
                    </div>
                </div>
                {/* Weight */}
                <ATMTextField
                    required
                    name={'weight'}
                    value={values.weight}
                    onChange={(e) => {
                        handleSetFieldValue('weight', e.target.value)
                    }}
                    label="Weight (in gms.)"
                    placeholder="Weight"
                    className="bg-white rounded shadow"
                />
                {/* Delivery Charges */}
                <ATMTextField
                    required
                    name={'deliveryCharges'}
                    value={values.deliveryCharges}
                    onChange={(e) => {
                        handleSetFieldValue('deliveryCharges', e.target.value)
                    }}
                    label="Delivery Charges"
                    placeholder="Delivery Charges"
                    className="bg-white rounded shadow"
                />
                {/* Combo Packaging */}
                <div className="mt-1">
                    <ATMSwitchButton
                        name="comboPacking"
                        value={values.comboPacking}
                        onChange={(newValue) =>
                            handleSetFieldValue('comboPacking', newValue)
                        }
                        label="Combo Packaging"
                    />
                </div>
                {/* Start Date */}
                <ATMDatePicker
                    required
                    name={'startDate'}
                    value={values.startDate}
                    dateTimeFormat="DD/MM/YYYY"
                    onChange={(newValue) => {
                        handleSetFieldValue('startDate', newValue)
                    }}
                    label="Start Date"
                />
                {/* End Date */}
                <ATMDatePicker
                    required
                    name={'endDate'}
                    dateTimeFormat="DD/MM/YYYY"
                    value={values.endDate}
                    onChange={(newValue) => {
                        handleSetFieldValue('endDate', newValue)
                    }}
                    label="End Date"
                />
            </div>
            {/* Scheme Description */}
            <div>
                <ATMTextArea
                    required
                    name={'schemeDescription'}
                    value={values.schemeDescription}
                    onChange={(newValue) => {
                        handleSetFieldValue('schemeDescription', newValue)
                    }}
                    label="Scheme Description"
                    placeholder="Scheme Description"
                    className="bg-white rounded shadow"
                />
            </div>
        </div>
    )
}

export default StepEditScheme
