/// ==============================================
// Filename:SaleOrderListingWrapper.tsx
// Type: List Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Chip, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { SaleOrderListResponseTypes } from 'src/models/SaleOrder.model'
import {
    useDeleteSalesOrderMutation,
    useGetPaginationSaleOrderByGroupQuery,
    useUpdateSalesOrderApprovalMutation,
} from 'src/services/SalesOrderService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
// import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import SaleOrderListing from './SaleOrderListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'

const SaleOrderListingWrapper = () => {
    useUnmountCleanup()
    const salesOrderState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = salesOrderState
    const navigate = useNavigate()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [deleteSaleOrder] = useDeleteSalesOrderMutation()
    const [updateSalesOrder] = useUpdateSalesOrderApprovalMutation()
    const { userData }: any = useSelector((state: RootState) => state.auth)

    const { items } = useGetCustomListingData<SaleOrderListResponseTypes>({
        useEndPointHook: useGetPaginationSaleOrderByGroupQuery({
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
        }),
    })

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
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: SaleOrderListResponseTypes) =>
                row?.dhApproved === null &&
                row?.accApproved === null && (
                    <ActionPopup
                        isEdit={isAuthorized(
                            UserModuleNameTypes.ACTION_SALE_ORDER_EDIT
                        )}
                        isDelete={isAuthorized(
                            UserModuleNameTypes.ACTION_SALE_ORDER_DELETE
                        )}
                        isCustomBtn={false}
                        customBtnText="Invoice"
                        handleCustomActionButton={() => {
                            navigate(
                                `/sale-order/${row?.documents?.[0]?._id}/invoice`
                            )
                        }}
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
        },
        {
            field: 'soNumber',
            headerName: 'So Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_SO_NUMBER,
            renderCell: (row: SaleOrderListResponseTypes) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'dealerLabel',
            headerName: 'Dealer Name',
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_DEALER_NAME,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => (
                <>
                    {row?.documents?.[0]?.dealerId ? (
                        <span
                            className="underline text-primary-main"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                                navigate(
                                    `/dealers/${row?.documents?.[0]?.dealerId}/general-information`
                                )
                            }
                        >
                            {row?.dealerName?.replaceAll('_', ' ') || '-'}
                        </span>
                    ) : (
                        '-'
                    )}
                </>
            ),
        },
        {
            field: 'warehouseStateLabel',
            headerName: 'State',
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_STATE,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => (
                <span> {row?.documents?.[0]?.warehouseStateLabel || '-'} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_ITEM_QUANTITY,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return (
                    <div className="w-full">
                        {row?.documents?.map((item, ind) => {
                            return (
                                <div
                                    key={ind}
                                    className="grid grid-cols-3 border border-slate-400 mb-1 rounded text-center"
                                >
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
            name: UserModuleNameTypes.SALE_ORDER_LIST_DH_APPROVED_STATUS,
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
            name: UserModuleNameTypes.SALE_ORDER_LIST_DH_APPROVED_BY,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return <span> {row?.dhApprovedActionBy} </span>
            },
        },
        {
            field: 'dhApprovedAt',
            headerName: 'DH Approved Date',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_DH_APPROVED_DATE,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return <span> {row?.dhApprovedAt} </span>
            },
        },
        {
            field: 'accApprovedActionByStatus',
            headerName: 'Account Status',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_ACCOUNT_APPROVED_STATUS,
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
            name: UserModuleNameTypes.SALE_ORDER_LIST_ACCOUNT_APPROVED_BY,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return <span> {row?.accApprovedActionBy} </span>
            },
        },
        {
            field: 'Approved',
            headerName: 'Approval',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.SALE_ORDER_LIST_APPROVAL,
            align: 'center',
            renderCell: (row: SaleOrderListResponseTypes) => {
                return (
                    <div className="z-0">
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
                                            className="z-0"
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
    ]

    return (
        <SideNavLayout>
            <SaleOrderListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </SideNavLayout>
    )
}

export default SaleOrderListingWrapper
