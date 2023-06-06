import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddDealerWrapper'
import { DropdownOptions, FieldType } from './StepAddDealerDetailsWrapper'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

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
                                <div key={name} className="mt-2">
                                    <ATMSelect
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
                                            setFieldValue(name, e.target.value)
                                        }}
                                        options={
                                            dropdownOptions[
                                                field.optionAccessKey ||
                                                    'dealerCategoryOptions'
                                            ]
                                        }
                                        isSubmitting={isSubmitting}
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
