import React from 'react'
import { FormikProps } from 'formik'
import {
    FormInitialValues,
    OrderDetailsPropsTypes,
} from './WarehouseFirstCallPageWrapper'
import { CircularProgress } from '@mui/material'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMDatePicker from 'src/components/UI/atoms/formFields/ATMDatePicker/ATMDatePicker'
import { format } from 'date-fns'
import ATMLoadingButton from 'src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    orderDetails: OrderDetailsPropsTypes
    column?: any[]
    rows?: any[]
    apiStatus: boolean
    getBtnStatus: string
    setGetBtnStatus: (value: string) => string
}

const WarehouseFirstCallPage: React.FC<Props> = ({
    formikProps,
    orderDetails,
    column,
    apiStatus,
    getBtnStatus,
    setGetBtnStatus,
}) => {
    const { values, setFieldValue, handleSubmit } = formikProps
    console.log('values: ', values)

    const {
        orderNumber,
        assignDealerLabel,
        name,
        price,
        contactNumber,
        mobileNumber,
        alternateNumber,
        country,
        state,
        district,
        tehsil,
        pincode,
        area,
        address,
        // Listing
        schemeName,
        shcemeQuantity,
        totalAmount,
        deliveryCharges,
        discount,
    } = orderDetails

    return (
        <div className="bg-white px-2 h-[calc(100vh-55px)]">
            {/* <CallerPageTopNav agentName={values.agentName as string} /> */}
            <div>
                {apiStatus && (
                    <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-[500000] bg-slate-100 opacity-50">
                        <CircularProgress size={26} />
                    </div>
                )}

                {/* Customer Details Section */}
                <div className="w-full mt-2 shadow border rounded bg-white p-2 my-1">
                    <h1 className="text-sm font-semibold mb-2">
                        Customer Details
                    </h1>

                    <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                        <div className="flex gap-x-16 ">
                            <span className="text-slate-700 capitalize text-xs">
                                Order No.
                            </span>
                            <span className="text-slate-700 capitalize text-xs">
                                {orderNumber}
                            </span>
                        </div>

                        <div className="flex gap-x-8">
                            <span className="text-slate-700 capitalize text-xs">
                                Assigned Dealer
                            </span>

                            <span className="text-slate-700 capitalize text-xs">
                                {assignDealerLabel}
                            </span>
                        </div>

                        <div className="flex gap-x-16">
                            <span className="text-slate-700 capitalize text-xs">
                                Name
                            </span>

                            <span className="text-slate-700 capitalize text-xs">
                                {name}
                            </span>
                        </div>

                        <div className="flex gap-x-16 mb-2">
                            <span className="text-slate-700 capitalize text-xs">
                                Price
                            </span>

                            <span className="text-slate-700 capitalize text-xs">
                                {price}
                            </span>
                        </div>

                        <ATMTextField
                            label="Contact No."
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="customerName"
                            placeholder=""
                            value={contactNumber}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Mobile No."
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="customerName"
                            placeholder=""
                            value={mobileNumber}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Alternate No."
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="customerName"
                            placeholder=""
                            value={alternateNumber}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
                            }}
                        />

                        {/* Location */}

                        <ATMTextField
                            label="Country"
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="customerName"
                            placeholder=""
                            value={country}
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
                            value={state}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
                            }}
                        />

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
                            value={district}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Tehsil"
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name=""
                            placeholder=""
                            value={tehsil}
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
                            value={pincode}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
                            }}
                        />

                        <ATMTextField
                            label="Area"
                            labelSize="xxs"
                            size="xxs"
                            labelClass=""
                            extraClassField="mt-0"
                            labelDirection="horizontal"
                            className="mt-0 rounded"
                            name="customerName"
                            placeholder=""
                            value={area}
                            readOnly
                            disabled
                            onChange={(e) => {
                                // setFieldValue('customerName', e.target.value)
                            }}
                        />

                        <div className="flex gap-x-20">
                            <span className="text-slate-700 capitalize text-xs">
                                Address
                            </span>
                            <div className="-mt-2">
                                <ATMTextArea
                                    name="Address"
                                    value={address}
                                    label=""
                                    placeholder="address"
                                    className="rounded w-[150%]"
                                    onChange={(newValue) =>
                                        setFieldValue(
                                            'refOrderNumber',
                                            newValue
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <CustomerComplainHeader
                    values={values}
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                    customerDetails={customerDetails}
                /> */}
            </div>

            <div className="w-full mt-2">
                <h1 className="text-sm font-semibold px-2">Scheme Detail : </h1>
                <div className="border-[1px] border-grey-700 max-h-[150px] overflow-y-scroll">
                    <ATMTable
                        // headerClassName="bg-[#cdddf2] py-2 text-white z-0"
                        columns={column || []}
                        rows={[
                            {
                                schemeName,
                                price,
                                shcemeQuantity,
                                totalAmount,
                                deliveryCharges,
                                discount,
                            },
                        ]}
                        onRowClick={(row) => {
                            // setIsOpenCustomerComplaitDetailModel(true)
                            // setSelectedOrderId(row?._id)
                        }}
                    />
                </div>
            </div>

            <div className="w-full mt-2">
                <h1 className="text-sm font-semibold px-2">
                    Product Group Details :{' '}
                </h1>
                <div className="border-[1px] border-grey-700 max-h-[150px] overflow-y-scroll">
                    <table className="border-collapse border border-gray-600 m-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-600 px-4 py-2">
                                    Product Group
                                </th>
                                <th className="border border-gray-600 px-4 py-2">
                                    Attributes
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-600 px-4 py-2">
                                    Product A
                                </td>
                                <td className="border border-gray-600 px-4 py-2">
                                    Description of Product A
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Remark and change status buttons */}
            <div className="mt-5 grid grid-cols-12 gap-x-8">
                <div className="col-span-4">
                    <span className="text-slate-700 capitalize">Remark</span>
                    <div className="-mt-2">
                        <ATMTextArea
                            name="Address"
                            value={values.remark}
                            label=""
                            minRows={6}
                            placeholder="Enter remark"
                            className="rounded"
                            onChange={(newValue: any) =>
                                setFieldValue('remark', newValue)
                            }
                        />
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="">
                        <div className="text-sm mb-2">Callback Date Time</div>
                        <ATMDatePicker
                            name="callbackDate"
                            size="xs"
                            value={values.callbackDate}
                            dateTimeFormat="DD/MM/YY "
                            onChange={(e) => {
                                setFieldValue(
                                    'callbackDate',
                                    format(new Date(e), 'yyyy-MM-dd')
                                )
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex gap-x-8">
                <ATMLoadingButton
                    disabled={false}
                    loadingText="Saving..."
                    type="button"
                    onClick={() => {
                        setGetBtnStatus('CALLBACK')
                    }}
                    className={`text-white flex items-center py-1 px-2 rounded w-50 ${
                        getBtnStatus === 'CALLBACK'
                            ? 'bg-primary-main'
                            : 'bg-slate-400 opacity-30'
                    }`}
                >
                    CallBack
                </ATMLoadingButton>
                {/* <ATMLoadingButton
                    disabled={false}
                    type="button"
                    loadingText="Saving..."
                    onClick={() => {
                        setGetBtnStatus('APPROVED')
                    }}
                    className={`text-white flex items-center py-1 px-2 rounded w-50 ${
                        getBtnStatus === 'APPROVED'
                            ? 'bg-primary-main'
                            : 'bg-slate-400 opacity-30'
                    }`}
                >
                    Approved
                </ATMLoadingButton> */}
                <button
                    className={`text-white flex items-center py-1 px-2 rounded w-50 ${
                        getBtnStatus === 'APPROVED'
                            ? 'bg-primary-main'
                            : 'bg-slate-400 opacity-30'
                    }`}
                >
                    Approved
                </button>

                <ATMLoadingButton
                    disabled={false}
                    type="button"
                    loadingText="Saving..."
                    onClick={() => setGetBtnStatus('LANGUAGEBARRIER')}
                    className={`text-white flex items-center py-1 px-2 rounded w-50 ${
                        getBtnStatus === 'LANGUAGEBARRIER'
                            ? 'bg-primary-main'
                            : 'bg-slate-400 opacity-30'
                    }`}
                >
                    Language Barrier
                </ATMLoadingButton>

                <ATMLoadingButton
                    disabled={false}
                    type="button"
                    loadingText="Cancel"
                    onClick={() => setGetBtnStatus('CANCEL')}
                    className={`text-white flex items-center py-1 px-2 rounded w-50 ${
                        getBtnStatus === 'CANCEL'
                            ? 'bg-primary-main'
                            : 'bg-slate-400 opacity-30'
                    }`}
                >
                    Cancel
                </ATMLoadingButton>

                {/* BACK */}
                <ATMLoadingButton
                    disabled={false}
                    loadingText="Back"
                    onClick={handleSubmit as any}
                    className="text-white flex items-center py-1 px-2 rounded w-50 bg-primary-main"
                >
                    Save
                </ATMLoadingButton>
            </div>
        </div>
    )
}

export default WarehouseFirstCallPage
