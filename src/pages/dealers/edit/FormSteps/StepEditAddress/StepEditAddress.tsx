// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditDealerWrapper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import {
    setFieldCustomized,
    setFormSubmitting,
} from 'src/redux/slices/authSlice'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'
import { CircularProgress } from '@mui/material'

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

// |-- Types --|
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
    const dispatch = useDispatch()
    const handleSetFieldValue = (name: string, value: string | boolean) => {
        setFieldValue(name, value)
        dispatch(setFieldCustomized(true))
    }


    const [imageApiStatus, setImageApiStatus] = useState<boolean>(false)
    const [loaderState, setLoaderState] = useState<string>('')
    const [uploadFile] = useAddFileUrlMutation()

    const getTheValueByNameKey = (name: string) => {
        switch (name) {
            case 'registrationAddress.gstCertificate':
                return values?.registrationAddress?.gstCertificate
            case 'billingAddress.gstCertificate':
                return values?.billingAddress?.gstCertificate
            default:
                return ''
        }
    }

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
                        className={`py-4 px-7 ${index !== formFields.length - 1 && 'border-b'
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
                                    required,
                                } = field

                                switch (type) {
                                    case 'text':
                                        return (
                                            <ATMTextField
                                                key={name}
                                                required={required}
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
                                                            handleSetFieldValue(
                                                                name,
                                                                e.target.value
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
                                                className="shadow bg-white rounded"
                                                extraClassField="mt-2"
                                                isSubmitting={isSubmitting}
                                            />
                                        )
                                    case 'select':
                                        return (
                                            <div className="-mt-4" key={name}>
                                                <ATMSelectSearchable
                                                    required={required}
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
                                                        handleSetFieldValue(
                                                            name,
                                                            e
                                                        )
                                                    }}
                                                    selectClass="shadow mt-2"
                                                />
                                            </div>
                                        )
                                    case 'checkbox':
                                        return (
                                            <ATMCheckbox
                                                required={required}
                                                key={name}
                                                name={name}
                                                label={label}
                                                checked={Boolean(values[name])}
                                                onChange={(e) => {
                                                    dispatch(
                                                        setFormSubmitting(false)
                                                    )
                                                    handleSetFieldValue(name, e)
                                                    if (e) {
                                                        const {
                                                            address,
                                                            countryId,
                                                            districtId,
                                                            phone,
                                                            pincodeId,
                                                            stateId,
                                                            gstNumber,
                                                            gstCertificate
                                                        } =
                                                            values.registrationAddress
                                                        handleSetFieldValue(
                                                            'billingAddress.phone',
                                                            phone
                                                        )
                                                        handleSetFieldValue(
                                                            'billingAddress.address',
                                                            address
                                                        )
                                                        handleSetFieldValue(
                                                            'billingAddress.countryId',
                                                            countryId
                                                        )
                                                        handleSetFieldValue(
                                                            'billingAddress.districtId',
                                                            districtId
                                                        )
                                                        handleSetFieldValue(
                                                            'billingAddress.pincodeId',
                                                            pincodeId
                                                        )
                                                        handleSetFieldValue(
                                                            'billingAddress.stateId',
                                                            stateId
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.gstNumber',
                                                            gstNumber
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.gstCertificate',
                                                            gstCertificate
                                                        )
                                                    } else {
                                                        handleSetFieldValue(
                                                            'billingAddress.address',
                                                            ''
                                                        )
                                                        handleSetFieldValue(
                                                            'billingAddress.countryId',
                                                            ''
                                                        )
                                                        handleSetFieldValue(
                                                            'billingAddress.districtId',
                                                            ''
                                                        )
                                                        handleSetFieldValue(
                                                            'billingAddress.phone',
                                                            ''
                                                        )
                                                        handleSetFieldValue(
                                                            'billingAddress.pincodeId',
                                                            ''
                                                        )
                                                        handleSetFieldValue(
                                                            'billingAddress.stateId',
                                                            ''
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.gstNumber',
                                                            ''
                                                        )
                                                        setFieldValue(
                                                            'billingAddress.gstCertificate',
                                                            ''
                                                        )
                                                    }
                                                }}
                                            />
                                        )
                                    case 'textarea':
                                        return (
                                            <div className="-mt-2" key={name}>
                                                <ATMTextArea
                                                    required={required}
                                                    name={name}
                                                    minRows={5}
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
                                                    onChange={(e) => {
                                                        handleSetFieldValue(
                                                            name,
                                                            e
                                                        )
                                                    }}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    labelClass='text-slate-700 text-sm font-medium mb-0'
                                                    className="shadow bg-white rounded mt-1"
                                                    isSubmitting={isSubmitting}
                                                />
                                            </div>
                                        )
                                    case 'file-picker':
                                        return (
                                            <div
                                                className="mt-1"
                                                key={name || index}
                                            >
                                                <ATMFilePickerWrapper
                                                    name={name}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    selectedFile={getTheValueByNameKey(name)}
                                                    onSelect={(newFile) => {
                                                        handleFileUpload(newFile, name)
                                                    }}
                                                    isSubmitting={isSubmitting}
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
