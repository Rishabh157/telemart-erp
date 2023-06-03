import React, { useState, useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { BiSearchAlt2 } from 'react-icons/bi'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import { renderorderStatus } from 'src/utils/renderOrderStatus'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ATMInputAdormant from 'src/components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { OrderListResponse } from 'src/models'
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
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'

const OrderListing = () => {
    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    // States
    const [selectedRows, setSelectedRows] = useState([])
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

    const orderState: any = useSelector((state: RootState) => state.order)
    const { page, rowsPerPage, searchValue, items, filterValue, totalItems } =
        orderState

    

    const { data, isLoading, isFetching } = useGetOrderQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['didNo', 'mobileNo'],
        page: page,
        filterBy: [
            {
                fieldName: 'batchNo',
                value: filterValue,
            },
        ],
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
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "># {row.orderNumber} </span>
            ),
        },
        {
            field: 'didNo',
            headerName: 'DID No',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: OrderListResponse) => <span> {row.didNo} </span>,
        },

        {
            field: 'mobileNo',
            headerName: 'Mobile No',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: OrderListResponse) => (
                <span> {row.mobileNo} </span>
            ),
        },
        {
            field: 'batchNo',
            headerName: 'Batch Assigned',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: OrderListResponse) => {
                return renderorderStatus(row.batchNo?.length)
            },
        },
        {
            field: 'deliveryCharges',
            headerName: 'Delivery Charges',
            flex: 'flex-[2_2_0%]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main ">
                    {' '}
                    {row.deliveryCharges}{' '}
                </span>
            ),
        },
        {
            field: 'discount',
            headerName: 'Discount',
            flex: 'flex-[2_2_0%]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-primary-main "> {row.discount} </span>
            ),
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: OrderListResponse) => (
                <span className="text-slate-800"> &#8377; {row.total} </span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowDropdown(!showDropdown)
                            setCurrentId(row?._id)
                        }}
                        className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
                    >
                        {' '}
                        <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />{' '}
                    </button>
                    {showDropdown && currentId === row?._id && (
                        <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button
                                onClick={() => {
                                    navigate(`/orders/view/${currentId}`)
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                View
                            </button>
                            <button
                                onClick={() => {
                                    navigate(`/orders/${currentId}`)
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete Order',
                                        text: 'Do you want to delete',
                                        showCancelButton: true,
                                        next: (res) => {
                                            return res.isConfirmed
                                                ? handleDelete()
                                                : setShowDropdown(false)
                                        },
                                    })
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ),
            align: 'end',
        },
    ]

    const handleDelete = () => {
        setShowDropdown(false)
        // deleteOrdercurrentId).then((res) => {
        //     if ('data' in res) {
        //         if (res?.data?.status) {
        //             showToast('success', 'Order deleted successfully!')
        //         } else {
        //             showToast('error', res?.data?.message)
        //         }
        //     } else {
        //         showToast(
        //             'error',
        //             'Something went wrong, Please try again later'
        //         )
        //     }
        // })
    }

    return (
        <SideNavLayout>
            <div className="px-4 h-[calc(100vh-55px)] pt-3 ">
                <div className="h-[100px] ">
                    <div className="mb-5 text-2xl text-slate-700 font-bold ">
                        Orders
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            <ATMInputAdormant
                                name=""
                                value={searchValue}
                                onChange={(newValue) =>
                                    dispatch(
                                        setSearchValue(newValue.target.value)
                                    )
                                }
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

                        {/* <div>
                            <button
                                type="button"
                                className="flex items-center gap-2 bg-primary-main text-white text-sm h-[33px] px-4 rounded font-bold"
                                onClick={() => {
                                    navigate('add-order')
                                }}
                            >
                                <span className="text-xl"> + </span> Add Orders
                            </button>
                        </div> */}
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
                            isCheckbox={true}
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
