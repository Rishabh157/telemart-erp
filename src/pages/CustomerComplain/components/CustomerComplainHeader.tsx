import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
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
                <div className="w-full shadow border rounded bg-white p-2">
                    <div className="grid gap-x-4 gap-y-3 grid-cols-4 py-1">
                        <ATMTextField
                            name=""
                            label="Incoming No."
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            placeholder="Incoming No."
                            value={values.incomingNumber || ''}
                            onChange={(e) => {
                                setFieldValue('incomingNumber', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Contact No."
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder="Contact No."
                            value={values.contactNumber || ''}
                            onChange={(e) => {
                                setFieldValue('contactNumber', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Order No."
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder="Order No."
                            value={values.orderNumber || ''}
                            onChange={(e) => {
                                setFieldValue('orderNumber', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Complaint No."
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder="Complaint No."
                            value={values.complaintNumber || ''}
                            onChange={(e) => {
                                setFieldValue('complaintNumber', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Email"
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder="Email"
                            value={values.email || ''}
                            onChange={(e) => {
                                setFieldValue('email', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Ref Order No."
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder="Ref Order No."
                            value={values.refOrderNumber || ''}
                            onChange={(e) => {
                                setFieldValue('refOrderNumber', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Barcode No."
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder="Barcode No."
                            value={values.barcode || ''}
                            onChange={(e) => {
                                setFieldValue('barcode', e.target.value)
                            }}
                        />

                        {/* Search Button and Reset Button */}
                        <div className="flex justify-end items-end gap-x-6">
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
                <div className="w-full mt-4 shadow border rounded bg-white p-2 my-2">
                    <h1 className="text-sm font-semibold mb-2">
                        Customer Details
                    </h1>

                    <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                        <ATMTextField
                            label="Name"
                            labelSize="xxs"
                            size="xxs"
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
                            labelSize="xxs"
                            size="xxs"
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
                            labelSize="xxs"
                            size="xxs"
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

                        <ATMTextField
                            label="Incoming No"
                            labelSize="xxs"
                            size="xxs"
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
                            labelSize="xxs"
                            size="xxs"
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
                            labelSize="xxs"
                            size="xxs"
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
                            labelSize="xxs"
                            size="xxs"
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

                        <ATMTextField
                            label="Address1"
                            labelSize="xxs"
                            size="xxs"
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
                            labelSize="xxs"
                            size="xxs"
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
                            labelSize="xxs"
                            size="xxs"
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
                            labelSize="xxs"
                            size="xxs"
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

                        {/* Location */}
                        <ATMTextField
                            label="district"
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="district"
                            placeholder=""
                            value={customerDetails?.district}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />
                        <ATMTextField
                            label="state"
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="state"
                            placeholder=""
                            value={customerDetails?.state}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />
                        <ATMTextField
                            label="pincode"
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="pincode"
                            placeholder=""
                            value={customerDetails?.pincode}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('reciversName', e.target.value)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerComplainHeader
