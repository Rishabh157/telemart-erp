/// ==============================================
// Filename:SaleOrderListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Chip, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import {
    UserModuleActionTypes,
    UserModuleNameTypes,
} from 'src/models/userAccess/UserAccess.model'
import { SaleOrderListResponseTypes } from 'src/models/SaleOrder.model'
import {
    useDeleteSalesOrderMutation,
    useGetPaginationSaleOrderByGroupQuery,
    useUpdateSalesOrderApprovalMutation,
} from 'src/services/SalesOrderService'
import { getAllowedAuthorizedColumns } from 'src/userAccess/getAuthorizedModules'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import SaleOrderListing from './SaleOrderListing'

// |-- Redux --|
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/saleOrderSlice'
import { AppDispatch, RootState } from 'src/redux/store'

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
    const [updateSalesOrder] = useUpdateSalesOrderApprovalMutation()
    const { userData }: any = useSelector((state: RootState) => state.auth)
    const { checkUserAccess } = useSelector(
        (state: RootState) => state.userAccess
    )

    const { data, isFetching, isLoading } =
        useGetPaginationSaleOrderByGroupQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['soNumber', 'dealerLabel'],
            page: page,
            filterBy: [
                {
                    fieldName: 'companyId',
                    value: userData?.companyId as string,
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

    const handleDHComplete = (_id: string, value: boolean, message: string) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateSalesOrder({
            body: {
                dhApproved: value,
                type: 'DH',
                dhApprovedById: userData?.userId,
                dhApprovedAt: currentDate,
                dhApprovedActionBy: userData?.userName,
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        `Distributor Head ${message} is successfully!`
                    )
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    const handleAccComplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateSalesOrder({
            body: {
                accApproved: value,
                type: 'ACC',
                accApprovedById: userData?.userId,
                accApprovedAt: currentDate,
                accApprovedActionBy: userData?.userName,
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', `Account ${message} is successfully!`)
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    const columns: columnTypes[] = [
        {
            field: 'soNumber',
            headerName: 'So Number',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SaleOrderListResponseTypes) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'dealerLabel',
            headerName: 'Dealer Name',
            flex: 'flex-[0.8_0.8_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => (
                <span> {row?.dealerName} </span>
            ),
        },
        {
            field: 'warehouseStateLabel',
            headerName: 'State',
            flex: 'flex-[0.8_0.8_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => (
                <span> {row?.documents[0]?.warehouseStateLabel} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            flex: 'flex-[1.5_1.5_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return (
                    <div className="w-full">
                        {row?.documents?.map((item) => {
                            return (
                                <div className="grid grid-cols-3 border border-slate-400 mb-1 rounded text-center">
                                    <div className="col-span-2 border-r-[1px] border-slate-400 py-1 px-2">
                                        {item?.productSalesOrder?.groupName}
                                    </div>
                                    <div className="col-span-1 py-1 px-2">
                                        {item?.productSalesOrder?.quantity}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            field: 'dhApprovedActionStatus',
            headerName: 'DH Status',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return (
                    <span>
                        {row?.dhApproved
                            ? 'Done'
                            : row?.dhApproved === null
                            ? 'Pending'
                            : 'Rejected'}{' '}
                    </span>
                )
            },
        },
        {
            field: 'dhApprovedActionBy',
            headerName: 'DH Approved By',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return <span> {row?.dhApprovedActionBy} </span>
            },
        },
        {
            field: 'dhApprovedAt',
            headerName: 'DH Approved Date',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return <span> {row?.dhApprovedAt} </span>
            },
        },
        {
            field: 'accApprovedActionByStatus',
            headerName: 'Account Status',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return (
                    <span>
                        {' '}
                        {row?.accApproved
                            ? 'Done'
                            : row?.accApproved === null
                            ? 'Pending'
                            : 'Rejected'}
                    </span>
                )
            },
        },
        {
            field: 'accApprovedActionBy',
            headerName: 'Account Approved By',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return <span> {row?.accApprovedActionBy} </span>
            },
        },
        {
            field: 'accApprovedAt',
            headerName: 'Account Approved Date',
            flex: 'flex-[0.5_0.5_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return <span> {row?.accApprovedAt} </span>
            },
        },
        {
            field: 'createdAt',
            headerName: 'Inserted Date',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return <span> {formatedDateTimeIntoIst(row?.createdAt)} </span>
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated Date',
            flex: 'flex-[1_1_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return <span> {formatedDateTimeIntoIst(row?.updatedAt)} </span>
            },
        },
        {
            field: 'Approved',
            headerName: 'Approval',
            flex: 'flex-[1.0_1.0_0%]',
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return (
                    <div>
                        {!row?.dhApproved ? (
                            <Stack direction="row" spacing={1}>
                                {row?.dhApproved === null ? (
                                    <button
                                        id="btn"
                                        className=" overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: 'DH Approve',
                                                text: 'Do you want to Approve ?',
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                next: (res) => {
                                                    if (res.isConfirmed) {
                                                        return handleDHComplete(
                                                            row?._id,
                                                            res?.isConfirmed,
                                                            'Approval'
                                                        )
                                                    }
                                                    if (res.isDenied) {
                                                        return handleDHComplete(
                                                            row?._id,
                                                            !res.isDenied,
                                                            'Rejected'
                                                        )
                                                    }
                                                },
                                            })
                                        }}
                                    >
                                        <Chip
                                            label="DH Pending"
                                            color="warning"
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
                                            label="DH Rejected"
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                )}
                            </Stack>
                        ) : (
                            <Stack direction="row" spacing={1}>
                                {row?.accApproved === null ? (
                                    <button
                                        id="btn"
                                        className=" overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: 'Account Approval',
                                                text: 'Do you want to Approve ?',
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                next: (res) => {
                                                    if (res.isConfirmed) {
                                                        return handleAccComplete(
                                                            row?._id,
                                                            res?.isConfirmed,
                                                            'Approval'
                                                        )
                                                    }
                                                    if (res.isDenied) {
                                                        return handleAccComplete(
                                                            row?._id,
                                                            !res.isDenied,
                                                            'Rejected'
                                                        )
                                                    }
                                                },
                                            })
                                        }}
                                    >
                                        <Chip
                                            label="ACC Pending "
                                            color="warning"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : row?.accApproved ? (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                    >
                                        <Chip
                                            label="Acc  Approved"
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
                                            label=" Acc Rejected"
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                )}
                            </Stack>
                        )}
                    </div>
                )
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: SaleOrderListResponseTypes) =>
                row?.dhApproved === null &&
                row?.accApproved === null && (
                    <ActionPopup
                        moduleName={UserModuleNameTypes.saleOrder}
                        isEdit
                        isDelete
                        handleEditActionButton={() => {
                            navigate(`/sale-order/edit-sale-order/${row?._id}`)
                        }}
                        handleDeleteActionButton={() => {
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
                        handleOnAction={() => {
                            setShowDropdown(!showDropdown)
                            setCurrentId(row?._id)
                        }}
                    />
                ),
            align: 'end',
        },
    ]

    return (
        <>
            <SideNavLayout>
                <SaleOrderListing
                    columns={getAllowedAuthorizedColumns(
                        checkUserAccess,
                        columns,
                        UserModuleNameTypes.saleOrder,
                        UserModuleActionTypes.List
                    )}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </SideNavLayout>
        </>
    )
}

export default SaleOrderListingWrapper
