/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:StepAdditemsWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddProductWrapper'
import StepAddItems from './StepAddItems'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    allItems: any
}

export type DropdownOptions = {
    itemOptions: SelectOption[]
}

export type FieldType = Field<'companyTypeOptions' | 'ownershipTypeOptions'>

const StepAddItemsWrapper = ({ formikProps, allItems }: Props) => {
    const itemOptions = allItems?.map((ele: any) => {
        return { label: ele?.itemName, value: ele?._id }
    })

    const dropdownOptions: DropdownOptions = {
        itemOptions,
    }

    return (
        <>
            <StepAddItems
                formikProps={formikProps}
                dropdownOptions={dropdownOptions}
            />
        </>
    )
}

export default StepAddItemsWrapper
