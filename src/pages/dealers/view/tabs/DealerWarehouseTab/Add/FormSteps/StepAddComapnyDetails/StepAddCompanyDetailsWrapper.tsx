/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:StepAddCompanyDetailsWrapper.tsx
// Type: View-Tab Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddDealerWarehouseWarpper'
import StepAddComapnyDetails from './StepAddComapnyDetails'

// |-- Types --|
export type DropdownOptions = {
    countryOptions: SelectOption[]
}

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
    },
    {
        name: 'country',
        label: 'Country',
        placeholder: 'Country',
        type: 'select',
        optionAccessKey: 'countryOptions',
    },

    {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
    },
]

const StepAddCompanyDetailsWrapper = ({ formikProps, allCountry }: Props) => {
    const countryOptions = allCountry?.map((ele: any) => {
        return { label: ele?.countryName, value: ele?._id }
    })
    const dropdownOptions: DropdownOptions = {
        countryOptions,
    }

    return (
        <>
            <StepAddComapnyDetails
                formikProps={formikProps}
                dropdownOptions={dropdownOptions}
                formFields={formFields}
            />
        </>
    )
}

export default StepAddCompanyDetailsWrapper
