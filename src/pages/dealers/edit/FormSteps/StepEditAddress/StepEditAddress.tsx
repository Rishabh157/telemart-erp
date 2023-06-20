import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditDealerWrapper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
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
const StepEditAddress = ({
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
                        className={`py-4 px-7 ${
                            index !== formFields.length - 1 && 'border-b'
                        }  border-slate-300`}
                    >
                        {sectionName && (
                            <div className="text-primary-main text-lg pb-4 font-medium">
                                {sectionName}
                            </div>
                        )}

                        <div className="grid grid-cols-4 gap-4 gap-y-5">
                            {fields?.map((field: FieldType) => {
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
                                                key={name}
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
                                            <div className="-mt-2">
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
                                                    selectClass="shadow mt-2"
                                                />
                                            </div>
                                        )
                                    case 'checkbox':
                                        return (
                                            <ATMCheckbox
                                                name={name}
                                                label={label}
                                                checked={Boolean(values[name])}
                                                onChange={(e) => {
                                                    setFieldValue(name, e)
                                                    if (e) {
                                                        const {
                                                            address,
                                                            countryId,
                                                            districtId,
                                                            phone,
                                                            pincodeId,
                                                            stateId,
                                                        } =
                                                            values.registrationAddress
                                                        setFieldValue(
                                                            'billingAddress.phone',
                                                            phone
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.address',
                                                            address
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.countryId',
                                                            countryId
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.districtId',
                                                            districtId
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.pincodeId',
                                                            pincodeId
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.stateId',
                                                            stateId
                                                        )
                                                    } else {
                                                        setFieldValue(
                                                            'billingAddress.address',
                                                            ''
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.countryId',
                                                            ''
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.districtId',
                                                            ''
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.phone',
                                                            ''
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.pincodeId',
                                                            ''
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.stateId',
                                                            ''
                                                        )   
                                                    }
                                                }}
                                            />
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

export default StepEditAddress
