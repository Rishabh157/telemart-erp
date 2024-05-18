// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ProductSubCategoryListResponse } from 'src/models/ProductSubCategory.model'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import {
    useGetOrderCancelRequestQuery,
    useDeleteOrderCancelRequestMutation,
    useOrderCancelRequestApprovalMutation,
} from 'src/services/OrderCancelRequestServices'
import { showToast } from 'src/utils'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import OrderCancelRequestListing from './OrderCancelRequestListing'
import { getCancelOrderReasonTypeOptions } from 'src/utils/constants/customeTypes'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import { isAuthorized } from 'src/utils/authorization'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import moment from 'moment'
import { OrderCancelRequestListResponse } from 'src/models/OrderCancelRequest.modesl'
import { Chip, Stack } from '@mui/material'

const OrderCancelRequestListingWrapper = () => {
    useUnmountCleanup()
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const productSubCategoryState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const cancelReasonOptions = getCancelOrderReasonTypeOptions()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { page, rowsPerPage, searchValue } = productSubCategoryState

    const navigate = useNavigate()
    const [deleteOrderCancel] = useDeleteOrderCancelRequestMutation()
    const [orderCancelRequestApproval] = useOrderCancelRequestApprovalMutation()

    const { items } = useGetCustomListingData<ProductSubCategoryListResponse>({
        useEndPointHook: useGetOrderCancelRequestQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['orderNumber'],
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

    // Delete
    const handleDelete = () => {
        setShowDropdown(false)
        deleteOrderCancel(currentId).then((res) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        'Order cancel request deleted successfully!'
                    )
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

    // Approval Admin
    const handleApproval = (orderNumber: string, id: string) => {
        orderCancelRequestApproval({ orderNumber, id }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', `Admin Approval is successfully!`)
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
            extraClasses: 'min-w-[100px]',
            renderCell: (row: OrderCancelRequestListResponse) =>
                row?.status === 'PENDING' && (
                    <ActionPopup
                        isEdit={isAuthorized(
                            UserModuleNameTypes.ACTION_PRODUCT_SUB_CATEGORY_EDIT
                        )}
                        isDelete={isAuthorized(
                            UserModuleNameTypes.ACTION_PRODUCT_SUB_CATEGORY_DELETE
                        )}
                        handleOnAction={() => {
                            setShowDropdown(!showDropdown)
                            setCurrentId(row?._id)
                        }}
                        handleEditActionButton={() => {
                            navigate(`/order-cancel-request/${currentId}`)
                        }}
                        handleDeleteActionButton={() => {
                            showConfirmationDialog({
                                title: 'Delete order cancel request?',
                                text: 'Do you want to delete',
                                showCancelButton: true,
                                next: (res) => {
                                    return res.isConfirmed
                                        ? handleDelete()
                                        : setShowDropdown(false)
                                },
                            })
                        }}
                    />
                ),
        },
        {
            field: 'orderNumber',
            headerName: 'Order Number',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.PRODUCT_SUB_CATEGORY_LIST_PRODUCT_SUB_CATEGORY_CODE,
            extraClasses: 'min-w-[200px]',
            renderCell: (row: OrderCancelRequestListResponse) => (
                <span className="text-primary-main "># {row?.orderNumber}</span>
            ),
        },
        {
            field: 'requestCreatedByLabel',
            headerName: 'Request By',
            flex: 'flex-[1.5_1.5_0%]',
            extraClasses: 'min-w-[200px]',
            name: UserModuleNameTypes.PRODUCT_SUB_CATEGORY_LIST_PRODUCT_SUB_CATEGORY_NAME,
            renderCell: (row: OrderCancelRequestListResponse) => {
                return <span>{row?.requestCreatedByLabel}</span>
            },
        },
        {
            field: 'createdAt',
            headerName: 'Create Date',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.ORDER_ALL_TAB_LIST_CREATED_AT,
            extraClasses: 'min-w-[150px] text-[14px]',
            renderCell: (row: OrderCancelRequestListResponse) => (
                <div className="py-0">
                    <div className="text-slate-700 font-medium">
                        {moment(row?.createdAt).format('DD MMM YYYY')}
                    </div>
                    <div className=" text-slate-500 font-medium">
                        {moment(row?.createdAt).format('hh:mm A')}
                    </div>
                </div>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 'flex-[1.5_1.5_0%]',
            extraClasses: 'min-w-[200px]',
            name: UserModuleNameTypes.PRODUCT_SUB_CATEGORY_LIST_PARENT_CATEGORY,
            renderCell: (row: OrderCancelRequestListResponse) => {
                return (
                    <Stack direction="row" spacing={1}>
                        <button
                            id="btn"
                            className=" overflow-hidden cursor-pointer z-0"
                            onClick={() => {
                                row?.status === 'PENDING' &&
                                    showConfirmationDialog({
                                        title: 'Admin Approval',
                                        text: 'Do you want to Approve this cancel order request ?',
                                        showCancelButton: true,
                                        // showDenyButton: true,
                                        // denyButtonText: 'Reject',
                                        next: (res) => {
                                            if (res.isConfirmed) {
                                                return handleApproval(
                                                    row?.orderNumber,
                                                    row?._id
                                                )
                                            }
                                        },
                                    })
                            }}
                        >
                            <Chip
                                label={
                                    row?.status === 'PENDING'
                                        ? 'Pending'
                                        : 'Approved'
                                }
                                color={
                                    row?.status === 'PENDING'
                                        ? 'warning'
                                        : 'success'
                                }
                                variant="outlined"
                                size="small"
                                clickable={
                                    row?.status === 'PENDING' ? true : false
                                }
                            />
                        </button>
                    </Stack>
                )
            },
        },
        {
            field: 'cancelReason',
            headerName: 'Reason',
            flex: 'flex-[1.5_1.5_0%]',
            extraClasses: 'min-w-[200px]',
            name: UserModuleNameTypes.PRODUCT_SUB_CATEGORY_LIST_PARENT_CATEGORY,
            renderCell: (row: OrderCancelRequestListResponse) => {
                return cancelReasonOptions?.find(
                    (ele) => ele?.value === row?.cancelReason
                )?.label
            },
        },
        {
            field: 'remark',
            headerName: 'Remark',
            flex: 'flex-[1.5_1.5_0%]',
            extraClasses: 'min-w-[200px]',
            name: UserModuleNameTypes.PRODUCT_SUB_CATEGORY_LIST_PARENT_CATEGORY,
            renderCell: (row: OrderCancelRequestListResponse) => {
                return <span>{row?.remark}</span>
            },
        },
    ]

    return (
        <SideNavLayout>
            <OrderCancelRequestListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </SideNavLayout>
    )
}

export default OrderCancelRequestListingWrapper
