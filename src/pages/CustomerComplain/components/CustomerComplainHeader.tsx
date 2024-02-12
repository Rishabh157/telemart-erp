import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { FormInitialValues } from '../CustomerComplainWrapper'
import { CustomerDetailsPropsTypes } from '../CustomerComplainWrapper'

type Props = {
    values: FormInitialValues
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void
    handleSubmit: () => void
    customerDetails: CustomerDetailsPropsTypes
}

const CustomerComplainHeader = ({
    values,
    setFieldValue,
    handleSubmit,
    customerDetails,
}: Props) => {
    return (
        <div className="py-1">
            <div>
                {/* Search Header */}
                <div className="w-full bg-[#e9f1fb] p-2">
                    <div className="grid gap-x-8 grid-cols-8">
                        <ATMTextField
                            name=""
                            label="Incoming No."
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            placeholder=""
                            value={values.incomingNumber || ''}
                            onChange={(e) => {
                                setFieldValue('incomingNumber', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Contact No."
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder=""
                            value={values.contactNumber || ''}
                            onChange={(e) => {
                                setFieldValue('contactNumber', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Order No."
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder=""
                            value={values.orderNumber || ''}
                            onChange={(e) => {
                                setFieldValue('orderNumber', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Complaint No."
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder=""
                            value={values.complaintNumber || ''}
                            onChange={(e) => {
                                setFieldValue('complaintNumber', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Email"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder=""
                            value={values.email || ''}
                            onChange={(e) => {
                                setFieldValue('email', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Ref Order No."
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder=""
                            value={values.refOrderNumber || ''}
                            onChange={(e) => {
                                setFieldValue('refOrderNumber', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Barcode No."
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder=""
                            value={values.barcode || ''}
                            onChange={(e) => {
                                setFieldValue('barcode', e.target.value)
                            }}
                        />

                        {/* Search Button and Reset Button */}
                        <div className="flex items-center gap-x-6">
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="bg-slate-300 px-2 py-1 rounded text-black text-xs"
                            >
                                Search
                            </button>

                            <button
                                type="button"
                                className="bg-slate-300 px-2 py-1 rounded text-black text-xs"
                                onClick={() => {
                                    setFieldValue('incomingNumber', '')
                                    setFieldValue('contactNumber', '')
                                    setFieldValue('orderNumber', '')
                                    setFieldValue('complaintNumber', '')
                                    setFieldValue('email', '')
                                    setFieldValue('refOrderNumber', '')
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Customer Details Section */}
                <div className="w-full mt-4 bg-[#e9f1fb] border-[1px] border-black p-2">
                    <h1 className="text-sm font-semibold mb-2">
                        Customer Details
                    </h1>

                    <div className="grid gap-x-16 grid-cols-5">
                        <ATMTextField
                            label="Name"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="reciversName"
                            placeholder=""
                            value={customerDetails?.name}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Email"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="reciversName"
                            placeholder=""
                            value={customerDetails?.emailOfDetails}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Gender"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="reciversName"
                            placeholder=""
                            value={customerDetails?.gender}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />
                    </div>

                    <div className="grid gap-x-16 grid-cols-5 mt-2">
                        <ATMTextField
                            label="Incoming No"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="reciversName"
                            placeholder=""
                            value={customerDetails?.incomingNumberOfDetails}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Mobile No"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="reciversName"
                            placeholder=""
                            value={customerDetails?.mobileNumber}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Alternate No1"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="reciversName"
                            placeholder=""
                            value={customerDetails?.alternateNo1}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Alternate No2"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="reciversName"
                            placeholder=""
                            value={customerDetails?.alternateNo2}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />
                    </div>

                    <div className="grid gap-x-16 grid-cols-5 mt-2">
                        <ATMTextField
                            label="Address1"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder=""
                            value={customerDetails?.address1}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Address2"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="reciversName"
                            placeholder=""
                            value={customerDetails?.address2}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Address3"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="reciversName"
                            placeholder=""
                            value={customerDetails?.address3}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Address4"
                            labelSize="xs"
                            size="xs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="reciversName"
                            placeholder=""
                            value={customerDetails?.address4}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />
                    </div>

                    {/* Location */}
                    <div className="grid gap-x-16 grid-cols-5 mt-2">
                        <ATMSelectSearchable
                            componentClass=""
                            label="District"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select state"
                            classDirection="grid grid-cols-3"
                            name="stateId"
                            value={customerDetails?.district}
                            options={[
                                {
                                    label: customerDetails?.district,
                                    value: customerDetails?.district,
                                },
                            ]}
                            isValueWithLable
                            isDisabled={true}
                            onChange={(e) => {
                                // setFieldValue('stateId', e?.value || '')
                                // setFieldValue('stateLabel', e?.label || '')
                                // if (!e.value) {
                                //     handleRemoveAddressRelated('stateId')
                                // }
                            }}
                        />

                        <ATMSelectSearchable
                            componentClass=""
                            label="State"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select state"
                            classDirection="grid grid-cols-3"
                            name="stateId"
                            options={[
                                {
                                    label: customerDetails?.state,
                                    value: customerDetails?.state,
                                },
                            ]}
                            value={customerDetails?.state || ''}
                            isValueWithLable
                            isDisabled={true}
                            onChange={(e) => {
                                // setFieldValue('stateId', e?.value || '')
                                // setFieldValue('stateLabel', e?.label || '')
                                // if (!e.value) {
                                //     handleRemoveAddressRelated('stateId')
                                // }
                            }}
                        />

                        <ATMSelectSearchable
                            componentClass=""
                            label="Pincode"
                            size="xs"
                            labelSize="xs"
                            labelDirection="horizontal"
                            selectLabel="select state"
                            classDirection="grid grid-cols-3"
                            name="stateId"
                            value={customerDetails?.pincode}
                            options={[
                                {
                                    label: customerDetails?.pincode,
                                    value: customerDetails?.pincode,
                                },
                            ]}
                            isValueWithLable
                            isDisabled={true}
                            onChange={(e) => {
                                // setFieldValue('stateId', e?.value || '')
                                // setFieldValue('stateLabel', e?.label || '')
                                // if (!e.value) {
                                //     handleRemoveAddressRelated('stateId')
                                // }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerComplainHeader
