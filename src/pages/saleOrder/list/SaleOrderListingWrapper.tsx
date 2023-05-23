import React, { useState, useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { SaleOrderListResponse } from 'src/models/SaleOrder.model'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/saleOrderSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    useDeleteSalesOrderMutation,
    useGetPaginationSaleOrderQuery,
    useUpdateSoLevelMutation,
} from 'src/services/SalesOrderService'
import SaleOrderListing from './SaleOrderListing'
import { Chip, Stack } from '@mui/material'

const SaleOrderListingWrapper = () => {
    const salesOrderState: any = useSelector(
        (state: RootState) => state.saleOrder
    )
    const dispatch = useDispatch<AppDispatch>()
    const { page, rowsPerPage, searchValue, items } = salesOrderState
    const navigate = useNavigate()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [deleteSaleOrder] = useDeleteSalesOrderMutation()
    const [updateSoLevel] = useUpdateSoLevelMutation()
    const { userData }: any = useSelector((state: RootState) => state.auth)

    //useUpdateSoLevelMutation
    const { data, isFetching, isLoading } = useGetPaginationSaleOrderQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['soNumber', 'dealer'],
        page: page,
        filterBy: [
            {
                fieldName: '',
                value: [],
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
            dispatch(setTotalItems(data?.totalItems || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
    }, [isLoading, isFetching, data, dispatch])

    const handleDelete = () => {
        setShowDropdown(false)
        deleteSaleOrder(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Sale Order deleted successfully!')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast(
                    'error',
                    'Something went wrong, Please try again later'
                )
            }
        })
    }

    const handleComplete = (_id: string, level: number) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        if (level === 1) {
            updateSoLevel({
                body: {
                    approval: {
                        approvalLevel: level,
                        approvalByName: userData?.userName,
                        approvalById: userData?.userId,
                        time: currentDate,
                    },
                },
                id: _id,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Level 1 approved successfully!')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
            })
        } else {
            updateSoLevel({
                body: {
                    approval: {
                        approvalLevel: level,
                        approvalByName: userData?.userName,
                        approvalById: userData?.userId,
                        time: currentDate,
                    },
                },
                id: _id,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Level 2 approved successfully!')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
            })
        }
    }

    const columns: columnTypes[] = [
        {
            field: 'soNumber',
            headerName: 'So Number',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SaleOrderListResponse) => (
                <span> {row?.soNumber} </span>
            ),
        },
        {
            field: 'dealer',
            headerName: 'Dealer',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SaleOrderListResponse) => (
                <a
                    href={`/dealers/${row?.dealer}/general-information`}
                    className="underline"
                >
                    {' '}
                    {row?.dealerLabel}{' '}
                </a>
            ),
        },
        {
            field: 'warehouse',
            headerName: 'Warehouse',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: SaleOrderListResponse) => {
                return <span> {row?.warehouseLabel} </span>
            },
        },
        {
            field: 'approval.approvalLevel',
            headerName: 'Approval level',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SaleOrderListResponse) => {
                const approvalLength = row?.approval?.length
                return (
                    <span>
                        {' '}
                        <Stack direction="row" spacing={1}>
                            {approvalLength === 0 ? (
                                <button
                                    id="btn"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        showConfirmationDialog({
                                            title: 'Approve level 1',
                                            text: 'Do you want to Approve sales order ?',
                                            showCancelButton: true,
                                            next: (res) => {
                                                return res.isConfirmed
                                                    ? handleComplete(
                                                          row?._id,
                                                          1
                                                      )
                                                    : false
                                            },
                                        })
                                    }}
                                >
                                    <Chip
                                        label="Level 0"
                                        color="error"
                                        variant="outlined"
                                        size="small"
                                        clickable={true}
                                    />
                                </button>
                            ) : approvalLength === 1 ? (
                                <button
                                    id="btn"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        showConfirmationDialog({
                                            title: 'Approve level 2',
                                            text: 'Do you want to Approve sales order ?',
                                            showCancelButton: true,
                                            next: (res) => {
                                                return res.isConfirmed
                                                    ? handleComplete(
                                                          row?._id,
                                                          2
                                                      )
                                                    : false
                                            },
                                        })
                                    }}
                                >
                                    <Chip
                                        label="Level 1"
                                        color="warning"
                                        variant="outlined"
                                        size="small"
                                        clickable={true}
                                    />
                                </button>
                            ) : (
                                <button
                                    id="btn"
                                    disabled={approvalLength >= 2}
                                    className="cursor-pointer"
                                >
                                    <Chip
                                        label="Approved"
                                        color="success"
                                        variant="outlined"
                                        size="small"
                                        clickable={true}
                                    />
                                </button>
                            )}
                        </Stack>{' '}
                    </span>
                )
            },
        },
        {
            field: 'approval[0].approvalByName',
            headerName: 'Level 1 Approved by',
            flex: 'flex-[1.0_1.0_0%]',
            renderCell: (row: SaleOrderListResponse) => {
                return <span> {row?.approval[0]?.approvalByName || '-'} </span>
            },
        },
        {
            field: 'approval[1].approvalByName',
            headerName: 'Level 2 Approved by',
            flex: 'flex-[1.0_1.0_0%]',
            renderCell: (row: SaleOrderListResponse) => {
                return <span> {row?.approval[1]?.approvalByName || '-'} </span>
            },
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
                                        `/sale-order/edit-sale-order/${row?._id}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    showConfirmationDialog({
                                        title: 'Delete SaleOrder',
                                        text: 'Do you want to delete SaleOrder?',
                                        showCancelButton: true,
                                        next: (res: any) => {
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

    return (
        <>
            <SideNavLayout>
                <SaleOrderListing columns={columns} rows={items} setShowDropdown={setShowDropdown} />
            </SideNavLayout>
        </>
    )
}

export default SaleOrderListingWrapper
