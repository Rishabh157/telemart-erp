import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { PurchaseOrderListResponse } from 'src/models/PurchaseOrder.model'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import PurchaseOrderListing from './PurchaseOrderListing'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    useGetPurchaseOrderQuery,
    useUpdatePoLevelMutation,
} from 'src/services/PurchaseOrderService'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/PurchaseOrderSlice'

import { HiDotsHorizontal } from 'react-icons/hi'
import { Chip, Stack } from '@mui/material'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'

const PurchaseOrderListingWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [updatePoLevel] = useUpdatePoLevelMutation()
    const productOrderState: any = useSelector(
        (state: RootState) => state.purchaseOrder
    )
    const { userData }: any = useSelector((state: RootState) => state.auth)
    const { page, rowsPerPage, searchValue, items } = productOrderState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')

    const { data, isLoading, isFetching } = useGetPurchaseOrderQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['poCode', 'wareHouseId'],
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

    const handleComplete = (_id: string, level: number) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        if (level === 1) {
            updatePoLevel({
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
            updatePoLevel({
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
            field: 'poCode',
            headerName: 'PO Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: PurchaseOrderListResponse) => (
                <span> {row.poCode} </span>
            ),
        },
        {
            field: 'itemName',
            headerName: 'Item Name',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.itemName} </span>
            },
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.quantity} </span>
            },
        },
        {
            field: 'rate',
            headerName: 'rate',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.rate} </span>
            },
        },
        {
            field: 'vendor',
            headerName: 'Vendor',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.vendorLabel} </span>
            },
        },
        {
            field: 'warehouseLabel',
            headerName: 'ware house',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.warehouseLabel} </span>
            },
        },
        {
            field: 'estimateDeliveryDate',
            headerName: 'Est. Delivery Date',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.estReceivingDate} </span>
            },
        },
        {
            field: 'approval.approvalLevel',
            headerName: 'Approval level',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: PurchaseOrderListResponse) => {
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
                                            text: 'Do you want to Approve PO  ?',
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
                                            text: 'Do you want to Approve PO  ?',
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
            // renderCell: (row: PurchaseOrderListResponse) => {
            //   const approvalLength = row?.approval?.length;
            //   return (
            //     <span>
            //       {" "}
            //       {approvalLength === 0
            //         ? "no lvl"
            //         : approvalLength
            //         ? row?.approval[0]?.approvalLevel
            //         : row?.approval[1]?.approvalLevel}{" "}
            //     </span>
            //   );
            // },
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
                                        `/purchase-order/view/${currentId}`
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                View
                            </button>
                            <button
                                onClick={() => {
                                    navigate(
                                        `/purchase-order/edit/${currentId}`,
                                        {
                                            state: { poCode: row?.poCode },
                                        }
                                    )
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/grn/add', {
                                        state: {
                                            poCode: row?.poCode,
                                            itemId: row?.purchaseOrder.itemId,
                                            itemName:
                                                row?.purchaseOrder.itemName,
                                            quantity:
                                                row?.purchaseOrder.quantity,
                                            companyId: row?.companyId,
                                        },
                                    })
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Generate GRN
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/grn', {
                                        state: {
                                            poCode: row?.poCode,
                                            // itemId: row?.purchaseOrder.itemId,
                                            // itemName: row?.purchaseOrder.itemName,
                                            // quantity: row?.purchaseOrder.quantity,
                                            // companyId: row?.companyId,
                                        },
                                    })
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                View GRN
                            </button>
                        </div>
                    )}
                </div>
            ),
            align: 'end',
        },
    ]

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

    return (
        <>
            <SideNavLayout>
                <PurchaseOrderListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </SideNavLayout>
        </>
    )
}

export default PurchaseOrderListingWrapper
