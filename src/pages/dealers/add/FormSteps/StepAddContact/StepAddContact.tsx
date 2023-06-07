import React from 'react'
import { FieldArray, FormikProps } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../AddDealerWrapper'
import { FieldType } from './StepAddContactWrapper'
import { HiPlus } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    formFields: { sectionName: string; fields: FieldType[] }[]
}

const StepAddContact = ({ formikProps, formFields }: Props) => {
    const { values, setFieldValue }: { values: any; setFieldValue: any } =
        formikProps
    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )
    return (
        <div className="">
            <FieldArray name="contactInformation">
                {({ push, remove }) => {
                    return (
                        <div className="">
                            {values?.contactInformation?.map(
                                (
                                    contactInformations: any,
                                    contactInformationIndex: number
                                ) => {
                                    const {
                                        name,
                                        department,
                                        designation,
                                        email,
                                        mobileNumber,
                                        landLine,
                                    } = contactInformations
                                    return (
                                        <div
                                            key={contactInformationIndex}
                                            className={`border-b border-slate-300`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="text-primary-main text-lg pb-2 font-medium mt-3 px-3">
                                                    Contact Information{' '}
                                                    {contactInformationIndex +
                                                        1}
                                                </div>
                                                {/* Delete Button */}
                                                {values.contactInformation
                                                    ?.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            remove(
                                                                contactInformationIndex
                                                            )
                                                        }
                                                        className="p-1 bg-red-500 text-white rounded"
                                                    >
                                                        <MdDeleteOutline className="text-2xl" />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="py-9 px-7">
                                                <div className="grid grid-cols-3 gap-4 gap-y-5">
                                                    <ATMTextField
                                                        name={`contactInformation[${contactInformationIndex}].name`}
                                                        value={name}
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `contactInformation[${contactInformationIndex}].name`,
                                                                e.target.value
                                                            )
                                                        }}
                                                        label="Name"
                                                        placeholder="name"
                                                        className="shadow bg-white rounded"
                                                        isSubmitting={
                                                            isSubmitting
                                                        }
                                                    />

                                                    {/* MRP */}
                                                    <ATMTextField
                                                        name={`contactInformation[${contactInformationIndex}].department`}
                                                        value={department}
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `contactInformation[${contactInformationIndex}].department`,
                                                                e.target.value
                                                            )
                                                        }}
                                                        label="Department"
                                                        placeholder="department"
                                                        className="shadow bg-white rounded"
                                                        isSubmitting={
                                                            isSubmitting
                                                        }
                                                    />
                                                    {/* POP  */}
                                                    <ATMTextField
                                                        name={`contactInformation[${contactInformationIndex}].designation`}
                                                        value={designation}
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `contactInformation[${contactInformationIndex}].designation`,
                                                                e.target.value
                                                            )
                                                        }}
                                                        label="Desgination"
                                                        placeholder="Desgination"
                                                        className="shadow bg-white rounded"
                                                        isSubmitting={
                                                            isSubmitting
                                                        }
                                                    />
                                                    {/* email  */}
                                                    <ATMTextField
                                                        name={`contactInformation[${contactInformationIndex}].email`}
                                                        value={email}
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `contactInformation[${contactInformationIndex}].email`,
                                                                e.target.value
                                                            )
                                                        }}
                                                        label="Email"
                                                        placeholder="email"
                                                        className="shadow bg-white rounded"
                                                        isSubmitting={
                                                            isSubmitting
                                                        }
                                                    />
                                                    {/*  mobileNumber */}
                                                    <ATMTextField
                                                        name={`contactInformation[${contactInformationIndex}].mobileNumber`}
                                                        value={mobileNumber}
                                                        onChange={(e) => {
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
                                                                    `contactInformation[${contactInformationIndex}].mobileNumber`,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        }}
                                                        label="Mobile Number"
                                                        placeholder="Mobile Number"
                                                        className="shadow bg-white rounded"
                                                        isSubmitting={
                                                            isSubmitting
                                                        }
                                                    />
                                                    <ATMTextField
                                                        name={`contactInformation[${contactInformationIndex}].landLine`}
                                                        value={landLine}
                                                        onChange={(e) => {
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
                                                                    `contactInformation[${contactInformationIndex}].landLine`,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        }}
                                                        label="LandLine"
                                                        placeholder="LandLine"
                                                        className="shadow bg-white rounded"
                                                        isSubmitting={
                                                            isSubmitting
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            )}
                            <div className="flex justify-self-start end p-5">
                                <button
                                    type="button"
                                    onClick={() =>
                                        push({
                                            name: '',
                                            department: '',
                                            designation: '',
                                            email: '',
                                            mobileNumber: '',
                                            landLine: '',
                                        })
                                    }
                                    className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                                >
                                    <HiPlus size="20" /> Add More
                                </button>
                            </div>
                        </div>
                    )
                }}
            </FieldArray>
        </div>
    )
}

export default StepAddContact
