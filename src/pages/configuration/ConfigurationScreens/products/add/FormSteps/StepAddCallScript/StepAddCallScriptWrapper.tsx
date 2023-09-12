/// ==============================================
// Filename:StepAddCallScriptWrapper.tsx
// Type: ADD Component
// Last Updated: JUNE 26, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'

// |-- Internal Dependencies --|
import { SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../AddProductWrapper'
import StepAddCallScript from './StepAddCallScript'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    allLanguages: any
}
export type DropdownOptions = {
    langaugeOption: SelectOption[]
}

const StepAddCallScriptWrapper = ({ formikProps, allLanguages }: Props) => {
    const langaugeOption = allLanguages?.map((ele: any) => {
        return { label: ele?.languageName, value: ele?._id }
    })
    const dropdownOptions: DropdownOptions = {
        langaugeOption,
    }
    return (
        <>
            <StepAddCallScript
                formikProps={formikProps}
                dropdownOptions={dropdownOptions}
            />
        </>
    )
}

export default StepAddCallScriptWrapper
