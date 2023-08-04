/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:AddDealerPincode.tsx
// Type: Tab Add Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState, useEffect } from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './DealerPinCodeTabWrapper'
import { SelectOption } from 'src/models/FormField/FormField.model'
import { showToast } from 'src/utils'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { useGetPincodesByDistrictQuery } from 'src/services/DealerPincodeService'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    pincodeOptions: any[]
    DistrictOptions: any[]
    apiStatus: boolean
}
export type DropdownOptions = {
    pincodeOptions: SelectOption[]
    DistrictOptions: SelectOption[]
}

// Breadcrumbs

const AddDealerPincode = ({
    formikProps,
    pincodeOptions,
    DistrictOptions,
    apiStatus,
}: Props) => {
    const dropdownOptions: DropdownOptions = {
        pincodeOptions,
        DistrictOptions,
    }
    const [districtPincodes, setDistrictPincodes] = useState([])
    const [selectedDistrict, setDistrict] = useState()
    const [itemIndex, setitemIndex] = useState()

    const { data, isLoading, isFetching } = useGetPincodesByDistrictQuery(
        selectedDistrict,
        { skip: !selectedDistrict }
    )
    const { values, setFieldValue } = formikProps

    useEffect(() => {
        if (!isLoading && !isFetching) {
            let pincodes = data?.data?.map((ele: any) => {
                return ele?.pincode
            })

            setDistrictPincodes(pincodes)
        }
    }, [data, isLoading, isFetching])

    useEffect(() => {
        setFieldValue(`pincodeDetail[${itemIndex}].pincode`, districtPincodes)
    }, [districtPincodes])

    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium"> Add Pincode </div>

                        {/* BUTTON - Add SO */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    true ? 'disabled:opacity-25' : ''
                                }`}
                            >
                                Add Pincode
                            </button>
                        </div>
                    </div>

                    {/*  Items  */}
                    <div className="px-3">
                        <FieldArray name="pincodeDetail">
                            {({ push, remove }) => {
                                return (
                                    <>
                                        <div className="flex flex-col gap-y-5">
                                            {values.pincodeDetail?.map(
                                                (item: any, itemIndex: any) => {
                                                    const {
                                                        pincode,
                                                        estTime,
                                                        district,
                                                    } = item

                                                    return (
                                                        <div
                                                            key={itemIndex}
                                                            className="flex gap-3 items-end "
                                                        >
                                                            <div className="flex-[1_1_0%]">
                                                                <ATMSelectSearchable
                                                                    name={`pincodeDetail[${itemIndex}].district`}
                                                                    value={
                                                                        district
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setitemIndex(
                                                                            itemIndex
                                                                        )
                                                                        setDistrict(
                                                                            e
                                                                        )
                                                                        setFieldValue(
                                                                            `pincodeDetail[${itemIndex}].district`,
                                                                            e
                                                                        )
                                                                    }}
                                                                    options={
                                                                        dropdownOptions.DistrictOptions
                                                                    }
                                                                    label="District"
                                                                />
                                                            </div>
                                                            {/* Item Name */}
                                                            <div className="flex-[3_3_0%]">
                                                                <ATMSelectSearchable
                                                                    size="small"
                                                                    isMulti
                                                                    name={`pincodeDetail[${itemIndex}].pincode`}
                                                                    value={
                                                                        pincode
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            !values?.pincodeDetail?.find(
                                                                                (
                                                                                    f
                                                                                ) =>
                                                                                    f.pincode ===
                                                                                    e
                                                                            )
                                                                        ) {
                                                                            setFieldValue(
                                                                                `pincodeDetail[${itemIndex}].pincode`,
                                                                                e
                                                                            )
                                                                        } else {
                                                                            showToast(
                                                                                'error',
                                                                                'Pincode Already Added!'
                                                                            )
                                                                        }
                                                                    }}
                                                                    options={
                                                                        dropdownOptions.pincodeOptions
                                                                    }
                                                                    label="Pincode"
                                                                />
                                                            </div>

                                                            {/* Rate */}
                                                            <div className="flex-[1_1_0%]">
                                                                <ATMTextField
                                                                    size="small"
                                                                    type="number"
                                                                    min={0}
                                                                    name={`pincodeDetail[${itemIndex}].estTime`}
                                                                    value={
                                                                        estTime?.toString() ||
                                                                        ''
                                                                    }
                                                                    label="Estimated Time (in Min.)"
                                                                    placeholder="Estimated Time"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setFieldValue(
                                                                            `pincodeDetail[${itemIndex}].estTime`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            {/* BUTTON - Delete */}
                                                            {values
                                                                .pincodeDetail
                                                                ?.length >
                                                                1 && (
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            remove(
                                                                                itemIndex
                                                                            )
                                                                        }}
                                                                        className="p-2  bg-red-500 text-white rounded"
                                                                    >
                                                                        <MdDeleteOutline className="text-2xl" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>

                                        {/* BUTTON - Add More Product */}
                                        <div className="flex justify-end py-5">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    push({
                                                        pincode: '',
                                                        estTime: 0,
                                                    })
                                                }
                                                className="bg-primary-main px-3 mt-5 py-1 text-white rounded"
                                            >
                                                <HiPlus size="20" />
                                            </button>
                                        </div>
                                    </>
                                )
                            }}
                        </FieldArray>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDealerPincode
