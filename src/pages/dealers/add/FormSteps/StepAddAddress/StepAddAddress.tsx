import React from 'react'

import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddDealerWrapper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'

type DropdownOptions = {
    counrtyOptions: SelectOption[]
    stateOptions: SelectOption[]
    districtOptions: SelectOption[]
    pincodeOptions: SelectOption[]
    billingCounrtyOptions: SelectOption[]
    billingStateOptions: SelectOption[]
    billingDistrictOptions: SelectOption[]
    billingPincodeOptions: SelectOption[]
}

type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: {
        sectionName: string
        fields: FieldType[]
    }[]
    dropdownOptions: DropdownOptions
}
type FieldType = Field<
    | 'counrtyOptions'
    | 'stateOptions'
    | 'districtOptions'
    | 'pincodeOptions'
    | 'billingCounrtyOptions'
    | 'billingStateOptions'
    | 'billingDistrictOptions'
    | 'billingPincodeOptions'
>
const StepAddAddress = ({
    formikProps,
    formFields,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

    return (
        <div className="">
            {formFields?.map((formField, index) => {
                const { sectionName, fields } = formField
                return (
                    <div
                        key={index}
                        className={`pb-6 pt-2 px-7 ${
                            index !== formFields.length - 1 && 'border-b'
                        }  border-slate-300`}
                    >
                        {sectionName && (
                            <div className="text-primary-main text-lg pb-2 font-medium">
                                {sectionName}
                            </div>
                        )}

                        <div className="grid grid-cols-4 gap-4 gap-y-5">
                            {fields?.map((field: FieldType, index: number) => {
                                const {
                                    type = 'text',
                                    name,
                                    label,
                                    placeholder,
                                } = field

                                switch (type) {
                                    case 'text':
                                        return (
                                            <ATMTextField
                                                key={name || index}
                                                name={name}
                                                value={
                                                    name.includes('.')
                                                        ? values[
                                                              name.split('.')[0]
                                                          ][name.split('.')[1]]
                                                        : values[name]
                                                }
                                                onChange={(e) => {
                                                    if (
                                                        name ===
                                                            'registrationAddress.phone' ||
                                                        name ===
                                                            'billingAddress.phone'
                                                    ) {
                                                        const inputValue =
                                                            e.target.value
                                                        if (
                                                            !isNaN(
                                                                Number(
                                                                    inputValue
                                                                )
                                                            )
                                                        ) {
                                                            setFieldValue(
                                                                name,
                                                                e.target.value
                                                            )
                                                        }
                                                    } else {
                                                        setFieldValue(
                                                            name,
                                                            e.target.value
                                                        )
                                                    }
                                                }}
                                                label={label}
                                                placeholder={placeholder}
                                                className="shadow bg-white rounded"
                                                isSubmitting={isSubmitting}
                                            />
                                        )
                                    case 'select':
                                        return (
                                            <div className="-mt-4" key={name || index}>
                                                <ATMSelectSearchable
                                                    label={label}
                                                    name={name}
                                                    value={
                                                        name.includes('.')
                                                            ? values[
                                                                  name.split(
                                                                      '.'
                                                                  )[0]
                                                              ][
                                                                  name.split(
                                                                      '.'
                                                                  )[1]
                                                              ]
                                                            : values[name]
                                                    }
                                                    options={
                                                        dropdownOptions[
                                                            field.optionAccessKey ||
                                                                'counrtyOptions'
                                                        ]
                                                    }
                                                    onChange={(e) => {
                                                        setFieldValue(name, e)
                                                    }}
                                                    // size="small"
                                                    selectClass="shadow mt-2"
                                                    isSubmitting={isSubmitting}
                                                />
                                            </div>
                                        )
                                    case 'checkbox':
                                        return (
                                            <div className="-mt-2" key={name || index}>
                                                <ATMCheckbox
                                                    name={name}
                                                    label={label}
                                                    onChange={(e) => {
                                                        setFieldValue(name, e)
                                                        if (e) {
                                                            const {
                                                                address,
                                                                country,
                                                                district,
                                                                phone,
                                                                pincode,
                                                                state,
                                                            } =
                                                                values.registrationAddress
                                                            setFieldValue(
                                                                'billingAddress.address',
                                                                address
                                                            )
                                                            setFieldValue(
                                                                'billingAddress.country',
                                                                country
                                                            )
                                                            setFieldValue(
                                                                'billingAddress.district',
                                                                district
                                                            )
                                                            setFieldValue(
                                                                'billingAddress.phone',
                                                                phone
                                                            )
                                                            setFieldValue(
                                                                'billingAddress.pincode',
                                                                pincode
                                                            )
                                                            setFieldValue(
                                                                'billingAddress.state',
                                                                state
                                                            )
                                                        } else {
                                                            setFieldValue(
                                                                'billingAddress.address',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billingAddress.country',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billingAddress.district',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billingAddress.phone',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billingAddress.pincode',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billingAddress.state',
                                                                ''
                                                            )
                                                        }
                                                    }}
                                                    checked={Boolean(
                                                        values[name]
                                                    )}
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
            })}
        </div>
    )
}

export default StepAddAddress
