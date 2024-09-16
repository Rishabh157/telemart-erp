// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddWarehouseWrapper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { CiSearch } from 'react-icons/ci'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'

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
    handleAutoSearchPincode: (
        name: string,
        newValue: React.ChangeEvent<HTMLInputElement>
    ) => void
    isOpenSearchPincode: any
    setIsOpenSearchPincode: any
}

const StepAddAddress = ({
    formikProps,
    formFields,
    dropdownOptions,
    handleAutoSearchPincode,
    isOpenSearchPincode,
    setIsOpenSearchPincode,
}: Props) => {
    const [imageApiStatus, setImageApiStatus] = useState<boolean>(false)
    const [loaderState, setLoaderState] = useState<string>('')

    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

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
                                                key={name}
                                                maxLength={
                                                    name ===
                                                        'regd_address.phone' ||
                                                        name ===
                                                        'billing_address.phone'
                                                        ? 10
                                                        : 100
                                                }
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
                                                            setFieldValue(
                                                                name,
                                                                String(
                                                                    inputValue
                                                                )
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
                                                className="bg-white rounded shadow relative"
                                                isSubmitting={isSubmitting}
                                            />
                                        )
                                    case 'file-picker':
                                        return (
                                            <div className="mt-5" key={name}>
                                                <ATMFilePickerWrapper
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
                                            <div
                                                className={`"-mt-2" ${label === 'Pincode' &&
                                                    'flex gap-x-4'
                                                    }`}
                                                key={name}
                                            >
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
                                                    selectLabel={label}
                                                    onChange={(e: any) => {
                                                        setFieldValue(name, e)
                                                    }}
                                                    options={
                                                        dropdownOptions[
                                                        field.optionAccessKey ||
                                                        'counrtyOptions'
                                                        ]
                                                    }
                                                    isSubmitting={isSubmitting}
                                                />

                                                {label === 'Pincode' && (
                                                    <>
                                                        <div
                                                            className="flex items-center justify-center w-8 rounded cursor-pointer bg-slate-400 h-9 mt-11"
                                                            onClick={() => {
                                                                setIsOpenSearchPincode(
                                                                    (
                                                                        prev: any
                                                                    ) => {
                                                                        return {
                                                                            ...prev,
                                                                            [name]: true,
                                                                        }
                                                                    }
                                                                )
                                                            }}
                                                        >
                                                            <CiSearch
                                                                size={20}
                                                                color="bg-blue-400"
                                                            />
                                                        </div>
                                                        <DialogLogBox
                                                            fullWidth={false}
                                                            isOpen={
                                                                isOpenSearchPincode[
                                                                name
                                                                ]
                                                            }
                                                            handleClose={() =>
                                                                setIsOpenSearchPincode(
                                                                    (
                                                                        prev: any
                                                                    ) => {
                                                                        return {
                                                                            ...prev,
                                                                            [name]: false,
                                                                        }
                                                                    }
                                                                )
                                                            }
                                                            component={
                                                                <div className="px-4 py-2">
                                                                    <ATMTextField
                                                                        required={
                                                                            required
                                                                        }
                                                                        name="pincodeSearch"
                                                                        value={
                                                                            name ===
                                                                                'billing_address.pincode'
                                                                                ? values[
                                                                                'billing_address.pincodeSearch'
                                                                                ]
                                                                                : values[
                                                                                'regd_address.pincodeSearch'
                                                                                ]
                                                                        }
                                                                        onChange={(
                                                                            newValue
                                                                        ) => {
                                                                            handleAutoSearchPincode(
                                                                                name,
                                                                                newValue
                                                                            )
                                                                        }}
                                                                        label="Search Pincode"
                                                                        placeholder="Enter Pincode"
                                                                        className="bg-white rounded shadow"
                                                                    />
                                                                </div>
                                                            }
                                                        />
                                                    </>
                                                )}
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
                                                                gstCertificate
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
                                    case 'textarea':
                                        return (
                                            <div className="-mt-1 relative">
                                                <ATMTextArea
                                                    required={required}
                                                    key={name}
                                                    name={name}
                                                    minRows={2}
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
                                                        setFieldValue(name, e)
                                                    }}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    className="shadow bg-white rounded"
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
            })}
        </div>
    )
}

export default StepAddAddress
