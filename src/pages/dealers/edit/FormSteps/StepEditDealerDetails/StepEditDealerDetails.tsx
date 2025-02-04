// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
//import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditDealerWrapper'
import { DropdownOptions, FieldType } from './StepEditDealerDetailsWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
    formFields: FieldType[]
}

const StepEditDealerDetails = ({
    formikProps,
    dropdownOptions,
    formFields,
}: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }
    return (
        <div className="py-9 px-7">
            <div className="grid grid-cols-3 gap-4 gap-y-5">
                {formFields?.map((field: FieldType) => {
                    const {
                        type = 'text',
                        name,
                        label,
                        placeholder,
                        required,
                    } = field
                    switch (type) {
                        case 'text':
                            return (
                                <ATMTextField
                                    required={required}
                                    key={name}
                                    name={name}
                                    value={values[name]}
                                    onChange={(e) => {
                                        handleSetFieldValue(
                                            name,
                                            e.target.value
                                        )
                                    }}
                                    label={label}
                                    placeholder={placeholder}
                                    className="bg-white rounded shadow"
                                    extraClassField="mt-3"
                                    isSubmitting={isSubmitting}
                                />
                            )
                        case 'number':
                            return (
                                <div key={name}>
                                    <ATMTextField
                                        required={required}
                                        disabled={
                                            name === 'openingBalance'
                                                ? true
                                                : false
                                        }
                                        name={name}
                                        value={values[name]}
                                        onChange={(e) => {
                                            handleSetFieldValue(
                                                name,
                                                e.target.value
                                            )
                                        }}
                                        label={label}
                                        placeholder={placeholder}
                                        className="bg-white rounded shadow"
                                        isSubmitting={isSubmitting}
                                    />
                                </div>
                            )
                        case 'switch-button':
                            return (
                                <div key={name}>
                                    <ATMSwitchButton
                                        required={required}
                                        name={name}
                                        value={values[name]}
                                        label={label}
                                        onChange={(value: any) => {
                                            handleSetFieldValue(name, value)
                                        }}
                                    />
                                </div>
                            )

                        case 'select':
                            return (
                                <div key={name} className="relative -mt-2">
                                    <ATMSelectSearchable
                                        required={required}
                                        options={
                                            dropdownOptions[
                                                'dealerCategoryOptions'
                                            ]
                                        }
                                        name={name}
                                        value={values?.dealerCategoryId}
                                        selectLabel={`Select Dealer Category`}
                                        label="Dealer Category"
                                        onChange={(e) => {
                                            handleSetFieldValue(name, e)
                                        }}
                                    />
                                </div>
                            )

                        default:
                            return null
                    }
                })}
            </div>
        </div>
    )
}

export default StepEditDealerDetails
