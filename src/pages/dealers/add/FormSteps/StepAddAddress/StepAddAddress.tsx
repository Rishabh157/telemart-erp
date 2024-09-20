// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { CiSearch } from 'react-icons/ci'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddDealerWrapper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'

// |-- Redux --|
import { RootState } from 'src/redux/store'
import { setFormSubmitting } from 'src/redux/slices/authSlice'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import { CircularProgress } from '@mui/material'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'

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
    handleAutoSearchPincode,
    isOpenSearchPincode,
    setIsOpenSearchPincode,
}: Props) => {
    const dispatch = useDispatch<any>()

    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

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
                        className={`pb-6 pt-2 px-7 ${index !== formFields.length - 1 && 'border-b'
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
                                                extraClassField="mt-1"
                                                isSubmitting={isSubmitting}
                                            />
                                        )
                                    case 'select':
                                        return (
                                            <React.Fragment key={name}>
                                                <div className={`-mt-4" ${label === 'Pincode' && 'flex gap-x-1'}`}>
                                                    <ATMSelectSearchable
                                                        componentClass='w-full'
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
                                                            setFieldValue(
                                                                name,
                                                                e
                                                            )
                                                        }}
                                                        // size="small"
                                                        selectClass="shadow mt-2"
                                                        isSubmitting={
                                                            isSubmitting
                                                        }
                                                    />
                                                    {label === 'Pincode' && (
                                                        <>
                                                            <div
                                                                className="flex justify-center items-center bg-slate-400 w-8 h-9 rounded mt-7 cursor-pointer"
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
                                                                    ] || false
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
                                                                            name="name"
                                                                            value={
                                                                                name ===
                                                                                    'billingAddress.pincode'
                                                                                    ? values[
                                                                                    'billingAddress.pincodeSearch'
                                                                                    ]
                                                                                    : values[
                                                                                    'registrationAddress.pincodeSearch'
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
                                                                            className="shadow bg-white rounded"
                                                                        />
                                                                    </div>
                                                                }
                                                            />
                                                        </>
                                                    )}
                                                </div>

                                            </React.Fragment>
                                        )
                                    case 'checkbox':
                                        return (
                                            <div className="-mt-2" key={name}>
                                                <ATMCheckbox
                                                    name={name}
                                                    label={label}
                                                    onChange={(e) => {
                                                        setFieldValue(name, e)
                                                        dispatch(
                                                            setFormSubmitting(
                                                                false
                                                            )
                                                        )

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
                                                            setFieldValue(
                                                                'billingAddress.gstNumber',
                                                                gstNumber
                                                            )
                                                            setFieldValue(
                                                                'billingAddress.gstCertificate',
                                                                gstCertificate
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
                                                    checked={Boolean(
                                                        values[name]
                                                    )}
                                                />
                                            </div>
                                        )
                                    case 'textarea':
                                        return (
                                            <div className="-mt-3" key={name}>
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
                                                        setFieldValue(name, e)
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

export default StepAddAddress
