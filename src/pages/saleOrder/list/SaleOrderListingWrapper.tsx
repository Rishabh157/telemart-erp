import React, { useState, useEffect } from 'react'
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
    useUpdateSalesOrderMutation,
} from 'src/services/SalesOrderService'
import SaleOrderListing from './SaleOrderListing'
import { Chip, Stack } from '@mui/material'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

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
    const [updateSalesOrder] = useUpdateSalesOrderMutation()
    const { userData }: any = useSelector((state: RootState) => state.auth)

    //useUpdateSoLevelMutation
    const { data, isFetching, isLoading } = useGetPaginationSaleOrderQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['soNumber', 'dealerLabel'],
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

    const handleDHComplete = (_id: string, level: number) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        const so: any = items?.find((e: any) => e._id === _id)

        //console.log(so?.productSalesOrder, "so")
        const pSO = {
            productGroupId: so?.productSalesOrder?.productGroupId,
            quantity: so?.productSalesOrder?.quantity,
            rate: so?.productSalesOrder?.rate,
        }
        if (level === 1) {
            updateSalesOrder({
                body: {
                    soNumber: so?.soNumber,
                    dealerId: so?.dealerId,
                    dealerWareHouseId: so?.dealerWareHouseId,
                    companyWareHouseId: so?.companyWareHouseId,
                    productSalesOrder: pSO,
                    companyId: userData?.companyId || '',
                    dhApproved: true,
                    dhApprovedById: userData?.userId,
                    dhApprovedAt: currentDate,
                },
                id: _id,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Approved successfully!')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
            })
        } else {
            updateSalesOrder({
                body: {
                    soNumber: so?.soNumber,
                    dealerId: so?.dealerId,
                    dealerWareHouseId: so?.dealerWareHouseId,
                    companyWareHouseId: so?.companyWareHouseId,
                    productSalesOrder: pSO,
                    companyId: userData?.companyId || '',
                    dhApproved: false,
                    dhApprovedById: userData?.userId,
                    dhApprovedAt: currentDate,
                },
                id: _id,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Rejected successfully!')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
            })
        }
    }

    const handleAccComplete = (_id: string, level: number) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        const so: any = items?.find((e: any) => e._id === _id)

        // console.log(so?.productSalesOrder, "so")
        const pSO = {
            productGroupId: so?.productSalesOrder?.productGroupId,
            quantity: so?.productSalesOrder?.quantity,
            rate: so?.productSalesOrder?.rate,
        }
        if (level === 1) {
            updateSalesOrder({
                body: {
                    soNumber: so?.soNumber,
                    dealerId: so?.dealerId,
                    dealerWareHouseId: so?.dealerWareHouseId,
                    companyWareHouseId: so?.companyWareHouseId,
                    productSalesOrder: pSO,
                    companyId: userData?.companyId || '',
                    accApproved: true,
                    accApprovedById: userData?.userId,
                    accApprovedAt: currentDate,
                },
                id: _id,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Approved successfully!')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
            })
        } else {
            updateSalesOrder({
                body: {
                    soNumber: so?.soNumber,
                    dealerId: so?.dealerId,
                    dealerWareHouseId: so?.dealerWareHouseId,
                    companyWareHouseId: so?.companyWareHouseId,
                    productSalesOrder: pSO,
                    companyId: userData?.companyId || '',
                    accApproved: false,
                    accApprovedById: userData?.userId,
                    accApprovedAt: currentDate,
                },
                id: _id,
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Rejected successfully!')
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
                    href={`/dealers/${row?.dealerLabel}/general-information`}
                    className="underline"
                >
                    {' '}
                    {row?.dealerLabel}{' '}
                </a>
            ),
        },
        {
            field: 'dhApproved',
            headerName: 'DH Approved Status',
            flex: 'flex-[1.0_1.0_0%]',
            renderCell: (row: SaleOrderListResponse) => {
                return (
                    <span className="z-10">
                        {' '}
                        <Stack direction="row" spacing={1}>
                            {row?.dhApproved === null ? (
                                <button
                                    id="btn"
                                    className=" overflow-hidden cursor-pointer z-0"
                                    onClick={() => {
                                        showConfirmationDialog({
                                            title: 'Approve',
                                            text: 'Do you want to Approve ?',
                                            showCancelButton: true,
                                            showDenyButton: true,
                                            denyButtonText: 'Reject',
                                            next: (res) => {
                                                if (res.isConfirmed) {
                                                    return handleDHComplete(
                                                        row?._id,
                                                        1
                                                    )
                                                } else if (res.isDenied) {
                                                    return handleDHComplete(
                                                        row?._id,
                                                        2
                                                    )
                                                } else {
                                                    return false
                                                }
                                            },
                                        })
                                    }}
                                >
                                    <Chip
                                        label="!"
                                        color="warning"
                                        variant="outlined"
                                        size="small"
                                        clickable={true}
                                    />
                                </button>
                            ) : row?.dhApproved === true ? (
                                <button
                                    id="btn"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        showConfirmationDialog({
                                            title: '<span className="text-red-700">Reject</span>',
                                            text: 'Do you want to Reject ?',
                                            icon: 'error',
                                            confirmButtonColor: '#dc3741',
                                            showCancelButton: true,
                                            next: (res) => {
                                                return res.isConfirmed
                                                    ? handleDHComplete(
                                                          row?._id,
                                                          2
                                                      )
                                                    : false
                                            },
                                        })
                                    }}
                                >
                                    <Chip
                                        label="Approved"
                                        color="success"
                                        variant="outlined"
                                        size="small"
                                        clickable={true}
                                    />
                                </button>
                            ) : (
                                <button
                                    id="btn"
                                    disabled={true}
                                    className="cursor-pointer"
                                >
                                    <Chip
                                        label="Rejected"
                                        color="error"
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
            field: 'dhApprovedActionBy',
            headerName: 'DH Approved By',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: SaleOrderListResponse) => {
                return <span> {row?.dhApprovedActionBy} </span>
            },
        },

        {
            field: 'accApproved',
            headerName: 'Acc Approved Status',
            flex: 'flex-[1.0_1.0_0%]',
            renderCell: (row: SaleOrderListResponse) => {
                return (
                    <span className="z-10">
                        {' '}
                        <Stack direction="row" spacing={1}>
                            {row?.dhApproved === true ? (
                                row?.accApproved === null ? (
                                    <button
                                        id="btn"
                                        className=" overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: 'Approve',
                                                text: 'Do you want to Approve ?',
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                next: (res) => {
                                                    if (res.isConfirmed) {
                                                        return handleAccComplete(
                                                            row?._id,
                                                            1
                                                        )
                                                    } else if (res.isDenied) {
                                                        return handleAccComplete(
                                                            row?._id,
                                                            2
                                                        )
                                                    } else {
                                                        return false
                                                    }
                                                },
                                            })
                                        }}
                                    >
                                        <Chip
                                            label="!"
                                            color="warning"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : row?.accApproved === true ? (
                                    <button
                                        id="btn"
                                        className="cursor-pointer"
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: '<span className="text-red-700">Reject</span>',
                                                text: 'Do you want to Reject ?',
                                                icon: 'error',
                                                confirmButtonColor: '#dc3741',
                                                showCancelButton: true,
                                                next: (res) => {
                                                    return res.isConfirmed
                                                        ? handleAccComplete(
                                                              row?._id,
                                                              2
                                                          )
                                                        : false
                                                },
                                            })
                                        }}
                                    >
                                        <Chip
                                            label="Approved"
                                            color="success"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                    >
                                        <Chip
                                            label="Rejected"
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                )
                            ) : (
                                <button
                                    id="btn"
                                    disabled={true}
                                    className="cursor-pointer"
                                >
                                    <Chip
                                        label="!"
                                        color="warning"
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
            field: 'accApprovedActionBy',
            headerName: 'Acc Approved By',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: SaleOrderListResponse) => {
                return <span> {row?.accApprovedActionBy} </span>
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                >
                    <>
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
                    </>
                </ActionPopup>
            ),
            align: 'end',
        },
    ]
    //console.log(items)

    return (
        <>
            <SideNavLayout>
                <SaleOrderListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                    
                />
            </SideNavLayout>
        </>
    )
}

export default SaleOrderListingWrapper
