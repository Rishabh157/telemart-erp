// |-- Built-in Dependencies --|
import { useState } from 'react'

// |-- External Dependencies --|
import { Chip } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'
import { OutwardRequestWarehouseToSampleListResponse } from 'src/models'
import { showToast } from 'src/utils'
import { isAuthorized } from 'src/utils/authorization'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import WarehouseTransferListing from './WarehouseToSampleListing'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'
import {
    useDeleteWarehouseToSampleOrderMutation,
    useGetPaginationWarehouseToSampleByGroupQuery,
    useUpdateWarehouseToSampleApprovalMutation,
} from 'src/services/WarehouseToSampleService'

const WarehouseToSampleListingWrapper = () => {
    useUnmountCleanup()
    const WarehouseToSampleState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = WarehouseToSampleState
    const navigate = useNavigate()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [deleteWarehouseTransfer] = useDeleteWarehouseToSampleOrderMutation()
    const [updateWarehouseTransfer] =
        useUpdateWarehouseToSampleApprovalMutation()
    const { userData }: any = useSelector((state: RootState) => state.auth)

    const { items } = useGetCustomListingData({
        useEndPointHook: useGetPaginationWarehouseToSampleByGroupQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['wtsNumber'],
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
        deleteWarehouseTransfer(currentId).then((res) => {
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

    const handleFirstComplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateWarehouseTransfer({
            body: {
                firstApproved: value,
                type: 'FIRST',
                firstApprovedById: userData?.userId,
                firstApprovedAt: currentDate,
                firstApprovedActionBy: userData?.userName,
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', `${message} is successfully!`)
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    const handleSecondComplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateWarehouseTransfer({
            body: {
                secondApproved: value,
                type: 'SECOND',
                secondApprovedById: userData?.userId,
                secondApprovedAt: currentDate,
                secondApprovedActionBy: userData?.userName,
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', ` ${message} is successfully!`)
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
            extraClasses: 'min-w-[100px]',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: OutwardRequestWarehouseToSampleListResponse) =>
                row?.firstApproved === null &&
                row?.secondApproved === null && (
                    <ActionPopup
                        isEdit={isAuthorized(
                            UserModuleNameTypes.ACTION_WAREHOUSE_TO_SAMPLE_EDIT
                        )}
                        isDelete={isAuthorized(
                            UserModuleNameTypes.ACTION_WAREHOUSE_TO_SAMPLE_DELETE
                        )}
                        handleEditActionButton={() => {
                            navigate(`/warehouse-to-sample/edit/${row?._id}`)
                        }}
                        handleDeleteActionButton={() => {
                            showConfirmationDialog({
                                title: 'Delete Sample',
                                text: 'Do you want to delete this sample order ?',
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
            field: 'wtsNumber',
            headerName: 'WTS Number',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: OutwardRequestWarehouseToSampleListResponse) => (
                <span> {row?._id} </span> // this is a wtNumber we have to transform in _id
            ),
            name: UserModuleNameTypes.WAREHOUSE_TO_SAMPLE_LIST_WAREHOUSE_TRANSFER_SAMPLE_NUMBER,
        },
        {
            field: 'fromWarehouseLabel',
            headerName: 'From Warehouse',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_SAMPLE_LIST_FROM_WAREHOUSE,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToSampleListResponse) => (
                <span> {row?.fromWarehouseLabel} </span>
            ),
        },
        {
            field: 'toName',
            headerName: 'Receiver Name',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.8_0.8_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_SAMPLE_LIST_RECEIVER_NAME,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToSampleListResponse) => (
                <span> {row?.documents[0]?.toName} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_SAMPLE_LIST_ITEM_QUANTITY,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToSampleListResponse) => {
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
        // First Approval
        {
            field: 'firstApproved',
            headerName: 'First Approval',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_SAMPLE_LIST_FIRST_APPROVAL,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToSampleListResponse) => {
                return (
                    <div className="z-0">
                        {row?.firstApproved === null ? (
                            <Chip onClick={() => {
                                // here only admin and user who has rights can approve the request
                                if (isAuthorized(UserModuleNameTypes.ACTION_WAREHOUSE_TO_SAMPLE_LIST_FIRST_APPROVAL)) {
                                    showConfirmationDialog({
                                        title: 'First Approve',
                                        text: 'Do you want to Approve ?',
                                        showCancelButton: true,
                                        showDenyButton: true,
                                        denyButtonText: 'Reject',
                                        next: (res) => {
                                            if (res.isConfirmed) {
                                                return handleFirstComplete(
                                                    row?._id,
                                                    res?.isConfirmed,
                                                    'Approval'
                                                )
                                            }
                                            if (res.isDenied) {
                                                return handleFirstComplete(
                                                    row?._id,
                                                    !res.isDenied,
                                                    'Rejected'
                                                )
                                            }
                                        },
                                    })
                                } else {
                                    showToast('error', "You don't have permission to approve the request")
                                }
                            }}
                                label="First Pending"
                                color="warning"
                                variant="outlined"
                                size="small"
                                clickable={true}
                            />
                        ) : (
                            <Chip
                                label={row?.firstApproved === true ? "First Approved" : "First Rejected"}
                                color={row?.firstApproved === true ? "success" : "error"}
                                variant="outlined"
                                size="small"
                                clickable={false}
                            />
                        )}
                    </div>
                )
            },
        },
        {
            field: 'firstApprovedActionBy',
            headerName: 'First Approved By',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_SAMPLE_LIST_FIRST_APPROVED_BY,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToSampleListResponse) => {
                return <div>
                    <div className="font-medium">
                        {row?.firstApprovedActionBy}
                    </div>
                    <div className="text-[12px] text-slate-500 font-medium">
                        {row?.firstApprovedAt}
                    </div>
                </div>
            },
        },
        // Second Approval
        {
            field: 'secondApproved',
            headerName: 'Second Approval',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_SAMPLE_LIST_SECOND_APPROVAL,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToSampleListResponse) => {
                return (
                    <div className="z-0">
                        {row?.secondApproved === null ? (
                            <Chip onClick={() => {
                                if (isAuthorized(UserModuleNameTypes.ACTION_WAREHOUSE_TO_SAMPLE_LIST_SECOND_APPROVAL)) {
                                    if (row?.firstApproved) {
                                        showConfirmationDialog({
                                            title: 'Second Approval',
                                            text: 'Do you want to Approve ?',
                                            showCancelButton: true,
                                            showDenyButton: true,
                                            denyButtonText: 'Reject',
                                            next: (res) => {
                                                if (res.isConfirmed) {
                                                    return handleSecondComplete(
                                                        row?._id,
                                                        res?.isConfirmed,
                                                        'Approval'
                                                    )
                                                }
                                                if (res.isDenied) {
                                                    return handleSecondComplete(
                                                        row?._id,
                                                        !res.isDenied,
                                                        'Rejected'
                                                    )
                                                }
                                            },
                                        })
                                    } else {
                                        showToast('error', `First approval is still ${row?.firstApproved === null ? 'pending' : 'rejected'}`)
                                    }
                                } else {
                                    showToast('error', "You don't have permission to approve the request")
                                }
                            }}
                                label="Second Pending"
                                color="warning"
                                variant="outlined"
                                size="small"
                                clickable={true}
                            />
                        ) : (
                            <Chip
                                label={row?.secondApproved === true ? "Second Approved" : "Second Rejected"}
                                color={row?.secondApproved === true ? "success" : "error"}
                                variant="outlined"
                                size="small"
                                clickable={false}
                            />
                        )}
                    </div>
                )
            },
        },
        {
            field: 'secondApprovedActionBy',
            headerName: 'Second Approved By',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_SAMPLE_LIST_SECOND_APPROVED_BY,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToSampleListResponse) => {
                return <div>
                    <div className="font-medium">
                        {row?.secondApprovedActionBy}
                    </div>
                    <div className="text-[12px] text-slate-500 font-medium">
                        {row?.secondApprovedAt}
                    </div>
                </div>
            },
        },
        {
            field: 'createdAt',
            headerName: 'Inserted Date',
            extraClasses: 'min-w-[170px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_SAMPLE_LIST_INSERTED_DATE,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToSampleListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.createdAt)} </span>
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated Date',
            extraClasses: 'min-w-[170px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.WAREHOUSE_TO_SAMPLE_LIST_UPDATED_DATE,
            align: 'center',
            renderCell: (row: OutwardRequestWarehouseToSampleListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.updatedAt)} </span>
            },
        },
    ]

    return (
        <SideNavLayout>
            <WarehouseTransferListing
                columns={columns}
                rows={items}
                setShowDropdown={setShowDropdown}
            />
        </SideNavLayout>
    )
}

export default WarehouseToSampleListingWrapper
