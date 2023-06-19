import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddDealerWrapper'
import { DropdownOptions, FieldType } from './StepAddDealerDetailsWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import ATMSwitchButton from 'src/components/UI/atoms/formFields/ATMSwitchButton/ATMSwitchButton'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    dropdownOptions: DropdownOptions
    formFields: FieldType[]
}

const StepAddDealerDetails = ({
    formikProps,
    dropdownOptions,
    formFields,
}: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

    return (
        <div className="py-9 px-7">
            <div className="grid grid-cols-3 gap-4 gap-y-5">
                {formFields?.map((field: FieldType) => {
                    const { type = 'text', name, label, placeholder } = field

                    switch (type) {
                        case 'text':
                            return (
                                <div>
                                    <ATMTextField
                                        key={name}
                                        name={name}
                                        value={values[name]}
                                        onChange={(e) => {
                                            setFieldValue(name, e.target.value)
                                        }}
                                        label={label}
                                        placeholder={placeholder}
                                        className="shadow bg-white rounded"
                                        isSubmitting={isSubmitting}
                                    />
                                </div>
                            )
                        case 'number':
                            return (
                                <div>
                                    <ATMTextField
                                        key={name}
                                        name={name}
                                        value={values[name]}
                                        onChange={(e) => {
                                            setFieldValue(name, e.target.value)
                                        }}
                                        label={label}
                                        placeholder={placeholder}
                                        className="shadow bg-white rounded"
                                        isSubmitting={isSubmitting}
                                    />
                                </div>
                            )
                        case 'switch-button':
                            return (
                                <div>
                                    <ATMSwitchButton
                                        name={name}
                                        value={values[name]}
                                        label={label}
                                        
                                        onChange={(value: any) => {
                                            setFieldValue(name, value)
                                        }}
                                    />
                                </div>
                            )

                        case 'password':
                            return (
                                <div>
                                    <ATMTextField
                                        type="password"
                                        key={name}
                                        name={name}
                                        value={values[name]}
                                        onChange={(e) => {
                                            setFieldValue(name, e.target.value)
                                        }}
                                        label={label}
                                        placeholder={placeholder}
                                        className="shadow bg-white rounded"
                                        isSubmitting={isSubmitting}
                                    />
                                </div>
                            )

                        case 'select':
                            return (
                                <div key={name} className="-mt-2">
                                    <ATMSelectSearchable
                                        label={label}
                                        selectLabel={`Select ${label}`}
                                        name={name}
                                        value={
                                            name.includes('.')
                                                ? values[name.split('.')[0]][
                                                      name.split('.')[1]
                                                  ]
                                                : values[name]
                                        }
                                        onChange={(e: any) => {
                                            setFieldValue(name, e)
                                        }}
                                        options={
                                            dropdownOptions[
                                                field.optionAccessKey ||
                                                    'dealerCategoryOptions'
                                            ]
                                        }
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

export default StepAddDealerDetails
