// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddSchemeWrapper'
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
                        }}
                        selectLabel="Select Category"
                        label="Category"
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
                    required
                    extraClassField="mt-3"
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
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            handleSetFieldValue(
                                'schemePrice',
                                String(inputValue)
                            )
                        }
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
                <div className="mt-2">
                    <label className="font-medium text-slate-700">
                        {' '}
                        Dimensions (in cm):
                        <span className="ml-1 text-sm text-red-500">
                            *
                        </span>{' '}
                    </label>
                    <div className="flex gap-2 ">
                        {/* Height */}
                        <ATMTextField
                            required
                            name="dimension.height"
                            value={values.dimension.height}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    handleSetFieldValue(
                                        'dimension.height',
                                        String(inputValue)
                                    )
                                }
                            }}
                            placeholder="H"
                            className="-mt-6 bg-white rounded shadow"
                        />
                        {/* Weight */}
                        <ATMTextField
                            required
                            name="dimension.width"
                            value={values.dimension.width}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    handleSetFieldValue(
                                        'dimension.width',
                                        String(inputValue)
                                    )
                                }
                            }}
                            placeholder="W"
                            className="-mt-6 bg-white rounded shadow"
                        />
                        {/* Depth */}
                        <ATMTextField
                            required
                            name="dimension.depth"
                            value={values.dimension.depth}
                            onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(Number(inputValue))) {
                                    handleSetFieldValue(
                                        'dimension.depth',
                                        String(inputValue)
                                    )
                                }
                            }}
                            placeholder="D"
                            className="-mt-6 bg-white rounded shadow"
                        />
                    </div>
                </div>
                {/* Weight */}
                <ATMTextField
                    required
                    name={'weight'}
                    value={values.weight}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            handleSetFieldValue('weight', String(inputValue))
                        }
                    }}
                    label="Weight"
                    placeholder="Weight"
                    className="bg-white rounded shadow"
                />
                {/* Delivery Charges */}
                <ATMTextField
                    required
                    name={'deliveryCharges'}
                    value={values.deliveryCharges}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        if (!isNaN(Number(inputValue))) {
                            handleSetFieldValue(
                                'deliveryCharges',
                                String(inputValue)
                            )
                        }
                    }}
                    label="Delivery Charges"
                    placeholder="Delivery Charges"
                    className="bg-white rounded shadow"
                />
                {/* Combo Packaging */}
                <div className="mt-0">
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
                    name="startDate"
                    value={values.startDate}
                    onChange={(newValue) => {
                        handleSetFieldValue('startDate', newValue)
                    }}
                    label="Start Date"
                />
                {/* End Date */}
                <ATMDatePicker
                    name="endDate"
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

export default StepAddSchemeDetails
