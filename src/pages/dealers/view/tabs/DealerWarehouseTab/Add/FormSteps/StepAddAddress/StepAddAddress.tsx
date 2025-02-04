// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { FormikProps } from 'formik'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'

// |-- Internal Dependencies --|
// |-- Redux --|
import { useDispatch } from 'react-redux'
import { setFormSubmitting } from 'src/redux/slices/authSlice'
// |-- Types --|

import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddDealerWarehouseWarpper'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'

import { RootState } from 'src/redux/store'
import ATMFilePickerWrapper from 'src/components/UI/atoms/formFields/ATMFileUploader/ATMFileUploaderWrapper'
import ATMCheckbox from 'src/components/UI/atoms/formFields/ATMCheckbox/ATMCheckbox'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import { CiSearch } from 'react-icons/ci'
import { useAddFileUrlMutation } from 'src/services/FilePickerServices'
import { BASE_URL_FILE_PICKER , FILE_BUCKET_NAME } from 'src/utils/constants'

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
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    // Upload File Mutation
    const [uploadFile] = useAddFileUrlMutation()
    const [imageApiStatus, setImageApiStatus] = useState(false)
    // const [fileUploader] = useFileUploaderMutation()
    const dispatch = useDispatch()

    const handleFileUpload: any = (file: File, name: string) => {
        let formData = new FormData()

        setImageApiStatus(true)
        formData.append(
            'type',
            file.type?.includes('image') ? 'IMAGE' : 'DOCUMENT'
        )
        formData.append('bucketName', FILE_BUCKET_NAME)
        formData.append('file', file || '', file?.name)

        // call the file manager api
        uploadFile(formData).then((res: any) => {
            if ('data' in res) {
                let fileUrl = BASE_URL_FILE_PICKER + '/' + res?.data?.file_path
                setFieldValue(name, fileUrl)
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
                        className={`py-9 px-7 ${
                            index !== formFields?.length - 1 && 'border-b'
                        }  border-slate-300`}
                    >
                        <div className="text-primary-main text-lg pb-2 font-medium">
                            {sectionName}
                        </div>

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
                                                className="shadow bg-white rounded"
                                                isSubmitting={isSubmitting}
                                            />
                                        )
                                    case 'file-picker':
                                        return (
                                            <div className="mt-4" key={name}>
                                                <ATMFilePickerWrapper
                                                    name={name}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    onSelect={(
                                                        newFile: any
                                                    ) => {
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
                                                {imageApiStatus ? (
                                                    <div className=" mt-3 flex justify-center  items-center w-full h-full">
                                                        <CircularProgress />
                                                    </div>
                                                ) : null}
                                            </div>
                                        )
                                    case 'select':
                                        return (
                                            <>
                                                <ATMSelectSearchable
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
                                                            className="flex justify-center items-center bg-slate-400 w-8 h-9 rounded mt-9 cursor-pointer"
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
                                                                        name=""
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
                                                                        className="shadow bg-white rounded"
                                                                    />
                                                                </div>
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </>
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
                                                            } =
                                                                values.regd_address
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
