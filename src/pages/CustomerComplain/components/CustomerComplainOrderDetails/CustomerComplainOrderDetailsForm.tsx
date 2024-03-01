import React from 'react'
import { FormikProps } from 'formik'
import { FormInitialValues } from './CustomerComplainOrderDetailsWrapper'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { CustomerDetailsPropsTypes } from '../../CustomerComplainWrapper'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import moment from 'moment'
import { handleValidNumber } from 'src/utils/methods/numberMethods'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import AddCustomerComplaintDetailsWrapper from '../CustomerComplaintDetails/AddCustomerComplaintDetailsWrapper'
import AddCustomerNDRDetailsWrapper from '../CustomerNdr/AddCustomerNDRDetailsWrapper'

// |-- Types --|
type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus?: boolean
    customerDetails: CustomerDetailsPropsTypes | null
    setIsOpenCustomerOrderModel: any
}

const CustomerComplainOrderDetailsForm = ({
    formikProps,
    customerDetails,
    setIsOpenCustomerOrderModel,
}: Props) => {
    const { values, setFieldValue } = formikProps
    const [
        isOpenCustomerComplaitDetailModel,
        setIsOpenCustomerComplaitDetailModel,
    ] = React.useState<boolean>(false)

    const [isOpenCustomerNDRDetailModel, setIsOpenCustomerNDRDetailModel] =
        React.useState<boolean>(false)

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

    return (
        <div className="w-full  px-4 py-2">
            <h1 className="text-xs font-semibold mb-2">Order Details</h1>
            <div className="grid gap-x-16 grid-cols-2">
                <div>
                    <div className="grid grid-cols-2 gap-x-14 border-r-[1px] border-black">
                        <div className="pr-8">
                            <div className="flex justify-between items-center">
                                <span className="text-sm flex-1 text-blue-500 font-semibold">
                                    Order No
                                </span>
                                {' : '}
                                <span className="text-sm flex-1 text-end text-blue-500 font-bold">
                                    {values?.orderNo}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-[#406698] font-semibold flex-1">
                                    Disposition
                                </span>
                                {':'}
                                <span className="text-xs  flex-1 cursor-pointer text-end">
                                    {values.disposition}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-[#406698] font-semibold flex-1">
                                    Invoice
                                </span>
                                {':'}
                                <span className="text-xs flex-1 cursor-pointer text-end">
                                    {values.invoice || 'PDF'}
                                </span>
                            </div>
                        </div>
                        {/* Right Div Curior Details */}
                        <div className="pr-8">
                            <div className="pr-8">
                                <div className="flex justify-between items-center">
                                    <span className="flex-1 text-xs text-[#406698] font-semibold">
                                        Order Date
                                    </span>
                                    {' : '}
                                    <span className="flex-1 text-end text-xs">
                                        {moment(values.orderDate).format(
                                            'DD-MM-YYYY'
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs flex-1 text-[#406698] font-semibold">
                                        Order Status
                                    </span>
                                    {':'}
                                    <span className="flex-1 text-green-500 text-end text-xs">
                                        {values.orderStatus}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs flex-1 text-[#406698] font-semibold">
                                        Dispatch Time
                                    </span>
                                    {':'}
                                    <span className="text-xs flex-1 text-end">
                                        {/* 29-01-2024 14:47:39 */}
                                        {moment(values.dispatchTime).format(
                                            'DD-MM-YYYY HH:mm:ss'
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="h-auto">
                            <p className="text-blue-500 underline text-xs">
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
                </div>

                {/*  Curior Status */}
                <div>
                    <div className="pr-8">
                        <div className="pr-8">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs text-[#406698] font-semibold">
                                        Courier
                                    </p>

                                    <p className="text-end text-xs">
                                        MP / JAB / LP
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#406698] font-semibold">
                                        AWB No.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#406698] font-semibold">
                                        Courier Status/Date
                                    </p>

                                    <p className="text-end text-xs">
                                        <span className="underline text-blue-500 font-semibold">
                                            DELIVERED
                                        </span>
                                        /29 JANUARY 2024
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <p className="text-xs text-[#406698] font-semibold">
                                    Courier Remark:
                                </p>
                            </div>
                            <div className="mt-8">
                                <div className="h-24">
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
                                                name: 'Imran',
                                                date: '29-01-2024 14:47:39',
                                                orderStatus: 'DELIVERED',
                                            },
                                            {
                                                name: 'Chris',
                                                date: '29-01-2024 14:47:39',
                                                orderStatus: 'DELIVERED',
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Create Companin Button and Send SMS button */}
                </div>
            </div>
            <div className="mt-8">
                <p className="text-blue-500 underline text-xs">
                    Product Details
                </p>

                <div className="flex w-full gap-x-8">
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
                                // console.log(e)
                                // setFieldValue(e)
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
                                // value={values.discount}
                                value={0.0}
                                readOnly
                                disabled
                                onChange={(e) => {
                                    // setFieldValue(
                                    //     'discount',
                                    //     e.target.value
                                    // )
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center px-10">
                        <span className="text-[#406698] font-semibold text-xs">
                            -Discount
                        </span>
                        <div>
                            <ATMTextField
                                label=""
                                labelSize="xs"
                                size="xs"
                                labelClass=""
                                extraClassField="mt-0"
                                labelDirection="horizontal"
                                className="mt-0 rounded"
                                name="discount"
                                placeholder=""
                                value={values.discount}
                                // readOnly
                                // disabled
                                onChange={(e) => {
                                    handleValidNumber(e) &&
                                        setFieldValue(
                                            'discount',
                                            parseInt(e.target.value)
                                        )
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center px-10">
                        <div>
                            <span className="text-[#406698] font-semibold text-xs">
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
                                value={values.total}
                                // readOnly
                                // disabled
                                onChange={(e) => {
                                    handleValidNumber(e) &&
                                        setFieldValue(
                                            'total',
                                            parseInt(e.target.value)
                                        )
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Create Companin Button and Send SMS button */}

            <div className="flex justify-end items-center gap-x-4 mt-2">
                <button
                    type="button"
                    className="bg-[#0c56aa] text-[#bfdbff] hover:text-white px-1 py-1 rounded font-semibold text-xs"
                    onClick={() => setIsOpenCustomerComplaitDetailModel(true)}
                >
                    Create Complaint
                </button>
                <button
                    disabled
                    type="button"
                    className="bg-[#0c56aa] text-[#bfdbff] px-1 py-1 rounded font-semibold text-xs cursor-not-allowed"
                    onClick={() => {}}
                >
                    Send SMS
                </button>
                <button
                    type="button"
                    className="bg-[#0c56aa] text-[#bfdbff] hover:text-white px-1 py-1 rounded font-semibold text-xs"
                    onClick={() => setIsOpenCustomerNDRDetailModel(true)}
                >
                    Create NDR
                </button>
                {/* Create Complain Form */}
                <DialogLogBox
                    isOpen={isOpenCustomerComplaitDetailModel}
                    handleClose={() =>
                        setIsOpenCustomerComplaitDetailModel(false)
                    }
                    component={
                        <AddCustomerComplaintDetailsWrapper
                            orderId={values.orderId}
                            handleClose={() =>
                                setIsOpenCustomerComplaitDetailModel(false)
                            }
                        />
                    }
                />
                {/* Create NDR Form */}
                <DialogLogBox
                    fullScreen
                    isOpen={isOpenCustomerNDRDetailModel}
                    handleClose={() => setIsOpenCustomerNDRDetailModel(false)}
                    component={
                        <AddCustomerNDRDetailsWrapper
                            orderId={values.orderId}
                            handleClose={() =>
                                setIsOpenCustomerNDRDetailModel(false)
                            }
                        />
                    }
                />
            </div>
        </div>
    )
}

export default CustomerComplainOrderDetailsForm
