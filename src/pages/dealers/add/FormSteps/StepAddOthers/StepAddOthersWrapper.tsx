import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from '../../AddDealerWrapper'
import StepAddOthers from './StepAddOthers'
import { Field } from 'src/models/FormField/FormField.model'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

export type FieldType = Field<''>

const othersformFields: { sectionName: string; fields: FieldType[] }[] = [
    {
        sectionName: '',
        fields: [
            {
                name: 'otherMapDocument.autoMap',
                label: 'Auto Mapping',
                placeholder: 'Auto Mapping',
                type: 'switch-button',
            },
            {
                name: 'otherMapDocument.creditLimit',
                label: 'Credit Limit',
                placeholder: 'Auto Mapping',
                type: 'switch-button',
            }, 
            {
                name: 'otherMapDocument.availableQuantity',
                label: 'Available Quantity',
                placeholder: 'Auto Mapping',    
                type: 'switch-button',
            },
        ],
    },
]

const StepAddOthersWrapper = ({ formikProps }: Props) => {
    return (
        <>
            <StepAddOthers formikProps={formikProps} othersformFields={othersformFields}  />
        </>
    )
}

export default StepAddOthersWrapper
