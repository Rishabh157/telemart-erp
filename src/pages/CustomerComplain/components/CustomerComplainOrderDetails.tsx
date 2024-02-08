import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { FormInitialValues } from '../CustomerComplainWrapper'
import { CustomerDetailsPropsTypes } from '../CustomerComplainWrapper'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'

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

const CustomerComplainOrderDetails = ({
    values,
    setFieldValue,
    handleSubmit,
    customerDetails,
}: Props) => {
    const columnsOfCourierStatus: columnTypes[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 'flex-[3_3_0%]',
            align: 'start',
            extraClasses: 'text-xs',
            // renderCell: (row: any) => <span>{row.name} </span>,
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            // renderCell: (row: any) => <span> {row.Date} </span>,
        },
        {
            field: 'orderStatus',
            headerName: 'OrderStatus',
            flex: 'flex-[3_3_0%]',
            align: 'center',
            extraClasses: 'text-xs',
            // renderCell: (row: any) => <span> {row.flagOrderStatus} </span>,
        },
    ]
    // console.log('values)))', values)

    return (
        <div className="py-1 px-2">
            <div>
                {/* Customer Details Section */}
                <div className="w-full mt-4 bg-[#e9f1fb] border-[1px] border-black p-2">
                    <h1 className="text-sm font-semibold mb-2">
                        Order Details
                    </h1>

                    <div className="grid gap-x-16 grid-cols-2">
                        <div>
                            <div className="grid grid-cols-2 gap-x-14 border-r-[1px] border-black">
                                <div className="pr-8">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[18px] flex-1 text-blue-500 font-semibold">
                                            Order No
                                        </span>
                                        {' : '}
                                        <span className="text-[18px] flex-1 text-end text-blue-500 font-bold">
                                            3478563478
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-[#406698] font-semibold flex-1">
                                            Disposition
                                        </span>
                                        {':'}
                                        <span className="text-sm  flex-1 cursor-pointer text-end">
                                            FRESH ORDER
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-[#406698] font-semibold flex-1">
                                            Invoice
                                        </span>
                                        {':'}
                                        <span className="text-sm flex-1 cursor-pointer text-end">
                                            PDF
                                        </span>
                                    </div>
                                </div>
                                {/* Right Div Curior Details */}
                                <div className="pr-8">
                                    <div className="pr-8">
                                        <div className="flex justify-between items-center">
                                            <span className="flex-1 text-sm text-[#406698] font-semibold">
                                                Order Date
                                            </span>
                                            {' : '}
                                            <span className="flex-1 text-end text-sm">
                                                25-01-2024
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm flex-1 text-[#406698] font-semibold">
                                                Order Status
                                            </span>
                                            {':'}
                                            <span className="flex-1 text-green-500 text-end text-sm">
                                                Delivered
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm flex-1 text-[#406698] font-semibold">
                                                Dispatch Time
                                            </span>
                                            {':'}
                                            <span className="text-sm flex-1 text-end">
                                                29-01-2024 14:47:39
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="h-auto">
                                    <p className="text-blue-500 underline text-sm">
                                        Stock Details
                                    </p>
                                    <ATMTable
                                        headerClassName="py-2 bg-[#cdddf2] text-white z-0"
                                        columns={columnsOfCourierStatus || []}
                                        rows={[
                                            {
                                                name: '',
                                                date: '29-01-2024 14:47:39',
                                                orderStatus: 'DELIVERED',
                                            },
                                            {
                                                name: 'Rishabh',
                                                date: '29-01-2024 14:47:39',
                                                orderStatus: 'DELIVERED',
                                            },
                                            {
                                                name: 'Rishabh',
                                                date: '29-01-2024 14:47:39',
                                                orderStatus: 'DELIVERED',
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <p className="text-blue-500 underline text-sm">
                                    Product Details
                                </p>

                                <div className="grid grid-cols-3 gap-x-8">
                                    <div className="grid grid-cols-2 items-center">
                                        <ATMSelectSearchable
                                            componentClass=""
                                            label=""
                                            size="xs"
                                            labelSize="xs"
                                            selectLabel="shipping"
                                            classDirection="grid grid-cols-3"
                                            name="stateId"
                                            value={customerDetails?.pincode}
                                            options={[
                                                {
                                                    label: 'first',
                                                    value: 'first',
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
                                        <div>
                                            <ATMTextField
                                                label=""
                                                labelSize="xs"
                                                size="xs"
                                                labelClass=""
                                                extraClassField="mt-0"
                                                labelDirection="horizontal"
                                                className="mt-0 rounded"
                                                name="reciversName"
                                                placeholder=""
                                                value={0.0}
                                                readOnly
                                                disabled
                                                onChange={(e) => {
                                                    // setFieldValue('reciversName', e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-center px-10">
                                        <div>
                                            <span className="text-[#406698] font-semibold text-sm">
                                                -Discount
                                            </span>
                                        </div>
                                        <div>
                                            <ATMTextField
                                                label=""
                                                labelSize="xs"
                                                size="xs"
                                                labelClass=""
                                                extraClassField="mt-0"
                                                labelDirection="horizontal"
                                                className="mt-0 rounded"
                                                name="reciversName"
                                                placeholder=""
                                                value={0.0}
                                                readOnly
                                                disabled
                                                onChange={(e) => {
                                                    // setFieldValue('reciversName', e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-center px-10">
                                        <div>
                                            <span className="text-[#406698] font-semibold text-sm">
                                                Total
                                            </span>
                                        </div>
                                        <div>
                                            <ATMTextField
                                                label=""
                                                labelSize="xs"
                                                size="xs"
                                                labelClass=""
                                                extraClassField="mt-0"
                                                labelDirection="horizontal"
                                                className="mt-0 rounded"
                                                name="reciversName"
                                                placeholder=""
                                                value={0.0}
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
                        </div>

                        {/*  Curior Status */}
                        <div>
                            <div className="pr-8">
                                <div className="pr-8">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-[#406698] font-semibold">
                                                Courier
                                            </p>

                                            <p className="text-end text-sm">
                                                MP / JAB / LP
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#406698] font-semibold">
                                                AWB No.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#406698] font-semibold">
                                                Courier Status/Date
                                            </p>

                                            <p className="text-end text-sm">
                                                <span className="underline text-blue-500 font-semibold">
                                                    DELIVERED
                                                </span>
                                                /29 JANUARY 2024
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <p className="text-sm text-[#406698] font-semibold">
                                            Courier Remark:
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <div className="h-80">
                                            <ATMTable
                                                headerClassName="py-2 bg-[#cdddf2] text-white z-0"
                                                columns={
                                                    columnsOfCourierStatus || []
                                                }
                                                rows={[
                                                    {
                                                        name: '',
                                                        date: '29-01-2024 14:47:39',
                                                        orderStatus:
                                                            'DELIVERED',
                                                    },
                                                    {
                                                        name: 'Rishabh',
                                                        date: '29-01-2024 14:47:39',
                                                        orderStatus:
                                                            'DELIVERED',
                                                    },
                                                    {
                                                        name: 'Rishabh',
                                                        date: '29-01-2024 14:47:39',
                                                        orderStatus:
                                                            'DELIVERED',
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mt-4">
                            <table className="border border-gray-400">
                                <thead>
                                    <tr className="bg-#cdddf2">
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            Action
                                        </th>
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            No.
                                        </th>
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            Date
                                        </th>
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            Order No.
                                        </th>
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            Call Type
                                        </th>
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            Issue Category (IC1:IC2:IC3)
                                        </th>
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            Status (Return Type)
                                        </th>
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            Stage
                                        </th>
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            Last Remark
                                        </th>
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            Last Updated By
                                        </th>
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            Last Updated Date
                                        </th>
                                        <th className="border border-gray-400 py-2 px-4 text-sm text-center text-[#406698] font-semibold">
                                            Total Calls
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <!-- Table body content goes here --> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerComplainOrderDetails
