import React, { useState, useEffect } from 'react'
import { FormikProps, FieldArray } from 'formik'
import { FormInitialValues } from './DealerSchemeTabWrapper'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { SelectOption } from 'src/models/FormField/FormField.model'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    schemeOptions: any
    apiStatus: boolean,
    pinCodeOptions:SelectOption[]
}

const AddDealerScheme = ({ formikProps, schemeOptions, apiStatus,pinCodeOptions }: Props) => {
    const [allOptions, setAllOtions] = useState([])
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        if (flag && schemeOptions?.length) {
            setFlag(false)
            setAllOtions(schemeOptions)
        }
    }, [flag, schemeOptions])

    const { values, setFieldValue } = formikProps
    // const options: { label: string; value: string }[] = allOptions

    // const transferListProps = {
    //     name: 'schemes',
    //     options,
    //     right: values.schemes,
    //     setRight: (newValue: { label: string; value: string }[]) =>
    //         setFieldValue('schemes', newValue),
    //     leftSideTitle: 'All Schemes',
    //     rightSideTitle: 'Schemes to add',
    // }


    return (
        <div className="h-[calc(100%-55px)]">
            <div className="p-4 flex flex-col gap-2  ">
                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> Add Scheme </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()} //handleSubmit
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${true ? 'disabled:opacity-25' : ''
                                    }`}
                            >
                                Add Scheme
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    {/* <div className="grow  py-8 px-3 ">
                        <div className="h-[300px] mt-8">
                            {options ? (
                                <ATMTransferList {...transferListProps} />
                            ) : null}
                        </div>
                    </div> */}

                    <FieldArray name="details">
                        {({ push, remove }) => {
                            return (
                                <>
                                    <div className="flex flex-col gap-y-5 px-3">
                                        {values.details?.map(
                                            (item, index) => {
                                                const {schemeId,pincodes} = item
                                                return (
                                                    <div
                                                        key={index}
                                                        className="grid grid-cols-12 gap-10 items-end "
                                                    >
                                                        {/* Product Name */}
                                                        <div className="col-span-3">
                                                            <ATMSelect
                                                                name={`details[${index}].schemeId`}
                                                                value={
                                                                    schemeId || ""
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    setFieldValue(
                                                                        `details[${index}].schemeId`,
                                                                        e
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                options={
                                                                    allOptions
                                                                }
                                                                label="Scheme"
                                                            />
                                                        </div>

                                                        {/* pincodes */}
                                                        <div className="col-span-8">
                                                            <ATMSelectSearchable
                                                                name={`details[${index}].pincodes`}
                                                                value={
                                                                    pincodes || []
                                                                }
                                                                onChange={(
                                                                    value
                                                                ) =>
                                                               
                                                                    setFieldValue(
                                                                        `details[${index}].pincodes`,value
                                                                    )
                                                                }
                                                                options={
                                                                    pinCodeOptions
                                                                }
                                                                label="Pincode"
                                                                isMulti={true}
                                                                selectClass={"max-h-10 mt-2"}
                                                            />
                                                        </div>

                                                        {/* BUTTON - Delete */}
                                                        {values
                                                            .details
                                                            ?.length >
                                                            1 && (
                                                                <div className='col-span-1'>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            remove(
                                                                                index
                                                                            )
                                                                        }}
                                                                        className="p-2 bg-red-500 text-white rounded"
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
                                    <div className="flex justify-self-start py-9 px-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                push({
                                                    schemeId: '',
                                                    pincodes: pinCodeOptions?.map((item:any)=>item.label),
                                                })
                                            }
                                            className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                                        >
                                            <HiPlus size="20" /> Add More
                                        </button>
                                    </div>
                                </>
                            )
                        }}
                    </FieldArray>
                </div>
            </div>
        </div>
    )
}

export default AddDealerScheme
