import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../CustomerComplainWrapper'
import { CustomerDetailsPropsTypes } from '../CustomerComplainWrapper'
import { handleValidNumber } from 'src/utils/methods/numberMethods'

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
    const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <div className="py-1">
            <div>
                {/* Search Header */}
                <div className="w-full shadow border rounded bg-white p-2">
                    <div className="grid gap-x-4 gap-y-3 grid-cols-4 py-1">
                        {/* <ATMTextField
                        hidden
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
                            onKeyDown={handleEnterKeyPress}
                            onChange={(e) => {
                                setFieldValue('incomingNumber', e.target.value)
                            }}
                        /> */}

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
                            onKeyDown={handleEnterKeyPress}
                            onChange={(e) => {
                                handleValidNumber(e) &&
                                    setFieldValue(
                                        'contactNumber',
                                        e.target.value
                                    )
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
                            onKeyDown={handleEnterKeyPress}
                            onChange={(e) => {
                                handleValidNumber(e) &&
                                    setFieldValue(
                                        'orderNumber',
                                        e.target.value ? e.target.value : 0
                                    )
                            }}
                        />

                        <ATMTextField
                            readOnly
                            disabled
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
                            onKeyDown={handleEnterKeyPress}
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
                            onKeyDown={handleEnterKeyPress}
                            onChange={(e) => {
                                setFieldValue('email', e.target.value)
                            }}
                        />

                        <ATMTextField
                            disabled
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
                            onKeyDown={handleEnterKeyPress}
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
                            onKeyDown={handleEnterKeyPress}
                            onChange={(e) => {
                                setFieldValue('barcode', e.target.value)
                            }}
                        />

                        {/* Search Button and Reset Button */}
                        <div className="flex justify-end items-end gap-x-6">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="bg-slate-300 px-2 py-1 rounded text-black text-xs"
                            >
                                Search
                            </button>

                            <button
                                type="button"
                                className="bg-slate-300 px-2 py-1 rounded text-black text-xs"
                                onClick={() => {
                                    // setFieldValue('incomingNumber', '')
                                    setFieldValue('contactNumber', '')
                                    setFieldValue('orderNumber', 0)
                                    setFieldValue('complaintNumber', 0)
                                    setFieldValue('email', '')
                                    setFieldValue('refOrderNumber', 0)
                                    setFieldValue('barcode', '')
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Customer Details Section */}
                <div className="w-full mt-2 shadow border rounded bg-white p-2 my-1">
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
                            name="customerName"
                            placeholder=""
                            value={customerDetails?.name}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
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
                            name="customerName"
                            placeholder=""
                            value={customerDetails?.emailOfDetails}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
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
                            name="customerName"
                            placeholder=""
                            value={customerDetails?.gender}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
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
                            name="customerName"
                            placeholder=""
                            value={customerDetails?.incomingNumberOfDetails}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
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
                            name="customerName"
                            placeholder=""
                            value={customerDetails?.mobileNumber}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
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
                            name="customerName"
                            placeholder=""
                            value={customerDetails?.alternateNo1}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
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
                            name="customerName"
                            placeholder=""
                            value={customerDetails?.alternateNo2}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
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
                                // setFieldValue('customerName', e.target.value)
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
                            name="customerName"
                            placeholder=""
                            value={customerDetails?.address2}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
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
                            name="customerName"
                            placeholder=""
                            value={customerDetails?.address3}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
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
                            name="customerName"
                            placeholder=""
                            value={customerDetails?.address4}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
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
                                // setFieldValue('customerName', e.target.value)
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
                                // setFieldValue('customerName', e.target.value)
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
                                // setFieldValue('customerName', e.target.value)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerComplainHeader
