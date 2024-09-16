// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditWarehouseWrapper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'

// |-- Types --|
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
export type FieldType = Field<
    | 'counrtyOptions'
    | 'stateOptions'
    | 'districtOptions'
    | 'pincodeOptions'
    | 'billingCounrtyOptions'
    | 'billingStateOptions'
    | 'billingDistrictOptions'
    | 'billingPincodeOptions'
>
type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: {
        sectionName: string
        fields: FieldType[]
    }[]
    dropdownOptions: DropdownOptions
}

const StepEditAddress = ({
    formikProps,
    formFields,
    dropdownOptions,
}: Props) => {
    const [imageApiStatus, setImageApiStatus] = useState<boolean>(false)
    const [loaderState, setLoaderState] = useState<string>('')

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

    const [uploadFile] = useAddFileUrlMutation()

    const handleFileUpload = (file: File, name: string) => {
        let formData = new FormData()
        setLoaderState(name)
        setImageApiStatus(true)
        formData.append(
            'type',
            file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT'
        )
        formData.append('bucketName', 'SAPTEL_CRM')
        formData.append('file', file || '', file?.name)

        // call the file manager api
        uploadFile(formData).then((res: any) => {
            if ('data' in res) {
                setImageApiStatus(false)
                let fileUrl = BASE_URL_FILE_PICKER + '/' + res?.data?.file_path
                setFieldValue(name, fileUrl)
                setLoaderState('')
                setImageApiStatus(false)
            }
        })
    }

    return (
        <div >
            {formFields?.map((formField, index) => {
                const { sectionName, fields } = formField
                return (
                    <div
                        key={index}
                        className={`py-9 px-7 ${index !== formFields?.length - 1 && 'border-b'
                            }  border-slate-300`}
                    >
                        <div className="pb-2 text-lg font-medium text-primary-main">
                            {sectionName}
                        </div>

                        <div className="grid grid-cols-4 gap-4 gap-y-5">
                            {fields?.map((field: FieldType) => {
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
                                                maxLength={
                                                    name ===
                                                        'regd_address.phone' ||
                                                        name ===
                                                        'billing_address.phone'
                                                        ? 10
                                                        : 100
                                                }
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
                                                        'regd_address.phone' ||
                                                        name ===
                                                        'billing_address.phone'
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
                                                            handleSetFieldValue(
                                                                name,
                                                                String(
                                                                    inputValue
                                                                )
                                                            )
                                                        }
                                                    } else {
                                                        handleSetFieldValue(
                                                            name,
                                                            e.target.value
                                                        )
                                                    }
                                                }}
                                                label={label}
                                                placeholder={placeholder}
                                                extraClassField="mt-3"
                                                className="bg-white rounded shadow"
                                                isSubmitting={isSubmitting}
                                            />
                                        )
                                    case 'file-picker':
                                        return (
                                            <div className="mt-4">
                                                <ATMFilePickerWrapper
                                                    required={required}
                                                    name={name}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    onSelect={(newFile) => {
                                                        handleFileUpload(
                                                            newFile,
                                                            name
                                                        )
                                                    }}
                                                    selectedFile={
                                                        values.billing_address
                                                            .gstCertificate
                                                    }
                                                    disabled={false}
                                                />
                                                {loaderState === name &&
                                                    imageApiStatus ? (
                                                    <div className="mt-3">
                                                        <CircularProgress
                                                            size={18}
                                                        />
                                                    </div>
                                                ) : null}
                                            </div>
                                        )

                                    case 'select':
                                        return (
                                            <div className="-mt-2">
                                                <ATMSelectSearchable
                                                    required={required}
                                                    label={label}
                                                    selectLabel={label}
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
                                                    onChange={(e: any) => {
                                                        handleSetFieldValue(
                                                            name,
                                                            e
                                                        )
                                                    }}
                                                    options={
                                                        dropdownOptions[
                                                        field.optionAccessKey ||
                                                        'counrtyOptions'
                                                        ]
                                                    }
                                                    isSubmitting={isSubmitting}
                                                />
                                            </div>
                                        )
                                    case 'textarea':
                                        return (
                                            <div className="-mt-2" key={index}>
                                                <ATMTextArea
                                                    required
                                                    minRows={4}
                                                    placeholder="Enter remark"
                                                    name={name}
                                                    value={
                                                        name.includes('.')
                                                            ? values[
                                                            name.split('.')[0]
                                                            ][name.split('.')[1]]
                                                            : values[name]
                                                    }
                                                    label="Address"
                                                    className="rounded"
                                                    onChange={(newValue: any) => {
                                                        if (
                                                            name ===
                                                            'regd_address.phone' ||
                                                            name ===
                                                            'billing_address.phone'
                                                        ) {
                                                            const inputValue =
                                                                newValue
                                                            if (
                                                                !isNaN(
                                                                    Number(
                                                                        inputValue
                                                                    )
                                                                )
                                                            ) {
                                                                handleSetFieldValue(
                                                                    name,
                                                                    String(
                                                                        inputValue
                                                                    )
                                                                )
                                                            }
                                                        } else {
                                                            handleSetFieldValue(
                                                                name,
                                                                newValue
                                                            )
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )

                                    case 'checkbox':
                                        return (
                                            <div
                                                className="-mt-2"
                                                key={name || index}
                                            >
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
                                                                gstNumber,
                                                                gstCertificate,
                                                            } = values.regd_address
                                                            setFieldValue(
                                                                'billing_address.gstNumber',
                                                                gstNumber
                                                            )
                                                            setFieldValue(
                                                                'billing_address.gstCertificate',
                                                                gstCertificate
                                                            )
                                                            setFieldValue(
                                                                'billing_address.address',
                                                                address
                                                            )
                                                            setFieldValue(
                                                                'billing_address.country',
                                                                country
                                                            )
                                                            setFieldValue(
                                                                'billing_address.district',
                                                                district
                                                            )
                                                            setFieldValue(
                                                                'billing_address.phone',
                                                                phone
                                                            )
                                                            setFieldValue(
                                                                'billing_address.pincode',
                                                                pincode
                                                            )
                                                            setFieldValue(
                                                                'billing_address.state',
                                                                state
                                                            )
                                                        } else {
                                                            setFieldValue(
                                                                'billing_address.gstNumber',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billing_address.gstCertificate',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billing_address.address',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billing_address.country',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billing_address.district',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billing_address.phone',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billing_address.pincode',
                                                                ''
                                                            )
                                                            setFieldValue(
                                                                'billing_address.state',
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

export default StepEditAddress
