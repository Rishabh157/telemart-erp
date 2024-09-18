// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditWarehouseWrapper'
import StepEditComapnyDetails from './StepEditComapnyDetails'

// |-- Types --|
export type DropdownOptions = {
    countryOptions: SelectOption[]
}

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    allCountry: any
}

export type FieldType = Field<'countryOptions'>

const formFields: FieldType[] = [
    {
        name: 'warehouseName',
        label: 'Warehouse Name',
        placeholder: 'Warehouse Name',
        required: true,
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        required: false,
    },
    {
        name: 'isDefault',
        label: 'Is Primary Warehouse',
        // placeholder: '',
        type : 'checkbox',
        required: false,
    },
]

const StepEditCompanyDetailsWrapper = ({ formikProps, allCountry }: Props) => {
    const countryOptions = allCountry?.map((ele: any) => {
        return { label: ele?.countryName, value: ele?._id }
    })
    const dropdownOptions: DropdownOptions = {
        countryOptions,
    }

    return (
        <StepEditComapnyDetails
            formikProps={formikProps}
            dropdownOptions={dropdownOptions}
            formFields={formFields}
        />
    )
}

export default StepEditCompanyDetailsWrapper
