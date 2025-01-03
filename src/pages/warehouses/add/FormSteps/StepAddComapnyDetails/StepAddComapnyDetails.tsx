// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddWarehouseWrapper'
import { DropdownOptions, FieldType } from './StepAddCompanyDetailsWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
    formFields: FieldType[]
}

const StepAddComapnyDetails = ({
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
            <div className="grid grid-cols-2 gap-4 gap-y-5">
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

                        case 'select':
                            return (
                                <div className="-mt-2" key={name}>
                                    <ATMSelectSearchable
                                        required={required}
                                        selectLabel={label}
                                        label={label}
                                        name={name}
                                        value={
                                            name.includes('.')
                                                ? values[name.split('.')[0]][
                                                name.split('.')[1]
                                                ]
                                                : values[name]
                                        }
                                        onChange={(e: any) => {
                                            handleSetFieldValue(name, e)
                                        }}
                                        options={
                                            dropdownOptions[
                                            field.optionAccessKey ||
                                            'countryOptions'
                                            ]
                                        }
                                    />
                                </div>
                            )
                        case 'checkbox':
                            return (
                                <div
                                    className="-mt-2"
                                    key={name}
                                >
                                    <ATMCheckbox
                                        name={name}
                                        label={label}
                                        checked={Boolean(
                                            values[name]
                                        )}
                                        onChange={(e) => {
                                            setFieldValue(name, e)
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

export default StepAddComapnyDetails
