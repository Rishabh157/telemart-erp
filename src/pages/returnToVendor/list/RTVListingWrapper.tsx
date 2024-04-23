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
import {
    useDeleteReturnToVendorOrderMutation,
    useGetPaginationReturnToVendorByGroupQuery,
    useUpdateReturnToVendorApprovalMutation,
} from 'src/services/ReturnToVendorService'
import { showToast } from 'src/utils'
import { isAuthorized } from 'src/utils/authorization'
import { formatedDateTimeIntoIst } from 'src/utils/dateTimeFormate/dateTimeFormate'
import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import RTVendor from './RTVendor'

// |-- Redux --|
import useGetCustomListingData from 'src/hooks/useGetCustomListingData'
import useUnmountCleanup from 'src/hooks/useUnmountCleanup'
import { RootState } from 'src/redux/store'

interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
    _id: string
    groupName: string
}

interface ReturnToVendorDocument {
    _id: string
    rtvNumber: string
    vendorId: string
    warehouseId: string
    firstApprovedById: string | null
    firstApproved: boolean | null
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedById: string | null
    secondApproved: boolean | null
    secondApprovedActionBy: string
    secondApprovedAt: string
    productSalesOrder: ProductSalesOrder
    remark: string
    status: string
    companyId: string
    isDeleted: boolean
    isActive: boolean
    __v: number
    createdAt: string
    updatedAt: string
    vendorLabel: string
    warehouseLabel: string
}

interface ReturnToVendorListResponse {
    _id: string
    warehouseLabel: string
    vendorLabel: string
    firstApproved: boolean | null
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApprovedActionBy: string
    secondApprovedAt: string
    secondApproved: boolean | null
    createdAt: string
    updatedAt: string
    documents: ReturnToVendorDocument[]
}

const RTVListingWrapper = () => {
    useUnmountCleanup()
    const returnToVendorState: any = useSelector(
        (state: RootState) => state.listingPagination
    )
    const { page, rowsPerPage, searchValue } = returnToVendorState
    const navigate = useNavigate()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [deleteReturnToVendor] = useDeleteReturnToVendorOrderMutation()
    const [updateReturnToVendor] = useUpdateReturnToVendorApprovalMutation()
    const { userData }: any = useSelector((state: RootState) => state.auth)

    const { items } = useGetCustomListingData<ReturnToVendorListResponse>({
        useEndPointHook: useGetPaginationReturnToVendorByGroupQuery({
            limit: rowsPerPage,
            searchValue: searchValue,
            params: ['rtvNumber'],
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
        deleteReturnToVendor(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Order deleted successfully!')
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

    const handleFirstLevelomplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateReturnToVendor({
            body: {
                firstApprovedById: userData?.userId,
                firstApproved: value,
                firstApprovedActionBy: userData?.userName,
                type: 'FIRST',
                firstApprovedAt: currentDate,
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        `First Level ${message} is successfully!`
                    )
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
        })
    }

    const handleSecondLevelComplete = (
        _id: string,
        value: boolean,
        message: string
    ) => {
        const currentDate = new Date().toLocaleDateString('en-GB')
        updateReturnToVendor({
            body: {
                secondApprovedById: userData?.userId,
                secondApproved: value,
                secondApprovedAt: currentDate,
                secondApprovedActionBy: userData?.userName,
                type: 'SECOND',
            },
            id: _id,
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast(
                        'success',
                        `Second Level ${message} is successfully!`
                    )
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
            renderCell: (row: ReturnToVendorListResponse) =>
                row?.firstApproved === null &&
                row?.secondApproved === null && (
                    <ActionPopup
                        isEdit={isAuthorized(
                            UserModuleNameTypes.ACTION_RETURN_TO_VENDOR_EDIT
                        )}
                        isDelete={
                            row.firstApproved === null &&
                                row.secondApproved === null
                                ? isAuthorized(
                                    UserModuleNameTypes.ACTION_RETURN_TO_VENDOR_DELETE
                                )
                                : false
                        }
                        handleEditActionButton={() => {
                            navigate(`/return-to-vendor/edit/${row?._id}`)
                        }}
                        handleDeleteActionButton={() => {
                            showConfirmationDialog({
                                title: 'Delete RTV',
                                text: 'Do you want to delete Return To Vendor?',
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
            field: 'rtvNo',
            headerName: 'RTV No.',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.RETURN_TO_VENDOR_LIST_RETURN_TO_VENDOR_NUMBER,
            renderCell: (row: ReturnToVendorListResponse) => (
                <span> {row?._id} </span>
            ),
        },
        {
            field: 'items',
            headerName: 'Items / Quantity',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.5_1.5_0%]',
            name: UserModuleNameTypes.RETURN_TO_VENDOR_LIST_ITEM,
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
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
            field: 'firstApproved',
            headerName: 'First level Status',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.RETURN_TO_VENDOR_LIST_FIRST_APPROVED,
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return (
                    <span>
                        {row?.firstApproved
                            ? 'Done'
                            : row?.firstApproved === null
                                ? 'Pending'
                                : 'Rejected'}{' '}
                    </span>
                )
            },
        },
        {
            field: 'firstApprovedActionBy',
            headerName: 'First Approved By',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.RETURN_TO_VENDOR_LIST_FIRST_APPROVED_ACTION_BY,
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return <span> {row?.firstApprovedActionBy} </span>
            },
        },
        {
            field: 'firstApprovedAt',
            headerName: 'First Approved Date',
            extraClasses: 'min-w-[160px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.RETURN_TO_VENDOR_LIST_FIRST_APPROVED_DATE,
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return <span> {row?.firstApprovedAt} </span>
            },
        },
        {
            field: 'secondApproved',
            headerName: 'Second Level Status',
            extraClasses: 'min-w-[160px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.RETURN_TO_VENDOR_LIST_SECOND_LEVEL_STATUS,
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return (
                    <span>
                        {' '}
                        {row?.secondApproved
                            ? 'Done'
                            : row?.secondApproved === null
                                ? 'Pending'
                                : 'Rejected'}
                    </span>
                )
            },
        },
        {
            field: 'secondApprovedActionBy',
            headerName: 'Second Approved By',
            extraClasses: 'min-w-[170px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.RETURN_TO_VENDOR_LIST_SECOND_APPROVED_ACTION_BY,
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return <span> {row?.secondApprovedActionBy} </span>
            },
        },
        {
            field: 'secondApprovedAt',
            headerName: 'Second Approved Date',
            extraClasses: 'min-w-[180px]',
            flex: 'flex-[0.5_0.5_0%]',
            name: UserModuleNameTypes.RETURN_TO_VENDOR_LIST_SECOND_APPROVED_DATE,
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return <span> {row?.secondApprovedAt} </span>
            },
        },
        {
            field: 'createdAt',
            headerName: 'Inserted Date',
            extraClasses: 'min-w-[160px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.RETURN_TO_VENDOR_LIST_INSERTED_DATE,
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.createdAt)} </span>
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated Date',
            extraClasses: 'min-w-[160px]',
            flex: 'flex-[1_1_0%]',
            name: UserModuleNameTypes.RETURN_TO_VENDOR_LIST_UPDATED_DATE,
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return <span> {formatedDateTimeIntoIst(row?.updatedAt)} </span>
            },
        },
        {
            field: 'Approved',
            headerName: 'Approval Level',
            extraClasses: 'min-w-[150px]',
            flex: 'flex-[1.0_1.0_0%]',
            name: UserModuleNameTypes.RETURN_TO_VENDOR_LIST_APPROVAL_LEVEL,
            align: 'center',
            renderCell: (row: ReturnToVendorListResponse) => {
                return (
                    <div className="">
                        {!row?.firstApproved ? (
                            <Stack direction="row" spacing={1}>
                                {row?.firstApproved === null ? (
                                    <button
                                        id="btn"
                                        className="overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: 'First Approve',
                                                text: 'Do you want to Approve First Level ?',
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                next: (res) => {
                                                    if (res.isConfirmed) {
                                                        return handleFirstLevelomplete(
                                                            row?._id,
                                                            res?.isConfirmed,
                                                            'Approval'
                                                        )
                                                    }
                                                    if (res.isDenied) {
                                                        return handleFirstLevelomplete(
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
                                            label="First Pending"
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
                                            label="First Rejected"
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
                                {row?.secondApproved === null ? (
                                    <button
                                        id="btn"
                                        className="overflow-hidden cursor-pointer z-0"
                                        onClick={() => {
                                            showConfirmationDialog({
                                                title: 'Second Approval',
                                                text: 'Do you want to Approve Second Level ?',
                                                showCancelButton: true,
                                                showDenyButton: true,
                                                denyButtonText: 'Reject',
                                                next: (res) => {
                                                    if (res.isConfirmed) {
                                                        return handleSecondLevelComplete(
                                                            row?._id,
                                                            res?.isConfirmed,
                                                            'Approval'
                                                        )
                                                    }
                                                    if (res.isDenied) {
                                                        return handleSecondLevelComplete(
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
                                            label="Second Pending "
                                            color="warning"
                                            variant="outlined"
                                            size="small"
                                            clickable={true}
                                        />
                                    </button>
                                ) : row?.secondApproved ? (
                                    <button
                                        id="btn"
                                        disabled={true}
                                        className="cursor-pointer"
                                    >
                                        <Chip
                                            label="Second Approved"
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
                                            label="Second Rejected"
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
        <>
            <SideNavLayout>
                <RTVendor
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </SideNavLayout>
        </>
    )
}

export default RTVListingWrapper
