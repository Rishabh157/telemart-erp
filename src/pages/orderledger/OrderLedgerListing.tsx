import React, { useState, useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { OrderLedgerResponse } from 'src/models'
import { useGetOrderQuery } from 'src/services/OrderService'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setRowsPerPage,
    setIsTableLoading,
    setItems,
    setPage,
    setSearchValue,
    setTotalItems,
    setFilterValue,
} from 'src/redux/slices/orderSlice'
import { useNavigate } from 'react-router-dom'

const OrderListing = () => {
    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // States
    const [selectedRows, setSelectedRows] = useState([])
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const orderState: any = useSelector((state: RootState) => state.order)
    const { page, rowsPerPage, searchValue, items, totalItems } = orderState
    const { data, isLoading, isFetching } = useGetOrderQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['didNo', 'mobileNo'],
        page: page,
        filterBy: [],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data, dispatch])

    const columns: columnTypes[] = [
        {
            field: 'orderNumber',
            headerName: 'Order No',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: OrderLedgerResponse) => (
                <span className="text-primary-main py-2"># {row.orderNumber} </span>
            ),
        },
        {
            field: 'dealerName',
            headerName: 'Dealer Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: OrderLedgerResponse) => <span> {row.dealerName} </span>,
        },

        {
            field: 'schemeName',
            headerName: 'Scheme Name',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: OrderLedgerResponse) => (
                <span> {row.schemeName} </span>
            ),
        },

        {
            field: 'credit',
            headerName: 'Credit',
            flex: 'flex-[2_2_0%]',
            renderCell: (row: OrderLedgerResponse) => (
                <span className="text-primary-main ">
                    {row.credit}
                </span>
            ),
        },
        {
            field: 'debit',
            headerName: 'Debit',
            flex: 'flex-[2_2_0%]',
            renderCell: (row: OrderLedgerResponse) => (
                <span className="text-primary-main ">{row.debit} </span>
            ),
        },
        {
            field: 'balance',
            headerName: 'Balance',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: OrderLedgerResponse) => (
                <span className="text-slate-800"> {row.balance} </span>
            ),
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: OrderLedgerResponse) => (
                <span className="text-slate-800">{row.date} </span>
            ),
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: OrderLedgerResponse) => (
                <span className="text-slate-800">{row.remark} </span>
            ),
        },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     flex: 'flex-[0.5_0.5_0%]',
        //     renderCell: (row: any) => (
        //         <div className="relative">
        //             <button
        //                 onClick={(e) => {
        //                     e.stopPropagation()
        //                     setShowDropdown(!showDropdown)
        //                     setCurrentId(row?._id)
        //                 }}
        //                 className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
        //             >
        //                 {' '}
        //                 <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
        //             </button>
        //             {showDropdown && currentId === row?._id && (
        //                 <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
        //                     <button
        //                         onClick={() => {
        //                             navigate(`/orders/view/${currentId}`)
        //                         }}
        //                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        //                     >
        //                         View
        //                     </button>
        //                     <button
        //                         onClick={() => {
        //                             navigate(`/orders/${currentId}`)
        //                         }}
        //                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        //                     >
        //                         Edit
        //                     </button>
        //                 </div>
        //             )}
        //         </div>
        //     ),
        //     align: 'end',
        // },
    ]

    return (
        <SideNavLayout>
            <div className="px-4 h-[calc(100vh-55px)] pt-3 ">
                <div className="h-[100px] ">
                    <div className="mb-3 text-2xl text-slate-700 font-bold ">
                        Orders Ledger
                    </div>
                </div>
                <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white">
                    {/*Table Header */}
                    <ATMTableHeader
                        searchValue={searchValue}
                        page={page}
                        rowCount={totalItems}
                        rowsPerPage={rowsPerPage}
                        rows={items}
                        onRowsPerPageChange={(newValue) =>
                            dispatch(setRowsPerPage(newValue))
                        }
                        onSearch={(newValue) =>
                            dispatch(setSearchValue(newValue))
                        }
                        isFilter
                        isRefresh
                        onFilterDispatch={() => dispatch(setFilterValue([]))}
                    />

                    {/* Table */}
                    <div className="grow overflow-auto  ">
                        <ATMTable
                            columns={columns}
                            rows={items}
                            isCheckbox={false}
                            selectedRows={selectedRows}
                            onRowSelect={(selectedRows) =>
                                setSelectedRows(selectedRows)
                            }
                        />
                    </div>

                    <div className="h-[90px] flex items-center justify-end border-t border-slate-300">
                        <ATMPagination
                            page={page}
                            rowCount={totalItems}
                            rows={items}
                            rowsPerPage={rowsPerPage}
                            onPageChange={(newPage) =>
                                dispatch(setPage(newPage))
                            }
                        />
                    </div>
                </div>
            </div>
        </SideNavLayout>
    )
}

export default OrderListing
