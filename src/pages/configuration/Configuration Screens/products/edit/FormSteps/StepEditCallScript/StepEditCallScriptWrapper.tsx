/// ==============================================
// Filename:StepEditCallScriptWrapper.tsx
// Type: Edit Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { FormInitialValues } from '../../EditProductWrapper'
import StepEditCallScript from './StepEditCallScript'
import { SelectOption } from 'src/models/FormField/FormField.model'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    allLanguages: any
}

export type DropdownOptions = {
    langaugeOption: SelectOption[]
}

const StepEditCallScriptWrapper = ({ formikProps, allLanguages }: Props) => {
    const langaugeOption = allLanguages?.map((ele: any) => {
        return { label: ele?.languageName, value: ele?._id }
    })
    const dropdownOptions: DropdownOptions = {
        langaugeOption,
    }
    return (
        <>
            <StepEditCallScript
                formikProps={formikProps}
                dropdownOptions={dropdownOptions}
            />
        </>
    )
}

export default StepEditCallScriptWrapper
