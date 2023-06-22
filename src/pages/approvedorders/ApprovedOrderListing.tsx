import React, { useState, useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import ATMTable, {
    columnTypes,
} from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import { PrepaidOrderListResponse } from '../../models/PrepaidOrder.modal'
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
import { Chip } from '@mui/material'
import {
    useGetPrePaidOrderQuery,
    useUpdatePrePaidOrderStatusMutation,
} from 'src/services/PrePaidOrderService'
import { showToast } from 'src/utils'

const ApprovedOrderListing = () => {
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

    const [updatePrePaidOrderStatus] = useUpdatePrePaidOrderStatusMutation()
    const { data, isLoading, isFetching } = useGetPrePaidOrderQuery({
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

    const changeOrderStaus = (id: string) => {
        updatePrePaidOrderStatus(id)
            .then((res: any) => {
                if (res?.data?.status) {
                    showToast('success', res?.data?.message)
                } else {
                    showToast('error', res?.data?.message)
                }
            })
            .catch((err: any) => {
                showToast('error', 'Something went wrong')
            })
    }

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
            field: 'prepaidOrderNumber',
            headerName: 'Prepaid Order No',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PrepaidOrderListResponse) => (
                <span className="text-primary-main ">
                    # {row.prepaidOrderNumber}{' '}
                </span>
            ),
        },
        {
            field: 'didNo',
            headerName: 'DID No',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: PrepaidOrderListResponse) => (
                <span> {row.didNo} </span>
            ),
        },

        {
            field: 'mobileNo',
            headerName: 'Mobile No',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PrepaidOrderListResponse) => (
                <span> {row.mobileNo} </span>
            ),
        },
        {
            field: 'deliveryCharges',
            headerName: 'Delivery Charges',
            flex: 'flex-[2_2_0%]',
            renderCell: (row: PrepaidOrderListResponse) => (
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
            renderCell: (row: PrepaidOrderListResponse) => (
                <span className="text-primary-main "> {row.discount} </span>
            ),
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PrepaidOrderListResponse) => (
                <span className="text-slate-800"> &#8377; {row.total} </span>
            ),
        },
        // {
        //     field: 'approved',
        //     headerName: 'Status',
        //     flex: 'flex-[1.5_1.5_0%]',
        //     renderCell: (row: PrepaidOrderListResponse) => (
        //         <span className="text-slate-800">{row.approved ? 'true' : 'false'}</span>
        //     ),
        // },
        {
            field: 'approved',
            headerName: 'Status',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PrepaidOrderListResponse) => (
                <div className="relative">
                    <button
                        id="btn"
                        className="cursor-pointer"
                        onClick={() => {
                            showConfirmationDialog({
                                title: `${
                                    row.approved ? 'Disapprove' : 'Approve'
                                } Order`,
                                text: `Do you want to ${
                                    row.approved ? 'disapprove' : 'approve'
                                } this order`,
                                showCancelButton: true,
                                next: (res) => {
                                    return res.isConfirmed
                                        ? (handleDelete(),
                                          changeOrderStaus(row._id))
                                        : setShowDropdown(false)
                                },
                            })
                        }}
                    >
                        <Chip
                            label={`${row.approved ? 'Approve' : 'Disapprove'}`}
                            color={`${row.approved ? 'success' : 'error'}`}
                            variant="outlined"
                            size="small"
                            clickable={true}
                        />
                    </button>
                </div>
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
                                    navigate(
                                        `/approved-orders/view/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                View
                            </button>
                            <button
                                onClick={() => {
                                    navigate(`/approved-orders/${currentId}`)
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
            <div className="px-4 h-[calc(100vh-55px)] ">
                <div className="mb-10 text-2xl text-slate-700 font-bold ">
                    Approved Orders
                </div>
                <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
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

export default ApprovedOrderListing
