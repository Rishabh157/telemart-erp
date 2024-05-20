/// ==============================================
// Filename:VendorOrderTab.tsx
// Type: View-Tab Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useState } from 'react'

// |-- External Dependencies --|
import { useNavigate } from 'react-router-dom'
import { HiDotsHorizontal } from 'react-icons/hi'
import { BiSearchAlt2 } from 'react-icons/bi'

// |-- Internal Dependencies --|
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import { renderorderStatus } from 'src/utils/renderOrderStatus'
import ATMInputAdormant from 'src/components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'

const columns: columnTypes[] = [
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 'flex-[0.5_0.5_0%]',
        renderCell: (row: any) => (
            <button className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full">
                {' '}
                <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
            </button>
        ),
    },
    {
        field: 'order_no',
        headerName: 'Order',
        flex: 'flex-[1_1_0%]',
        renderCell: (row: any) => (
            <span className="text-primary-main "> # {row.order_no} </span>
        ),
    },
    {
        field: 'date',
        headerName: 'Date',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: any) => <span> {row.date} </span>,
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: any) => {
            return renderorderStatus(row.status)
        },
    },
    {
        field: 'customer',
        headerName: 'Customer',
        flex: 'flex-[2_2_0%]',
    },
    {
        field: 'purchased',
        headerName: 'Purchased',
        flex: 'flex-[2_2_0%]',
        renderCell: (row: any) => (
            <span className="text-primary-main "> {row.purchased} </span>
        ),
    },
    {
        field: 'total',
        headerName: 'Total',
        flex: 'flex-[1.5_1.5_0%]',
        renderCell: (row: any) => (
            <span className="text-slate-800"> &#8377; {row.total} </span>
        ),
    },
]

const rows = [
    {
        order_no: '10001',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 1,
    },

    {
        order_no: '10002',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 2,
    },

    {
        order_no: '10003',
        date: 'November 12, 2022',
        status: 'DELIVERED',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 3,
    },

    {
        order_no: '10004',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 4,
    },

    {
        order_no: '10005',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 5,
    },

    {
        order_no: '10006',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 6,
    },

    {
        order_no: '10007',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 7,
    },

    {
        order_no: '10008',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 8,
    },

    {
        order_no: '10008',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 9,
    },

    {
        order_no: '10008',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 10,
    },

    {
        order_no: '10008',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 11,
    },

    {
        order_no: '10008',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 12,
    },

    {
        order_no: '10008',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 13,
    },

    {
        order_no: '10008',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 14,
    },

    {
        order_no: '10008',
        date: 'November 12, 2022',
        status: 'HOLD',
        customer: 'Himanshu',
        purchased: '3 Items',
        total: 4299,
        _id: 15,
    },
]

const VendorOrderTab = () => {
    // Hooks
    const navigate = useNavigate()

    // States
    const [selectedRows, setSelectedRows] = useState([])

    return (
        <div className="w-full h-full  py-4 px-2">
            <div className="h-[50px] ">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <ATMInputAdormant
                            name=""
                            value=""
                            onChange={() => {}}
                            placeholder="Search"
                            adormant={
                                <BiSearchAlt2 className="text-slate-400" />
                            }
                            adormantProps={{
                                position: 'end',
                                extraClasses: 'bg-white border-none',
                            }}
                            className="h-[33px]"
                        />

                        {selectedRows.length ? (
                            <div>
                                <button className="bg-primary-main text-white p-2 rounded animate-[fade_0.3s_ease-in-out]">
                                    {' '}
                                    Actions{' '}
                                </button>
                            </div>
                        ) : null}
                    </div>

                    <div>
                        <button
                            type="button"
                            className="flex items-center gap-2 bg-primary-main text-white text-sm h-[33px] px-4 rounded font-bold"
                            onClick={() => {
                                navigate('add-order')
                            }}
                        >
                            <span className="text-xl"> + </span> Add Orders
                        </button>
                    </div>
                </div>
            </div>

            <ATMTable
                columns={columns}
                rows={rows}
                // isCheckbox={true}
                selectedRows={selectedRows}
                onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
                extraClasses={`max-h-[calc(100%-100px)] overflow-auto`}
            />

            <div className=" border-t  h-[50px] flex items-center ">
                <div className="w-full">
                    <ATMPagination
                        page={1}
                        onPageChange={(newPage) => alert(newPage)}
                        rowsPerPage={10}
                        rowCount={100}
                        rows={Array(10).fill(0)}
                        onRowsPerPageChange={(newValue) => alert(newValue)}
                    />
                </div>
            </div>
        </div>
    )
}

export default VendorOrderTab
