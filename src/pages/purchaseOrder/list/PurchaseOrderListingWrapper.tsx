// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Chip, Stack } from '@mui/material'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { PurchaseOrderListResponse } from 'src/models/PurchaseOrder.model'
import {
    useGetPurchaseOrderQuery,
    useUpdatePoLevelMutation,
} from 'src/services/PurchaseOrderService'
import { showToast } from 'src/utils'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import PurchaseOrderListing from './PurchaseOrderListing'

// |-- Redux --|
import { setFilterValue } from 'src/redux/slices/ListingPaginationSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'

const PurchaseOrderListingWrapper = () => {
    useUnmountCleanup()

    // state
    const [currentId, setCurrentId] = useState('')
    const listingPaginationState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = listingPaginationState
    const { userData } = useSelector((state: RootState) => state?.auth)

    // initiate method
    const navigate = useNavigate()
    const [updatePoLevel] = useUpdatePoLevelMutation()
    const dispatch = useDispatch<AppDispatch>()

    // pagination api
    const { items } = useGetCustomListingData<any[]>({
        useEndPointHook: useGetPurchaseOrderQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['poCode'],
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

    const columns: columnTypes[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            extraClasses: 'text-xs min-w-[100px]',
            flex: 'flex-[0.8_0.8_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    isView={isAuthorized(
                        UserModuleNameTypes.ACTION_PURCHASE_ORDER_VIEW
                    )}
                    isEdit={isAuthorized(
                        UserModuleNameTypes.ACTION_PURCHASE_ORDER_EDIT
                    )}
                    handleViewActionButton={() => {
                        navigate(`/purchase-order/view/${currentId}`)
                    }}
                    handleEditActionButton={() => {
                        navigate(`/purchase-order/edit/${currentId}`, {
                            state: { poCode: row?.poCode },
                        })
                    }}
                    handleOnAction={() => {
                        setCurrentId(row?._id)
                    }}
                >
                    <>
                        {row?.approval?.length > 1 &&
                            isAuthorized(
                                UserModuleNameTypes.ACTION_PURCHASE_ORDER_GENRATE_GRN
                            ) && (
                                <button
                                    onClick={() => {
                                        navigate('/grn/add?', {
                                            state: {
                                                poCode: row?.poCode,
                                                itemId: row?.purchaseOrder
                                                    .itemId,
                                                itemName:
                                                    row?.purchaseOrder.itemName,
                                                quantity:
                                                    row?.purchaseOrder.quantity,
                                                receivedQuantity:
                                                    row?.purchaseOrder
                                                        .receivedQuantity,
                                                companyId: row?.companyId,
                                            },
                                        })
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Generate GRN
                                </button>
                            )}
                        {isAuthorized(
                            UserModuleNameTypes.ACTION_PURCHASE_ORDER_GENRATE_GRN
                        ) && (
                                <button
                                    onClick={() => {
                                        dispatch(setFilterValue([row?.poCode]))
                                        navigate('/grn', {
                                            state: {
                                                poCode: row?.poCode,
                                            },
                                        })
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    View GRN
                                </button>
                            )}
                    </>
                </ActionPopup>
            ),
        },
        {
            field: 'isConfirmed',
            headerName: 'Approval level',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.PURCHASE_ORDER_LIST_APPROVAL_LEVEL,
            renderCell: (row: PurchaseOrderListResponse) => {
                const approvalLength = row?.approval?.length
                return (
                    <span className="z-10">
                        {' '}
                        <Stack direction="row" spacing={1}>
                            {approvalLength === 0 ? (
                                <button
                                    id="btn"
                                    className=" overflow-hidden cursor-pointer z-0"
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
        },
        {
            field: 'poCode',
            headerName: 'PO Code',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.PURCHASE_ORDER_LIST_PO_CODE,
            renderCell: (row: PurchaseOrderListResponse) => (
                <span
                    className='text-primary-main cursor-pointer'
                    onClick={() => {
                        navigate(`/purchase-order/view/${row?._id}`)
                    }}
                >
                    {row?.poCode}
                </span>
            ),
        },
        {
            field: 'purchaseOrder',
            headerName: 'Item Name',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PURCHASE_ORDER_LIST_ITEM_NAME,
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.itemName} </span>
            },
        },
        {
            field: 'purchaseOrder',
            headerName: 'Quantity',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PURCHASE_ORDER_LIST_QUANTITY,
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.quantity} </span>
            },
        },
        {
            field: 'purchaseOrder',
            headerName: 'Recieved Quantity',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PURCHASE_ORDER_LIST_RECIEVED_QUANTITY,
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.receivedQuantity} </span>
            },
        },
        {
            field: 'purchaseOrder',
            headerName: 'Rate',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PURCHASE_ORDER_LIST_RATE,
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.purchaseOrder.rate} </span>
            },
        },
        {
            field: 'vendorLabel',
            headerName: 'Vendor',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PURCHASE_ORDER_LIST_VENDOR,
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.vendorLabel} </span>
            },
        },
        {
            field: 'warehouseLabel',
            headerName: 'Warehouse',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PURCHASE_ORDER_LIST_WAREHOUSE,
            renderCell: (row: PurchaseOrderListResponse) => {
                return <span> {row.warehouseLabel} </span>
            },
        },
        {
            field: 'purchaseOrder',
            headerName: 'Est. Delivery Date',
            extraClasses: 'text-xs min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.PURCHASE_ORDER_LIST_ESTIMATION_DELIVERY_DATE,
            renderCell: (row: PurchaseOrderListResponse) => {
                return (
                    <span>
                        {row?.purchaseOrder?.estReceivingDate
                            ? moment(
                                row?.purchaseOrder?.estReceivingDate,
                                'YYYY/MM/DD'
                            ).format('DD-MM-YYYY')
                            : '-'}
                    </span>
                )
            },
        },
    ]

    const handleComplete = (_id: string, level: number) => {
        const currentDate = new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        if (level === 1) {
            updatePoLevel({
                body: {
                    approval: {
                        approvalLevel: level,
                        approvalByName: userData?.userName || '',
                        approvalById: userData?.userId || '',
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
                        approvalByName: userData?.userName || '',
                        approvalById: userData?.userId || '',
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

    return (
        <SideNavLayout>
            <PurchaseOrderListing columns={columns} rows={items || []} />
        </SideNavLayout>
    )
}

export default PurchaseOrderListingWrapper
