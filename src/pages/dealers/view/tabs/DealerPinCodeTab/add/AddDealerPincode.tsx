/* eslint-disable react-hooks/exhaustive-deps */
/// ==============================================
// Filename:AddDealerPincode.tsx
// Type: Tab Add Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { FormikProps, FieldArray } from 'formik'
import { HiPlus } from 'react-icons/hi'

import { FormInitialValues } from './DealerPinCodeTabWrapper'
// import usePincodesByDistrict from 'src/hooks/usePincodesByDistrict'
import { SelectOption } from 'src/models/FormField/FormField.model'
import AddDealerLayout from './AddDealerLayout'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
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
   
    DistrictOptions,
    apiStatus,
}: Props) => {
    const { values } = formikProps

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
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main disabled:opacity-25
                               `}
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
                                                    return (
                                                        <AddDealerLayout
                                                            districtOptions={
                                                                DistrictOptions
                                                            }
                                                            remove={remove}
                                                            formikProps={
                                                                formikProps
                                                            }
                                                            itemIndex={
                                                                itemIndex
                                                            }
                                                            value={item}
                                                        />
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
